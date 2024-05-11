/* eslint-disable no-console */

import * as fs from "fs";
import { join } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { ConfigType, DEFAULT_CONFIG_DATA } from "@/utils/DELETE/config";
import { configPath, getConfigFile } from "@/utils/DELETE/config_test";
import { db } from "@/database/client";
import { updatePlugins } from "../helpers/update-plugins";

(async () => {
  // Update config file
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    ...DEFAULT_CONFIG_DATA
  };

  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");

  // Migration for database
  await migrate(db, {
    migrationsFolder: join(
      process.cwd(),
      "src",
      "plugins",
      "core",
      "admin",
      "database",
      "migrations"
    )
  });

  fs.readdir(join(process.cwd(), "src", "plugins"), async (err, plugins) => {
    await Promise.all(
      plugins
        .filter(
          plugin => !["database", "plugins.module.ts", "core"].includes(plugin)
        )
        .map(async plugin => {
          // Check if migration folder exists
          const migrationPath = join(
            process.cwd(),
            "src",
            "plugins",
            plugin,
            "admin",
            "database",
            "migrations"
          );

          if (!fs.existsSync(migrationPath)) {
            return;
          }

          // Run migration
          try {
            await migrate(db, {
              migrationsFolder: migrationPath
            });
          } catch (error) {
            console.error(`[VitNode] - Error running migration for ${plugin}`);
            console.error(error);

            throw error;
          }

          console.log(
            `[VitNode] - Running migration for ${plugin} - ${migrationPath}`
          );
        })
    );
  });

  // Update plugins
  await updatePlugins({ db });

  console.log("[VitNode] - Successfully finished build");
})();
