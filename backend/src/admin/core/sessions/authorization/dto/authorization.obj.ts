import { Field, ObjectType } from "@nestjs/graphql";

import { AuthorizationCurrentUserObj } from "@/src/core/sessions/authorization/dto/authorization.obj";
@ObjectType()
class RebuildRequiredObj {
  @Field(() => Boolean)
  themes: boolean;

  @Field(() => Boolean)
  langs: boolean;

  @Field(() => Boolean)
  plugins: boolean;
}

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => RebuildRequiredObj)
  rebuild_required: RebuildRequiredObj;
}
