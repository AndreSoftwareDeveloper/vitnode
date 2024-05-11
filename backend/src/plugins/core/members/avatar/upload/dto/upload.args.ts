import { ArgsType, Field } from "@nestjs/graphql";

import { FileUpload } from "@/utils/graphql-upload/Upload";
import { GraphQLUpload } from "@/utils/graphql-upload/graphql-upload";

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
