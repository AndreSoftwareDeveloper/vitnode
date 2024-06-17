import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { CustomError } from "@vitnode/backend";

import { CreateAdminPluginsArgs } from "./dto/create.args";
import { ShowAdminPlugins } from "../show/dto/show.obj";
import { CreateFilesAdminPluginsService } from "../helpers/files/create/create-files.service";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";

import { core_plugins } from "../../database/schema/plugins";
import { DatabaseService } from "@/database/database.service";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class CreateAdminPluginsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly createFilesService: CreateFilesAdminPluginsService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService
  ) {}

  async create({
    author,
    author_url,
    code,
    description,
    name,
    support_url
  }: CreateAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (plugin || code === "admin" || code === "core" || code === "members") {
      throw new CustomError({
        code: "PLUGIN_ALREADY_EXISTS",
        message: `Plugin already exists with "${code}" code!`
      });
    }

    // Modifying / Create files
    this.createFilesService.createFiles({
      author,
      author_url,
      code,
      description,
      name,
      support_url,
      allow_default: true,
      nav: []
    });
    this.changeFilesService.changeFilesWhenCreate({ code });

    // Create lang.json file inside the plugin frontend folder
    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        orderBy: (table, { asc }) => asc(table.code)
      });

    languages.forEach(async lang => {
      const langPath = join(ABSOLUTE_PATHS.plugin({ code }).frontend.language);

      if (!fs.existsSync(langPath)) {
        fs.mkdirSync(langPath, { recursive: true });
      }

      fs.writeFileSync(
        join(langPath, `${lang.code}.json`),
        JSON.stringify(
          {
            [code]: {
              admin: {}
            }
          },
          null,
          2
        ),
        "utf-8"
      );
    });

    const data = await this.databaseService.db
      .insert(core_plugins)
      .values({
        code,
        description,
        name,
        support_url,
        author,
        author_url
      })
      .returning();

    return data[0];
  }
}