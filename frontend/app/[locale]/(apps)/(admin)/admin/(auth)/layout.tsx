import type { ReactNode } from 'react';
import { cookies, headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { AdminLayout } from '@/admin/core/layout/admin-layout';
import { SessionAdminProvider } from './session-admin-provider';
import { redirect } from '@/i18n';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Sessions__Authorization,
  type Admin_Sessions__AuthorizationQuery,
  type Admin_Sessions__AuthorizationQueryVariables
} from '@/graphql/hooks';
import { getConfig } from '@/functions/get-config';

const getData = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get('vitnode-login-token-admin')) {
    return;
  }

  const { data } = await fetcher<
    Admin_Sessions__AuthorizationQuery,
    Admin_Sessions__AuthorizationQueryVariables
  >({
    query: Admin_Sessions__Authorization,
    headers: {
      Cookie: cookies().toString(),
      ['user-agent']: headers().get('user-agent') ?? 'node'
    }
  });

  return data;
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const config = await getConfig();
  const t = await getTranslations({ locale, namespace: 'admin' });

  const defaultTitle = `${t('title_short')} - ${config.side_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    }
  };
}

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();
    if (!data) {
      return redirect('/admin');
    }

    return (
      <SessionAdminProvider data={data}>
        <AdminLayout>{children}</AdminLayout>
      </SessionAdminProvider>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      redirect('/admin');
    }

    throw error;
  }
}
