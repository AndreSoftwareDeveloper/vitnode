import { Module } from '@nestjs/common';

import { CreateAdminCoreLanguageService } from './create/create.service';
import { CreateAdminCoreLanguagesResolver } from './create/create.resolver';
import { EditAdminCoreLanguagesResolver } from './edit/edit.resolver';
import { EditAdminCoreLanguagesService } from './edit/edit.service';
import { DeleteAdminCoreLanguagesResolver } from './delete/delete.resolver';
import { DeleteAdminCoreLanguageService } from './delete/delete.service';
import { DownloadAdminCoreLanguageService } from './download/download.service';
import { DownloadAdminCoreLanguagesResolver } from './download/download.resolver';
import { UpdateAdminCoreLanguageService } from './update/update.service';
import { UpdateAdminCoreLanguagesResolver } from './update/update.resolver';

@Module({
  providers: [
    CreateAdminCoreLanguageService,
    CreateAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesService,
    DeleteAdminCoreLanguagesResolver,
    DeleteAdminCoreLanguageService,
    DownloadAdminCoreLanguageService,
    DownloadAdminCoreLanguagesResolver,
    UpdateAdminCoreLanguageService,
    UpdateAdminCoreLanguagesResolver,
  ],
})
export class AdminLanguagesModule {}
