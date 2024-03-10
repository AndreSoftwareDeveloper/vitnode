import { lazy, type LazyExoticComponent, type ReactNode } from "react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getTopicData } from "./query";
import { getConvertTextLang } from "@/hooks/core/use-text-lang";
import type { ErrorType } from "@/graphql/fetcher";
import type { ErrorViewProps } from "@/themes/1/core/views/global/error/error-view";
import { getSessionData } from "@/functions/get-session-data";

interface Props {
  children: ReactNode;
  params: {
    id: string;
    locale: string;
  };
}

export default async function Layout({
  children,
  params: { id, locale }
}: Props) {
  const { theme_id } = await getSessionData();

  try {
    const data = await getTopicData({ id });
    const breadcrumbItems = data.forum_topics__show.edges[0].breadcrumbs.map(
      item => ({
        id: item.id,
        text: getConvertTextLang({ locale, text: item.name }),
        href: `/forum/${item.id}`
      })
    );

    return (
      <>
        {breadcrumbItems.length > 1 && <Breadcrumbs items={breadcrumbItems} />}
        {children}
      </>
    );
  } catch (e) {
    const error = e as ErrorType;

    if (error.extensions?.code === "ACCESS_DENIED") {
      const ErrorView: LazyExoticComponent<
        (props: ErrorViewProps) => JSX.Element
      > = lazy(() =>
        import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
          () => import("@/themes/1/core/views/global/error/error-view")
        )
      );

      return <ErrorView code="403" />;
    }

    notFound();
  }
}