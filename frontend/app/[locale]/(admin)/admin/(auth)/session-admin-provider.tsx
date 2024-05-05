"use client";

import type { ReactNode } from "react";

import type { Admin__Sessions__AuthorizationQuery } from "@/graphql/hooks";
import { SessionAdminContext } from "@/admin/core/hooks/use-session-admin";

interface Props {
  children: ReactNode;
  data: Admin__Sessions__AuthorizationQuery;
}

export const SessionAdminProvider = ({
  children,
  data: {
    admin__sessions__authorization: { nav, user: session, version }
  }
}: Props) => {
  return (
    <SessionAdminContext.Provider
      value={{
        session,
        version,
        nav
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};