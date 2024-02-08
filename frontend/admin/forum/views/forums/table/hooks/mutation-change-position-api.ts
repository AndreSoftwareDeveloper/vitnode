"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  type Admin__Forum_Forums__Change_PositionMutation,
  type Admin__Forum_Forums__Change_PositionMutationVariables,
  Admin__Forum_Forums__Change_Position
} from "@/graphql/hooks";

export const mutationChangePositionApi = async (
  variables: Admin__Forum_Forums__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__Change_PositionMutation,
      Admin__Forum_Forums__Change_PositionMutationVariables
    >({
      query: Admin__Forum_Forums__Change_Position,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidateTag("Forum_Forums__Show");

    return { data };
  } catch (error) {
    return { error };
  }
};
