import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, History, Calendar, FileText, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryEntry {
  id: string;
  date: string;
  services: string[];
  status: "completed" | "cancelled";
  total: number;
  observations?: string;
}

export default function VehicleHistory() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "cancelled">("all");

  // Mock history data
  const historyData: HistoryEntry[] = [
    {
      id: "1",
      date: "2024-12-15",
      services: ["Troca de óleo", "Filtro de ar", "Revisão geral"],
      status: "completed",
      total: 350.00,
      observations: "Serviço realizado conforme planejado. Cliente satisfeito."
    },
    {
      id: "2", 
      date: "2024-08-22",
      services: ["Alinhamento", "Balanceamento", "Calibragem"],
      status: "completed",
      total: 120.00
    },
    {
      id: "3",
      date: "2024-05-10",
      services: ["Pastilhas de freio", "Discos de freio", "Fluido de freio"],
      status: "completed",
      total: 480.00,
      observations: "Freios estavam muito desgastados. Recomendada verificação a cada 6 meses."
    },
    {
      id: "4",
      date: "2024-02-18",
      services: ["Troca de pneus", "Alinhamento"],
      status: "cancelled", 
      total: 0,
      observations: "Cliente cancelou o serviço antes da execução."
    },
    {
      id: "5",
      date: "2023-11-30",
      services: ["Revisão dos 20.000 km", "Troca de correia dentada"],
      status: "completed",
      total: 650.00
    }
  ];

  const filteredHistory = historyData.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.services.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalSpent = historyData
    .filter(entry => entry.status === "completed")
    .reduce((sum, entry) => sum + entry.total, 0);

  const completedServices = historyData.filter(entry => entry.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-6">
            <Button variant="outline" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Histórico do Veículo</h1>
              <p className="text-muted-foreground">Consulte todo o histórico de serviços realizados</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Vehicle Selection and Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Filtros e Busca</CardTitle>
              <CardDescription>Selecione o veículo e aplique filtros para consultar o histórico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Veículo</label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC-1234">ABC-1234 - Honda Civic 2020</SelectItem>
                      <SelectItem value="XYZ-5678">XYZ-5678 - Toyota Corolla 2019</SelectItem>
                      <SelectItem value="DEF-9012">DEF-9012 - Ford Focus 2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Buscar Serviços</label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por serviço..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={statusFilter} 
                    onValueChange={(value: "all" | "completed" | "cancelled") => setStatusFilter(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="completed">Concluídos</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Total de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{completedServices}</div>
                <p className="text-xs text-muted-foreground">Serviços concluídos</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Valor Total Gasto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">R$ {totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Em serviços realizados</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Último Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {historyData[0]?.date ? new Date(historyData[0].date).toLocaleDateString('pt-BR') : "-"}
                </div>
                <p className="text-xs text-muted-foreground">Data do último atendimento</p>
              </CardContent>
            </Card>
          </div>

          {/* History Timeline */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Histórico de Serviços
              </CardTitle>
              <CardDescription>
                {filteredHistory.length} {filteredHistory.length === 1 ? 'registro encontrado' : 'registros encontrados'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredHistory.length > 0 ? (
                <div className="space-y-6">
                  {filteredHistory.map((entry, index) => (
                    <div key={entry.id} className="relative">
                      {/* Timeline line */}
                      {index < filteredHistory.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border"></div>
                      )}
                      
                      <div className="flex gap-4">
                        {/* Timeline dot */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          entry.status === "completed" 
                            ? "bg-success/10 text-success" 
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {entry.status === "completed" ? (
                            <Calendar className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="bg-card border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {new Date(entry.date).toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {entry.services.length} {entry.services.length === 1 ? 'serviço' : 'serviços'} realizados
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={entry.status === "completed" ? "success" : "destructive"}
                                  className="mb-2"
                                >
                                  {entry.status === "completed" ? "Concluído" : "Cancelado"}
                                </Badge>
                                {entry.status === "completed" && (
                                  <div className="text-lg font-semibold text-foreground">
                                    R$ {entry.total.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-foreground">Serviços:</h4>
                              <div className="flex flex-wrap gap-2">
                                {entry.services.map((service, serviceIndex) => (
                                  <Badge key={serviceIndex} variant="outline" className="text-xs">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {entry.observations && (
                              <div className="mt-3 pt-3 border-t">
                                <h4 className="text-sm font-medium text-foreground mb-1">Observações:</h4>
                                <p className="text-sm text-muted-foreground">{entry.observations}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Nenhum registro encontrado</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Tente ajustar os filtros de busca" 
                      : "Selecione um veículo para visualizar o histórico"
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}