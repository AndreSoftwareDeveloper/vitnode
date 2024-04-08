"use client";

import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useEditorAdmin, type EditorAdminArgs } from "./hooks/use-editor-admin";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const EditorAdminView = ({ data }: EditorAdminArgs) => {
  const t = useTranslations("admin.core.styles.editor");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useEditorAdmin({ data });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:max-w-2xl"
        >
          <FormField
            control={form.control}
            name="sticky"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {t("sticky.label")}
                  </FormLabel>
                  <FormDescription>{t("sticky.desc")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" loading={form.formState.isSubmitting}>
            {tCore("save")}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
