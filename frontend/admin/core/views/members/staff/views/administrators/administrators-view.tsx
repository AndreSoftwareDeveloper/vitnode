import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import type { Admin__Core_Staff_Administrators__ShowQuery } from "@/graphql/hooks";
import { TableAdministratorsStaffAdmin } from "./table/table";
import { ActionsAdministratorsStaffAdmin } from "./actions/actions";

export interface AdministratorsStaffAdminViewProps {
  data: Admin__Core_Staff_Administrators__ShowQuery;
}

export const AdministratorsStaffAdminView = (
  props: AdministratorsStaffAdminViewProps
) => {
  const t = useTranslations("admin.members.staff.administrators");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsAdministratorsStaffAdmin />
      </HeaderContent>
      <TableAdministratorsStaffAdmin {...props} />
    </>
  );
};
