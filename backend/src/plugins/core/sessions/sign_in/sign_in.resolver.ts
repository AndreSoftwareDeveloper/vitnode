import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Ctx } from "@vitnode/backend";

import { SignInCoreSessionsService } from "./sign_in.service";
import { SignInCoreSessionsArgs } from "./dto/sign_in.args";

@Resolver()
export class SignInCoreSessionsResolver {
  constructor(private readonly service: SignInCoreSessionsService) {}

  @Mutation(() => String)
  async core_sessions__sign_in(
    @Args() args: SignInCoreSessionsArgs,
    @Context() context: Ctx
  ): Promise<string> {
    return this.service.signIn(args, context);
  }
}