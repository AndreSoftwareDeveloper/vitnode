import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminFilesArgs {
  @Field(() => Int)
  id: number;
}
