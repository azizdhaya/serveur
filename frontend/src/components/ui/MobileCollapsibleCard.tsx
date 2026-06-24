import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Sur mobile : section repliable (accordéon natif).
 * À partir de md : carte classique avec en-tête.
 */
export function MobileCollapsibleCard({
  title,
  description,
  children,
  defaultOpen = false,
  className,
  contentClassName,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
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
        <div className={cn("space-y-3 border-t border-slate-100 p-3", contentClassName)}>
          {description ? (
            <div className="text-xs font-normal text-slate-500">{description}</div>
          ) : null}
          {children}
        </div>
      </details>
      <Card className={cn("hidden border-slate-200 shadow-sm md:block", className)}>
        <CardHeader className="py-3">
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {description ? (
            <div className="mt-1 text-xs font-normal text-slate-500">{description}</div>
          ) : null}
        </CardHeader>
        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    </>
  );
}
