import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import {
  ProcessRequestOptions,
  graphqlUploadExpress,
} from './graphql-upload/graphql-upload-express';

interface CorsOptionsMain extends Omit<CorsOptions, 'credentials'> {
  origin?: (RegExp | string)[];
}

interface Args {
  cors?: CorsOptionsMain;
  graphqlUpload?: ProcessRequestOptions;
}

export const nestjsMainApp = async (app: INestApplication, options?: Args) => {
  app.use(cookieParser());
  app.enableCors({
    ...options?.cors,
    credentials: true,
    origin: [
      'https://sandbox.embed.apollographql.com',
      ...(options?.cors?.origin ?? []),
    ],
  });

  // Class Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    graphqlUploadExpress({
      maxFiles: options?.graphqlUpload ? options.graphqlUpload.maxFiles : 100,
      ...options?.graphqlUpload,
    }),
  );
};
