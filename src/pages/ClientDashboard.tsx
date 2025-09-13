import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Calendar, Clock, FileText, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const navigate = useNavigate();

  // Mock vehicle data
  const vehicleData = {
    plate: "ABC-1234",
    model: "Honda Civic 2020",
    year: 2020,
    mileage: 45000,
    status: "progress" as const,
    estimatedDate: "15/01/2025",
    lastUpdate: "14/01/2025 14:30"
  };

  const statusConfig = {
    waiting: { 
      label: "Aguardando Início", 
      variant: "warning" as const,
      description: "Seu veículo está na fila de serviços"
    },
    progress: { 
      label: "Em Procedimento", 
      variant: "primary" as const,
      description: "Nossos técnicos estão trabalhando no seu veículo"
    },
    completed: { 
      label: "Serviço Concluído", 
      variant: "success" as const,
      description: "Seu veículo está pronto para retirada"
    }
  };

  const services = [
    { name: "Troca de óleo", completed: true, required: true },
    { name: "Filtro de ar", completed: true, required: true },
    { name: "Revisão de freios", completed: false, required: true },
    { name: "Alinhamento", completed: false, required: false },
  ];

  const budget = {
    services: [
      { name: "Troca de óleo + filtro", price: 120, required: true },
      { name: "Pastilhas de freio", price: 280, required: true },
      { name: "Alinhamento", price: 80, required: false },
    ],
    total: 480
  };

  const currentStatus = statusConfig[vehicleData.status];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AutoTech</h1>
                <p className="text-sm text-muted-foreground">Área do Cliente</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle Info & Status */}
        <section className="mb-8">
          <Card className="shadow-elevated border-2 border-primary/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Car className="h-5 w-5 text-primary" />
                    {vehicleData.plate}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    {vehicleData.model} • {vehicleData.mileage.toLocaleString()} km
                  </CardDescription>
                </div>
                <Badge variant={currentStatus.variant} className="text-sm px-3 py-1">
                  {currentStatus.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{currentStatus.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Previsão de entrega: <strong>{vehicleData.estimatedDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Última atualização: {vehicleData.lastUpdate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Progress */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Progresso dos Serviços</h2>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Lista de Serviços</CardTitle>
              <CardDescription>Acompanhe o andamento de cada serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        service.completed 
                          ? 'bg-success border-success' 
                          : 'border-muted-foreground'
                      }`}>
                        {service.completed && (
                          <div className="w-full h-full rounded-full bg-success flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-success-foreground rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <span className={service.completed ? 'line-through text-muted-foreground' : ''}>
                        {service.name}
                      </span>
                    </div>
                    <Badge variant={service.required ? "primary" : "secondary"} className="text-xs">
                      {service.required ? "Obrigatório" : "Opcional"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Budget */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Orçamento Detalhado</h2>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Orçamento
              </CardTitle>
              <CardDescription>Valores dos serviços e peças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budget.services.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <Badge variant={item.required ? "primary" : "secondary"} className="text-xs">
                        {item.required ? "Obrigatório" : "Opcional"}
                      </Badge>
                    </div>
                    <span className="font-medium">R$ {item.price.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">R$ {budget.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* History Link */}
        <section>
          <Card className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico de Serviços
              </CardTitle>
              <CardDescription>
                Consulte todos os serviços realizados anteriormente neste veículo
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}