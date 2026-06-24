import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sur mobile : enveloppe repliable autour d’un bloc (ex. grille de graphiques).
 * À partir de md : le wrapper disparaît (`contents`) pour ne pas casser la grille parente.
 */
export function MobileOnlyCollapsible({
  title,
  description,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <>
      <details
        className={cn(
          "group rounded-xl border border-slate-200 bg-white md:hidden",
          className
        )}
        open={defaultOpen}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 [&::-webkit-details-marker]:hidden [&::marker]:hidden">
          <span className="min-w-0 flex-1">{title}</span>
          <ChevronDown className="size-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-3 border-t border-slate-100 p-3">
          {description ? (
            <div className="text-xs font-normal text-slate-500">{description}</div>
          ) : null}
          {children}
        </div>
      </details>
      <div className="hidden md:contents">{children}</div>
    </>
  );
}
