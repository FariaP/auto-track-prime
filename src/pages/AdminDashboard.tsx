import { StatusCard } from "@/components/StatusCard";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Wrench, CheckCircle, Plus, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Mock data
  const statusData = [
    {
      title: "Aguardando",
      count: 8,
      description: "Veículos na fila",
      icon: Clock,
      variant: "waiting" as const
    },
    {
      title: "Em Procedimento", 
      count: 5,
      description: "Serviços em andamento",
      icon: Wrench,
      variant: "progress" as const
    },
    {
      title: "Concluído",
      count: 12,
      description: "Finalizados hoje",
      icon: CheckCircle,
      variant: "completed" as const
    }
  ];

  const vehiclesInProgress = [
    {
      plate: "ABC-1234",
      model: "Honda Civic 2020",
      year: 2020,
      mileage: 45000,
      status: "progress" as const,
      estimatedDate: "15/01/2025"
    },
    {
      plate: "XYZ-5678", 
      model: "Toyota Corolla 2019",
      year: 2019,
      mileage: 67000,
      status: "waiting" as const,
      estimatedDate: "16/01/2025"
    },
    {
      plate: "DEF-9012",
      model: "Ford Focus 2021", 
      year: 2021,
      mileage: 23000,
      status: "completed" as const,
      estimatedDate: "14/01/2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AutoTech</h1>
              <p className="text-muted-foreground">Sistema de Gestão para Oficinas</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <BarChart3 className="h-5 w-5" />
                Relatórios
              </Button>
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => navigate("/vehicle-registration")}
              >
                <Plus className="h-5 w-5" />
                Novo Veículo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Resumo do Dia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusData.map((status, index) => (
              <StatusCard
                key={index}
                title={status.title}
                count={status.count}
                description={status.description}
                icon={status.icon}
                variant={status.variant}
              />
            ))}
          </div>
        </section>

        {/* Vehicles Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Veículos em Andamento</h2>
            <Button variant="outline">
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiclesInProgress.map((vehicle, index) => (
              <VehicleCard
                key={index}
                plate={vehicle.plate}
                model={vehicle.model}
                year={vehicle.year}
                mileage={vehicle.mileage}
                status={vehicle.status}
                estimatedDate={vehicle.estimatedDate}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/vehicle-registration")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Cadastrar Veículo</CardTitle>
                <CardDescription>Adicionar novo veículo ao sistema</CardDescription>
              </CardHeader>
            </Card>
            
            <Card 
              className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/budget-creation")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Criar Orçamento</CardTitle>
                <CardDescription>Gerar orçamento para cliente</CardDescription>
              </CardHeader>
            </Card>
            
            <Card 
              className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/service-checklist")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Checklist</CardTitle>
                <CardDescription>Atualizar status dos serviços</CardDescription>
              </CardHeader>
            </Card>
            
            <Card 
              className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/vehicle-history")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Histórico</CardTitle>
                <CardDescription>Consultar histórico de veículos</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}