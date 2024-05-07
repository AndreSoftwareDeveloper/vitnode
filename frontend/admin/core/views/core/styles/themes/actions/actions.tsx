import { CONFIG } from "@/config/config";
import { CreateActionThemeAdmin } from "./create/create";
import { UploadActionThemeAdmin } from "./upload";

export const ActionsThemesAdmin = () => {
  return (
    <>
      <UploadActionThemeAdmin />
      {CONFIG.node_development && <CreateActionThemeAdmin />}
    </>
  );
};
