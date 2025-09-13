import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckSquare, Clock, AlertCircle, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ServiceItem {
  id: string;
  name: string;
  completed: boolean;
  required: boolean;
}

export default function ServiceChecklist() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [generalStatus, setGeneralStatus] = useState<"waiting" | "progress" | "completed">("waiting");
  const [observations, setObservations] = useState("");

  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", name: "Troca de óleo do motor", completed: true, required: true },
    { id: "2", name: "Substituição do filtro de ar", completed: true, required: true },
    { id: "3", name: "Revisão do sistema de freios", completed: false, required: true },
    { id: "4", name: "Verificação de pneus e calibragem", completed: false, required: true },
    { id: "5", name: "Alinhamento e balanceamento", completed: false, required: false },
    { id: "6", name: "Limpeza de bicos injetores", completed: false, required: false },
  ]);

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, completed: !service.completed } : service
    ));
  };

  const completedServices = services.filter(s => s.completed).length;
  const totalServices = services.length;
  const progressPercentage = (completedServices / totalServices) * 100;

  const requiredServices = services.filter(s => s.required);
  const completedRequired = requiredServices.filter(s => s.completed).length;
  const requiredProgress = (completedRequired / requiredServices.length) * 100;

  const statusConfig = {
    waiting: { label: "Aguardando", variant: "warning" as const, icon: Clock },
    progress: { label: "Em Procedimento", variant: "primary" as const, icon: AlertCircle },
    completed: { label: "Concluído", variant: "success" as const, icon: CheckSquare }
  };

  const handleSave = () => {
    toast({
      title: "Checklist atualizado!",
      description: "O progresso dos serviços foi salvo com sucesso.",
      variant: "default"
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-6">
            <Button variant="outline" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Checklist de Serviços</h1>
              <p className="text-muted-foreground">Acompanhe e atualize o progresso dos serviços</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Vehicle Selection & Status */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Veículo e Status Geral</CardTitle>
              <CardDescription>Selecione o veículo e defina o status geral do atendimento</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="text-sm font-medium">Status Geral</label>
                <Select 
                  value={generalStatus} 
                  onValueChange={(value: "waiting" | "progress" | "completed") => setGeneralStatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiting">Aguardando</SelectItem>
                    <SelectItem value="progress">Em Procedimento</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Progresso Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Concluído</span>
                    <span>{completedServices}/{totalServices}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage.toFixed(0)}% concluído
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Serviços Obrigatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Concluído</span>
                    <span>{completedRequired}/{requiredServices.length}</span>
                  </div>
                  <Progress value={requiredProgress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {requiredProgress.toFixed(0)}% concluído
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Status Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={statusConfig[generalStatus].variant} className="text-sm">
                    {statusConfig[generalStatus].label}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Última atualização: agora
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Checklist */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Lista de Serviços</CardTitle>
              <CardDescription>Marque os serviços conforme forem sendo concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      checked={service.completed}
                      onCheckedChange={() => toggleService(service.id)}
                      className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                    />
                    
                    <div className="flex-1">
                      <span className={`font-medium ${
                        service.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {service.name}
                      </span>
                    </div>
                    
                    <Badge 
                      variant={service.required ? "primary" : "secondary"}
                      className="text-xs"
                    >
                      {service.required ? "Obrigatório" : "Opcional"}
                    </Badge>
                    
                    {service.completed && (
                      <Badge variant="success" className="text-xs">
                        Concluído
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Observations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Observações</CardTitle>
              <CardDescription>
                Adicione observações sobre o progresso, dificuldades encontradas ou informações importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Cliente solicitou prioridade no alinhamento. Pastilha de freio apresentou desgaste maior que o esperado..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              variant="accent"
              size="lg"
            >
              <Save className="h-4 w-4" />
              Salvar Progresso
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}