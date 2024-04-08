import { createContext, useContext } from "react";

import type { ShowCoreLanguages, ShowCoreThemes } from "@/graphql/hooks";
import type { ConfigType } from "@/functions/get-config-file";

interface Args {
  config: ConfigType;
  defaultLanguage: string;
  languages: Pick<
    ShowCoreLanguages,
    "code" | "default" | "enabled" | "locale" | "time_24" | "name" | "timezone"
  >[];
  themes: Pick<ShowCoreThemes, "id" | "name">[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: "",
  themes: [],
  config: {
    rebuild_required: {
      langs: false,
      plugins: false,
      themes: false
    },
    side_name: "",
    editor: {
      sticky: false
    }
  }
});

export const useGlobals = () => useContext(GlobalsContext);
