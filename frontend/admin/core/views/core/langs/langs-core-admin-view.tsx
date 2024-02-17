import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TableLangsCoreAdmin } from "./table/table";
import type { Core_Languages__ShowQuery } from "@/graphql/hooks";
import { ActionsLangsAdmin } from "./actions/actions";

export interface LangsCoreAdminViewProps {
  data: Core_Languages__ShowQuery;
}

export const LangsCoreAdminView = (props: LangsCoreAdminViewProps) => {
  const t = useTranslations("admin.core.langs");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsLangsAdmin />
      </HeaderContent>

      <TableLangsCoreAdmin {...props} />
    </>
  );
};
