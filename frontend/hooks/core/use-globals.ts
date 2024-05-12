import { createContext, useContext } from "react";

import type { ShowCoreLanguages, ShowCoreThemes } from "@/graphql/hooks";
import type { ConfigType } from "@/config";

interface Args {
  config: ConfigType;
  defaultLanguage: string;
  languages: Pick<
    ShowCoreLanguages,
    | "code"
    | "default"
    | "enabled"
    | "locale"
    | "time_24"
    | "name"
    | "timezone"
    | "allow_in_input"
  >[];
  themeId: number;
  themes: Pick<ShowCoreThemes, "id" | "name">[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: "",
  themes: [],
  config: {} as ConfigType,
  themeId: 1
});

export const useGlobals = () => useContext(GlobalsContext);
