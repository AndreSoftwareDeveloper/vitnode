import { Module } from "@nestjs/common";

import { CreateForumForumsService } from "./forums/create/create.service";
import { CreateForumForumsResolver } from "./forums/create/create.resolver";
import { ChangePositionForumForumsResolver } from "./forums/change_position/change_position.resolver";
import { ChangePositionForumForumsService } from "./forums/change_position/change_position.service";
import { ShowForumForumsAdminResolver } from "./forums/show/show.resolver";
import { ShowForumForumsAdminService } from "./forums/show/show.service";
import { EditForumForumsResolver } from "./forums/edit/edit.resolver";
import { EditForumForumsService } from "./forums/edit/edit.service";

@Module({
  providers: [
    CreateForumForumsService,
    CreateForumForumsResolver,
    ChangePositionForumForumsResolver,
    ChangePositionForumForumsService,
    ShowForumForumsAdminResolver,
    ShowForumForumsAdminService,
    EditForumForumsResolver,
    EditForumForumsService
  ]
})
export class AdminForumModule {}
