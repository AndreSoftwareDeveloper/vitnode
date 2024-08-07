import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteAdminStaffAdministratorsArgs } from './dto/delete.args';

import { DatabaseService } from '../../../../../database';
import { CustomError, NotFoundError } from '../../../../../errors';
import { core_admin_permissions } from '../../../../../templates/core/admin/database/schema/admins';

@Injectable()
export class DeleteAdminStaffAdministratorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ id }: DeleteAdminStaffAdministratorsArgs): Promise<string> {
    const permission =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq }) => eq(table.id, id),
      });

    if (!permission) {
      throw new NotFoundError('Permission');
    }

    if (permission.protected) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You cannot delete this permission with protected flag.',
      });
    }

    await this.databaseService.db
      .delete(core_admin_permissions)
      .where(eq(core_admin_permissions.id, id));

    return 'Success!';
  }
}
