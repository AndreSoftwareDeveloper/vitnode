'use server';

import { cookies } from 'next/headers';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Delete,
  Core_Groups__Admin__DeleteMutation,
  Core_Groups__Admin__DeleteMutationVariables
} from '@/graphql/hooks';

export const mutationApi = async (variables: Core_Groups__Admin__DeleteMutationVariables) => {
  try {
    const data = await fetcher<
      Core_Groups__Admin__DeleteMutation,
      Core_Groups__Admin__DeleteMutationVariables
    >({
      query: Core_Groups__Admin__Delete,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    return { data };
  } catch (error) {
    return { error };
  }
};