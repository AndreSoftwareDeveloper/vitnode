import { Injectable } from '@nestjs/common';

import { CreateAdminNavArgs } from './dto/create.args';

import { DatabaseService } from '../../../../database';
import { ParserTextLanguageCoreHelpersService } from '../../../helpers/text_language/parser/parser.service';
import { ShowCoreNav } from '../../../nav/show/dto/show.obj';
import {
  core_nav,
  core_nav_description,
  core_nav_name,
} from '../../../../templates/core/admin/database/schema/nav';

@Injectable()
export class CreateAdminNavService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async create({
    description,
    external,
    href,
    icon,
    name,
  }: CreateAdminNavArgs): Promise<ShowCoreNav> {
    const theMostHighestPosition =
      await this.databaseService.db.query.core_nav.findFirst({
        where: (table, { eq }) => eq(table.parent_id, 0),
        orderBy: (table, { desc }) => desc(table.position),
      });

    const nav = await this.databaseService.db
      .insert(core_nav)
      .values({
        href,
        external,
        icon,
        position: theMostHighestPosition
          ? theMostHighestPosition.position + 1
          : 0,
      })
      .returning();

    const id = nav[0].id;

    const namesNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_name,
      data: name,
    });

    const descriptionNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_description,
      data: description,
    });

    return {
      ...nav[0],
      name: namesNav,
      description: descriptionNav,
      children: [],
    };
  }
}
