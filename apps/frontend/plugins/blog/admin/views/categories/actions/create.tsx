"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Content = React.lazy(async () =>
  import("../create-edit/create-edit").then(module => ({
    default: module.CreateEditCategoryBlogAdmin,
  })),
);

export const CreateCategoryBlogAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("create")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
