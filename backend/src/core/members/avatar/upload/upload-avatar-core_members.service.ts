import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '@/src/core/attachments/upload/upload-core_attachments.service';
import { User } from '@/utils/decorators/user.decorator';
import { PrismaService } from '@/prisma/prisma.service';
import { DeleteCoreAttachmentsService } from '../../../attachments/delete/delete-core_attachments.service';
import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';
import { CustomError } from '../../../../../utils/errors/CustomError';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(
    private readonly uploadFile: UploadCoreAttachmentsService,
    private readonly deleteFile: DeleteCoreAttachmentsService,
    private readonly prisma: PrismaService
  ) {}

  async uploadAvatar(
    { id }: User,
    { file }: UploadAvatarCoreMembersArgs
  ): Promise<UploadCoreAttachmentsObj> {
    // Check if the user already has an avatar
    const avatar = await this.prisma.core_attachments.findFirst({
      where: {
        module: 'core_members',
        module_id: id
      }
    });

    if (avatar) {
      await this.deleteFile.deleteFile({
        module: {
          module: 'core_members',
          id: id
        }
      });
    }

    const currentFile = await this.uploadFile.upload({
      files: [
        {
          file,
          description: 'Avatar',
          position: 0
        }
      ],
      maxUploadSizeBytes: 1e6, // 1MB
      acceptMimeType: ['image/png', 'image/jpeg'],
      module: 'core_members',
      module_id: id
    });

    if (currentFile.length <= 0) {
      throw new CustomError({
        code: 'UNKNOWN_ERROR',
        message:
          'We could not upload your avatar and save it to database. This is error from engine.'
      });
    }

    return currentFile[0];
  }
}