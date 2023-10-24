import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowCoreMembersSortingColumnEnum {
  name = 'name',
  name_seo = 'name_seo',
  joined = 'joined',
  birthday = 'birthday',
  first_name = 'first_name',
  last_name = 'last_name',
  posts = 'posts',
  followers = 'followers',
  reactions = 'reactions'
}

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: 'ShowCoreMembersSortingColumnEnum'
});

@InputType()
class ShowCoreMembersSortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int)
  first: number;

  @Field(() => [ShowCoreMembersSortByArgs], { nullable: true })
  sortBy?: ShowCoreMembersSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;
}
