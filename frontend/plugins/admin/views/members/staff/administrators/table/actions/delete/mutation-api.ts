"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Staff_Administrators__Delete,
  Admin__Core_Staff_Administrators__DeleteMutation,
  Admin__Core_Staff_Administrators__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Staff_Administrators__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Administrators__DeleteMutation,
      Admin__Core_Staff_Administrators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Administrators__Delete,
      variables
    });

    revalidatePath("/admin/members/staff/administrators", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};