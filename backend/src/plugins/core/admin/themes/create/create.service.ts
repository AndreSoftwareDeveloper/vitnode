import * as fs from "fs";
import { writeFile } from "fs/promises";

import { Injectable } from "@nestjs/common";

import { CreateAdminThemesArgs } from "./dto/create.args";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { core_themes } from "../../database/schema/themes";
import { DatabaseService } from "@/database/database.service";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class CreateAdminThemesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({
    author,
    author_url,
    name,
    support_url
  }: CreateAdminThemesArgs): Promise<ShowAdminThemes> {
    const theme = await this.databaseService.db
      .insert(core_themes)
      .values({
        name,
        support_url,
        author,
        author_url
      })
      .returning();

    const { id } = theme[0];

    // Copy the default theme to the new theme
    const path = ABSOLUTE_PATHS.frontend.theme({ theme_id: id }).root;
    fs.cpSync(ABSOLUTE_PATHS.frontend.theme({ theme_id: 1 }).root, path, {
      recursive: true
    });

    // Update the config.json file
    const pathThemeConfig = `${path}/config.json`;
    await writeFile(
      pathThemeConfig,
      JSON.stringify(
        { name, version: "", version_code: 0, author, author_url, support_url },
        null,
        2
      )
    );

    // Update the global.css file
    const pathSCSSFile = `${path}/core/layout/global.css`;
    const pathSCSSFileContent = fs.readFileSync(pathSCSSFile, "utf8");
    await writeFile(
      pathSCSSFile,
      pathSCSSFileContent.replaceAll(
        `[data-theme-id="1"]`,
        `[data-theme-id="${id}"]`
      )
    );

    return theme[0];
  }
}