import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import {
  LayoutAdminInstallEnum,
  LayoutAdminInstallObj,
} from './dto/layout.obj';

import { DatabaseService } from '../../../../database';
import { core_users } from '../../../../templates/core/admin/database/schema/users';
import { core_sessions } from '../../../../templates/core/admin/database/schema/sessions';
import { core_admin_sessions } from '../../../../templates/core/admin/database/schema/admins';
import { AccessDeniedError } from '../../../../errors';
import { core_languages } from '../../../../templates/core/admin/database/schema/languages';

@Injectable()
export class LayoutAdminInstallService {
  constructor(private readonly databaseService: DatabaseService) {}

  async layout(): Promise<LayoutAdminInstallObj> {
    const users = await this.databaseService.db
      .select({ count: count() })
      .from(core_users);
    if (users[0].count > 0) {
      const [sessionCount, sessionCountAdmin] = [
        await this.databaseService.db
          .select({ count: count() })
          .from(core_sessions),
        await this.databaseService.db
          .select({ count: count() })
          .from(core_admin_sessions),
      ];

      if (sessionCount[0].count > 0 || sessionCountAdmin[0].count > 0) {
        throw new AccessDeniedError();
      }

      return {
        status: LayoutAdminInstallEnum.FINISH,
      };
    }

    const languages = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages);
    if (languages[0].count > 0) {
      return {
        status: LayoutAdminInstallEnum.ACCOUNT,
      };
    }

    return {
      status: LayoutAdminInstallEnum.DATABASE,
    };
  }
}
