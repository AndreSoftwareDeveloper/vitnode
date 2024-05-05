import { useTranslations } from "next-intl";
import { type ReactNode, type ForwardedRef, forwardRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/functions/classnames";

interface Props {
  children: ReactNode;
  name: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonToolbarEditor = forwardRef(
  (
    { active, children, disabled, name, onClick }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const t = useTranslations("core.editor");

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              variant="ghost"
              className={cn("shadow-none", {
                "bg-accent": active
              })}
              size="icon"
              onClick={onClick}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              ariaLabel={t(name)}
              disabled={disabled}
            >
              {children}
            </Button>
          </TooltipTrigger>

          {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <TooltipContent>{t(name)}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

ButtonToolbarEditor.displayName = "ButtonToolbarEditor";