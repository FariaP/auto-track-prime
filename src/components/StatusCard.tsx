import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
  variant?: "waiting" | "progress" | "completed";
  className?: string;
}

export function StatusCard({ 
  title, 
  count, 
  description, 
  icon: Icon, 
  variant = "waiting",
  className 
}: StatusCardProps) {
  const variantStyles = {
    waiting: "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
    progress: "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10", 
    completed: "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
  };

  const iconStyles = {
    waiting: "text-warning",
    progress: "text-primary",
    completed: "text-success"
  };

  return (
    <Card className={cn(
      "shadow-card hover:shadow-elevated transition-all duration-200 border-2",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", iconStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}