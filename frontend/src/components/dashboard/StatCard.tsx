import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatTone = "blue" | "emerald" | "amber" | "rose" | "slate";

const TONE_CLASS: Record<
  StatTone,
  { card: string; icon: string; iconRing: string; iconText: string }
> = {
  blue: {
    card: "border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white to-white",
    icon: "bg-gradient-to-br from-sky-100 to-cyan-100",
    iconRing: "ring-sky-300/60",
    iconText: "text-sky-700",
  },
  emerald: {
    card: "border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-white to-white",
    icon: "bg-gradient-to-br from-emerald-100 to-teal-100",
    iconRing: "ring-emerald-300/60",
    iconText: "text-emerald-700",
  },
  amber: {
    card: "border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-white to-white",
    icon: "bg-gradient-to-br from-amber-100 to-orange-100",
    iconRing: "ring-amber-300/60",
    iconText: "text-amber-700",
  },
  rose: {
    card: "border-rose-200/70 bg-gradient-to-br from-rose-50/80 via-white to-white",
    icon: "bg-gradient-to-br from-rose-100 to-pink-100",
    iconRing: "ring-rose-300/60",
    iconText: "text-rose-700",
  },
  slate: {
    card: "border-slate-200/70 bg-gradient-to-br from-slate-50/80 via-white to-white",
    icon: "bg-gradient-to-br from-slate-100 to-slate-200/80",
    iconRing: "ring-slate-300/60",
    iconText: "text-slate-700",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  tone = "blue",
  className,
}: {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  tone?: StatTone;
  className?: string;
}) {
  const t = TONE_CLASS[tone];
  return (
    <Card
      className={cn(
        "group overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        t.card,
        className
      )}
    >
      <CardContent className="flex items-start gap-2.5 p-3 sm:gap-3 sm:p-4">
        {icon && (
          <div
            className={cn(
              "rounded-xl p-2 shadow-sm ring-1 transition-transform duration-200 group-hover:scale-105 sm:p-2.5",
              t.icon,
              t.iconRing,
              t.iconText
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 sm:text-sm">{title}</p>
          <p className="break-words text-xl font-semibold leading-tight text-slate-800 sm:text-2xl">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-[11px] leading-tight text-slate-500 sm:text-xs">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
