import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { GroupsUsersAdminView } from '@/admin/views/users/groups/groups-users-admin-view';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Show_Core_Groups,
  Show_Core_GroupsQuery,
  Show_Core_GroupsQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  params: {
    locale: string;
  };
}

const getData = async () => {
  return await fetcher<Show_Core_GroupsQuery, Show_Core_GroupsQueryVariables>({
    query: Show_Core_Groups,
    variables: {
      first: 10
    },
    headers: {
      Cookie: cookies().toString()
    }
  });
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslator(locale, 'admin');

  return {
    title: t('users.groups.title')
  };
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [APIKeys.GROUPS, { cursor: null, first: 0, last: null }],
    queryFn: getData
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GroupsUsersAdminView />
    </HydrationBoundary>
  );
}