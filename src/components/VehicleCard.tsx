import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  plate: string;
  model: string;
  year: number;
  mileage: number;
  status: "waiting" | "progress" | "completed";
  estimatedDate?: string;
  className?: string;
}

export function VehicleCard({ 
  plate, 
  model, 
  year, 
  mileage, 
  status, 
  estimatedDate,
  className 
}: VehicleCardProps) {
  const statusConfig = {
    waiting: { 
      label: "Aguardando", 
      variant: "warning" as const,
      bgClass: "bg-gradient-to-r from-warning/10 to-warning/5"
    },
    progress: { 
      label: "Em Procedimento", 
      variant: "primary" as const,
      bgClass: "bg-gradient-to-r from-primary/10 to-primary/5"
    },
    completed: { 
      label: "Concluído", 
      variant: "success" as const,
      bgClass: "bg-gradient-to-r from-success/10 to-success/5"
    }
  };

  const config = statusConfig[status];

  return (
    <Card className={cn(
      "shadow-card hover:shadow-elevated transition-all duration-200 overflow-hidden",
      config.bgClass,
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <span className="font-semibold">{plate}</span>
          </CardTitle>
          <Badge variant={config.variant} className="font-medium">
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-medium text-foreground">{model}</h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{mileage.toLocaleString()} km</span>
        </div>
        
        {estimatedDate && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Previsão: {estimatedDate}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}