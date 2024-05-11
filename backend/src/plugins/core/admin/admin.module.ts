import { Module } from "@nestjs/common";
import { AdminInstallModule } from "./install/install.module";
import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminSettingsModule } from "./settings/settings.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminThemesModule } from "./themes/themes.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminFilesModule } from "./files/files.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminLanguagesModule } from "./languages/languages.module";

@Module({
  imports: [
    AdminInstallModule,
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminSettingsModule,
    AdminPluginsModule,
    AdminThemesModule,
    AdminMetadataModule,
    AdminFilesModule,
    AdminGroupsModule,
    AdminLanguagesModule
  ]
})
export class AdminModule {}
