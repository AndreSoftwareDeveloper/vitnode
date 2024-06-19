import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Loader } from "@/components/loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ContentDeleteActionTableNavDevPluginAdminProps } from "./content";

import { useItemNavDevPluginAdmin } from "../../hooks/use-item-nav-dev-plugin-admin";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionTableNavDevPluginAdmin
  }))
);

export const DeleteActionTableNavDevPluginAdmin = (
  props: ContentDeleteActionTableNavDevPluginAdminProps
) => {
  const t = useTranslations("core");
  const { parentId } = useItemNavDevPluginAdmin();

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructiveGhost"
                size="icon"
                ariaLabel={t("delete")}
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t("delete")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} parentCode={parentId} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};