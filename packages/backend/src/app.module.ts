import { join } from 'path';

import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { Ctx } from './utils';
import { CoreModule } from './core/core.module';
import { DatabaseModule, DatabaseModuleArgs } from './database/database.module';
import { GlobalProvidersModule } from './providers/providers.module';

export interface VitNodePaths {
  envFile: string;
}

interface Args {
  database: DatabaseModuleArgs;
  paths: VitNodePaths;
}

const internalPaths = {
  backend: join(process.cwd(), 'src'),
  frontend: join(process.cwd(), '..', 'frontend'),
  uploads: join(process.cwd(), 'uploads'),
  plugins: join(process.cwd(), 'src', 'plugins'),
};

export const ABSOLUTE_PATHS_BACKEND = {
  backend: internalPaths.backend,
  schema: join(process.cwd(), 'schema.gql'),
  uploads: {
    public: join(internalPaths.uploads, 'public'),
    private: join(internalPaths.uploads, 'private'),
    temp: join(internalPaths.uploads, 'temp'),
  },
  plugins: internalPaths.plugins,
  plugin: ({ code }: { code: string }) => ({
    root: join(internalPaths.plugins, code),
    versions: join(internalPaths.plugins, code, 'versions.json'),
    admin: join(internalPaths.plugins, code, 'admin'),
    config: join(internalPaths.plugins, code, 'config.json'),
    database: {
      init: join(internalPaths.plugins, code, 'admin', 'database'),
      schema: join(internalPaths.plugins, code, 'admin', 'database', 'schema'),
      migrations: join(
        internalPaths.plugins,
        code,
        'admin',
        'database',
        'migrations',
      ),
      migration_info: join(
        internalPaths.plugins,
        code,
        'admin',
        'database',
        'migrations',
        'meta',
        '_journal.json',
      ),
    },
    frontend: {
      admin_pages: join(
        internalPaths.frontend,
        'app',
        '[locale]',
        '(admin)',
        'admin',
        '(auth)',
        code,
      ),
      admin_templates: join(internalPaths.frontend, 'plugins', code, 'admin'),
      pages_container: join(
        internalPaths.frontend,
        'app',
        '[locale]',
        '(main)',
        '(container)',
        code,
      ),
      default_page: join(
        internalPaths.frontend,
        'plugins',
        code,
        'templates',
        'default-page.tsx',
      ),
      pages: join(internalPaths.frontend, 'app', '[locale]', '(main)', code),
      templates: join(internalPaths.frontend, 'plugins', code, 'templates'),
      plugin: join(internalPaths.frontend, 'plugins', code),
      language: join(internalPaths.frontend, 'plugins', code, 'langs'),
    },
  }),
  frontend: {
    init: join(process.cwd(), '..', 'frontend'),
  },
};

const parseFrontendUrlFromEnv = () => {
  const envUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const frontendUrl = envUrl ? envUrl : 'http://localhost:3000';
  const urlObj = new URL(frontendUrl);

  return {
    url: frontendUrl,
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port: urlObj.port,
  };
};

const config = () => {
  const frontend_url = parseFrontendUrlFromEnv();

  const data = {
    login_token_secret: process.env.LOGIN_TOKEN_SECRET ?? '',
    frontend_url: frontend_url.url,
    port: parseInt(process.env.PORT, 10) || 8080,
    password_salt: 10,
    password_reset_salt: 9,
    cookies: {
      domain:
        frontend_url.hostname === 'localhost'
          ? 'localhost'
          : frontend_url.hostname
              .replace(/:\d+$/, '')
              .split('.')
              .slice(-2)
              .join('.'),
      login_token: {
        expiresIn: 3, // 3 days
        expiresInRemember: 90, // 90 days
        name: 'vitnode-login-token',
        admin: {
          name: 'vitnode-login-token-admin',
          expiresIn: 1, // 1 day
        },
      },
      known_device: {
        name: 'vitnode-device',
        expiresIn: 365, // 1 year
      },
    },
  };

  if (!data.login_token_secret) {
    throw new Error('`LOGIN_TOKEN_SECRET` is not defined in .env file');
  }

  return data;
};

@Module({})
export class VitNodeCoreModule {
  static register({ paths, database }: Args): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          envFilePath: paths.envFile,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: ABSOLUTE_PATHS_BACKEND.schema,
          sortSchema: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          context: ({ req, res }): Ctx => ({ req, res }),
        }),
        ScheduleModule.forRoot(),
        JwtModule.register({ global: true }),
        ServeStaticModule.forRoot({
          rootPath: ABSOLUTE_PATHS_BACKEND.uploads.public,
          serveRoot: '/public/',
        }),
        DatabaseModule.register(database),
        GlobalProvidersModule,
        CoreModule,
      ],
    };
  }
}
