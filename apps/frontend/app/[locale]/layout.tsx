import * as React from "react";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { RootLayout } from "vitnode-frontend/views/layout";

import { CONFIG } from "@/config";
import {
  Core_Middleware,
  Core_MiddlewareQuery,
  Core_MiddlewareQueryVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import "@/app/[locale]/(admin)/admin/global.css";
import "./global.css";

const getMiddlewareData = async () => {
  const { data } = await fetcher<
    Core_MiddlewareQuery,
    Core_MiddlewareQueryVariables
  >({
    query: Core_Middleware,
    cache: "force-cache",
  });

  return data;
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  return {
    manifest: `${CONFIG.backend_public_url}/assets/${locale}/manifest.webmanifest`,
  };
}

export default function LocaleLayout(props: Props) {
  return (
    <RootLayout
      className={GeistSans.className}
      getMiddlewareData={getMiddlewareData}
      {...props}
    />
  );
}
