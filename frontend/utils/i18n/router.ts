"use client";

import NProgress from "nprogress";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { usePathname } from ".";

const { useRouter: useRouterI18n } = createSharedPathnamesNavigation();

const useRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouterI18n();
  const { push } = router;

  router.push = (href, options) => {
    NProgress.start();
    push(href, options);
  };

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return router;
};

export { useRouter };
