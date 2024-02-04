import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminNavService } from './edit.service';
import { EditAdminNavArgs } from './dto/edit.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';
import { ShowCoreNav } from '@/src/core/nav/show/dto/show.obj';

@Resolver()
export class EditAdminNavResolver {
  constructor(private readonly service: EditAdminNavService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async core_nav__admin__edit(@Args() args: EditAdminNavArgs): Promise<ShowCoreNav> {
    return await this.service.edit(args);
  }
}
