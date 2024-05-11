import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { TransformString } from "@/utils/types/database/text-language.type";
import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";
import { Transform } from "class-transformer";

enum ShowCoreMembersSortingColumnEnum {
  name = "name",
  joined = "joined",
  first_name = "first_name",
  last_name = "last_name",
  posts = "posts",
  followers = "followers",
  reactions = "reactions"
}

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: "ShowCoreMembersSortingColumnEnum"
});

@InputType()
class ShowCoreMembersSortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs extends PaginationArgs {
  @Field(() => ShowCoreMembersSortByArgs, { nullable: true })
  sortBy: ShowCoreMembersSortByArgs | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  name_seo: string | null;
}
