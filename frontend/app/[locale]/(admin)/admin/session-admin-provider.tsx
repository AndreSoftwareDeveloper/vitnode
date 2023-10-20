'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Admin_Sessions,
  Authorization_Admin_SessionsQuery,
  Authorization_Admin_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionAdminContext } from '@/admin/hooks/use-session-admin';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  children: ReactNode;
  initialDataSession: Authorization_Admin_SessionsQuery | undefined;
}

export const SessionAdminProvider = ({ children, initialDataSession }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION_ADMIN],
    queryFn: async () =>
      await fetcher<Authorization_Admin_SessionsQuery, Authorization_Admin_SessionsQueryVariables>({
        query: Authorization_Admin_Sessions
      }),
    initialData: initialDataSession
  });

  return (
    <SessionAdminContext.Provider value={{ session: data }}>
      {children}
    </SessionAdminContext.Provider>
  );
};
