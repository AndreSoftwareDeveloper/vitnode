import { Module } from '@nestjs/common';

import { ShowPostsForumsResolver } from './show/show.resolver';
import { ShowPostsForumsService } from './show/show.service';

import { CreateForumPostsResolver } from '@/src/forum/posts/create/create.resolver';
import { CreateForumsPostsService } from '@/src/forum/posts/create/create.service';

@Module({
  providers: [
    ShowPostsForumsResolver,
    ShowPostsForumsService,
    CreateForumPostsResolver,
    CreateForumsPostsService
  ],
  exports: [CreateForumsPostsService]
})
export class PostsForumModule {}