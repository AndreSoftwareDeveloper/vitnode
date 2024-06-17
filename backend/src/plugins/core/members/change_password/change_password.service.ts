import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DatabaseService } from "@/database/database.service";
import { core_users } from "../../admin/database/schema/users";
import { core_keys } from "../../admin/database/schema/keys";
import { ChangePasswordCoreMembersArgs } from "./dto/change_password.args";
import { ChangePasswordCoreMembersObj } from "./dto/change_password.obj";
import { genSalt, hash } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}

  async change_password({
    key,
    password
  }: ChangePasswordCoreMembersArgs): Promise<ChangePasswordCoreMembersObj> {
    const keyData = await this.databaseService.db.query.core_keys.findFirst({
      where: eq(core_keys.key, key)
    });

    const id = keyData.user_id;
    const passwordSalt = await genSalt(
      this.configService.getOrThrow("password_salt")
    );
    const hashPassword = await hash(password, passwordSalt);

    const update = await this.databaseService.db
      .update(core_users)
      .set({
        password: hashPassword
      })
      .where(eq(core_users.id, id))
      .returning();

    return update[0];
  }
}