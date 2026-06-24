import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Champ date natif (calendrier du navigateur), adapté au formulaire projet.
 */
export const DateInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="date"
    className={cn(
      "flex h-10 w-full min-w-[10rem] rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-800 [color-scheme:light] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0081c4]",
      className
    )}
    {...props}
  />
));
DateInput.displayName = "DateInput";
