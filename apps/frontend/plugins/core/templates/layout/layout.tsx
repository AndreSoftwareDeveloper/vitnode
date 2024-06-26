import * as React from "react";

import { Header } from "./header/header";
import { QuickMenu } from "./quick-menu/quick-menu";
import { TextLanguage } from "@/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { PoweredByVitNode } from "@/plugins/admin/global/powered-by";
import "./global.css";

interface Props {
  children: React.ReactNode;
  copyright?: TextLanguage[];
}

export const Layout = ({ children, copyright }: Props) => {
  const { convertText } = useTextLang();

  /**
   * Thanks for using VitNode!
   *
   * ! This is an open source project, you can use it for free.
   * ! If you want to support us, please consider donating.
   * ! You can remove this component if you want, but we will be very grateful if you leave it.
   * ! Thank you for your support!
   */
  const poweredBy = (
    <footer className="mb-16 flex flex-col items-center justify-center gap-2 p-5 text-center text-sm md:mb-0">
      {copyright && <span>{convertText(copyright)}</span>}
      <PoweredByVitNode className="text-muted-foreground no-underline" />
    </footer>
  );

  return (
    <>
      <Header />
      {children}
      {poweredBy}
      <QuickMenu />
    </>
  );
};
