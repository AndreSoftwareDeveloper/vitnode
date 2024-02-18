import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { useLocale } from "next-intl";

import { useGlobals } from "@/hooks/core/use-globals";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { FormControl } from "./ui/form";
import type { TextLanguage } from "@/graphql/hooks";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
}

const TextLanguageInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, ...props }, ref) => {
    const locale = useLocale();
    const { defaultLanguage, languages } = useGlobals();
    const [selectedLanguage, setSelectedLanguage] = useState(
      locale ?? defaultLanguage
    );
    const valueAsArray = Array.isArray(value) ? value : [];
    const currentValue =
      valueAsArray.find(item => item.language_code === selectedLanguage)
        ?.value ?? "";

    return (
      <div className="flex gap-2">
        <Input
          className="flex-grow"
          type="text"
          onChange={e => {
            const value = e.target.value;

            if (value) {
              onChange([
                ...valueAsArray.filter(
                  item => item.language_code !== selectedLanguage
                ),
                {
                  language_code: selectedLanguage,
                  value: value
                }
              ]);

              return;
            }

            onChange(
              valueAsArray.filter(
                item => item.language_code !== selectedLanguage
              )
            );
          }}
          value={currentValue}
          ref={ref}
          {...props}
        />

        {languages.length > 1 && (
          <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
            <FormControl>
              <SelectTrigger className="basis-64">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {languages.map(language => (
                <SelectItem key={language.id} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }
);
TextLanguageInput.displayName = "TextLanguageInput";

export { TextLanguageInput };
