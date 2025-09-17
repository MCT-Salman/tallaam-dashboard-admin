import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatsCard({
  title,
  value,
  change,
  changeType = "increase",
  icon: Icon,
  className
}) {
  return (
    <Card className={cn("card-elevated", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground arabic-nums">
              {value}
            </p>
            {change && (
              <p
                className={cn(
                  "text-sm mt-2",
                  changeType === "increase"
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {changeType === "increase" ? "+" : ""}
                {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
