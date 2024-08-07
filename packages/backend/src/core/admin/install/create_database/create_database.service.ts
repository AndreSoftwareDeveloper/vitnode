import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { DatabaseService } from '../../../../database';
import { CustomError } from '../../../../errors';
import { core_languages } from '../../../../templates/core/admin/database/schema/languages';
import {
  core_groups,
  core_groups_names,
} from '../../../../templates/core/admin/database/schema/groups';
import { core_admin_permissions } from '../../../../templates/core/admin/database/schema/admins';
import {
  core_nav,
  core_nav_name,
} from '../../../../templates/core/admin/database/schema/nav';
import { core_moderators_permissions } from '../../../../templates/core/admin/database/schema/moderators';

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(private readonly databaseService: DatabaseService) {}

  protected throwError() {
    throw new CustomError({
      code: 'DATABASE_ALREADY_EXISTS',
      message: 'Database already exists.',
    });
  }

  async create(): Promise<string> {
    // Create default language
    const languageCount = await this.databaseService.db
      .select({
        count: count(),
      })
      .from(core_languages);
    if (languageCount[0].count > 0) {
      this.throwError();
    }

    await this.databaseService.db.insert(core_languages).values([
      {
        code: 'en',
        name: 'English (USA)',
        default: true,
        protected: true,
        timezone: 'America/New_York',
        locale: 'enUS',
        site_copyright: `Copyright © VitNode ${new Date().getFullYear()}`,
      },
      {
        code: 'pl',
        name: 'Polski (Polish)',
        timezone: 'Europe/Warsaw',
        time_24: true,
        locale: 'pl',
        site_copyright: `Prawa autorskie © VitNode ${new Date().getFullYear()}`,
      },
    ]);

    // Create default groups
    const groupCount = await this.databaseService.db
      .select({
        count: count(),
      })
      .from(core_groups);
    if (groupCount[0].count > 0) {
      this.throwError();
    }

    const guestGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        guest: true,
        files_allow_upload: false,
        files_total_max_storage: -1,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: guestGroup[0].id,
        language_code: 'en',
        value: 'Guest',
      },
      {
        item_id: guestGroup[0].id,
        language_code: 'pl',
        value: 'Gość',
      },
    ]);

    const memberGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        default: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: memberGroup[0].id,
        language_code: 'en',
        value: 'Member',
      },
      {
        item_id: memberGroup[0].id,
        language_code: 'pl',
        value: 'Użytkownik',
      },
    ]);

    const moderatorGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: moderatorGroup[0].id,
        language_code: 'en',
        value: 'Moderator',
      },
      {
        item_id: moderatorGroup[0].id,
        language_code: 'pl',
        value: 'Moderator',
      },
    ]);

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: moderatorGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    const adminGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        root: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: adminGroup[0].id,
        language_code: 'en',
        value: 'Administrator',
      },
      {
        item_id: adminGroup[0].id,
        language_code: 'pl',
        value: 'Administrator',
      },
    ]);

    await this.databaseService.db.insert(core_admin_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    // Create navigation
    const nav = await this.databaseService.db
      .insert(core_nav)
      .values([
        {
          href: '/',
        },
        {
          href: 'https://vitnode.com/',
          external: true,
        },
      ])
      .returning();

    await this.databaseService.db.insert(core_nav_name).values([
      {
        item_id: nav[0].id,
        language_code: 'en',
        value: 'Home',
      },
      {
        item_id: nav[0].id,
        language_code: 'pl',
        value: 'Strona główna',
      },
      {
        item_id: nav[1].id,
        language_code: 'en',
        value: 'VitNode',
      },
    ]);

    return 'Success!';
  }
}
