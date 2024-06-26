"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "@vitnode/frontend/navigation";

import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (
  variables: Core_Sessions__Sign_InMutationVariables,
) => {
  try {
    await fetcher<
      Core_Sessions__Sign_InMutation,
      Core_Sessions__Sign_InMutationVariables
    >({
      query: Core_Sessions__Sign_In,
      variables,
    });
  } catch (error) {
    return { error };
  }

  revalidatePath(variables.admin ? "/admin" : "/", "layout");
  redirect(variables.admin ? "/admin/core/dashboard" : "/");
};
