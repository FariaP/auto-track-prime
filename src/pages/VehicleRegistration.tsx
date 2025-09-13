import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Car, User, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function VehicleRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewClient, setIsNewClient] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    plate: "",
    model: "",
    year: "",
    mileage: "",
    clientId: ""
  });

  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    cpf: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Veículo cadastrado com sucesso!",
      description: `${vehicleData.plate} foi adicionado ao sistema.`,
      variant: "default"
    });
    
    navigate("/admin");
  };

  const formatPlate = (value: string) => {
    const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return alphanumeric.replace(/([A-Z]{3})(\d{4})/, "$1-$2");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
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
              <h1 className="text-2xl font-bold text-foreground">Cadastro de Veículo</h1>
              <p className="text-muted-foreground">Adicionar novo veículo ao sistema</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vehicle Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Dados do Veículo
              </CardTitle>
              <CardDescription>
                Informações básicas do veículo a ser cadastrado
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="plate">Placa *</Label>
                <Input
                  id="plate"
                  placeholder="ABC-1234"
                  value={vehicleData.plate}
                  onChange={(e) => setVehicleData({
                    ...vehicleData,
                    plate: formatPlate(e.target.value)
                  })}
                  maxLength={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modelo *</Label>
                <Input
                  id="model"
                  placeholder="Honda Civic 2020"
                  value={vehicleData.model}
                  onChange={(e) => setVehicleData({
                    ...vehicleData,
                    model: e.target.value
                  })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Ano *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2020"
                  min="1900"
                  max="2025"
                  value={vehicleData.year}
                  onChange={(e) => setVehicleData({
                    ...vehicleData,
                    year: e.target.value
                  })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Quilometragem *</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="45000"
                  value={vehicleData.mileage}
                  onChange={(e) => setVehicleData({
                    ...vehicleData,
                    mileage: e.target.value
                  })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Client Selection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Cliente
              </CardTitle>
              <CardDescription>
                Associe o veículo a um cliente existente ou cadastre um novo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Cliente</Label>
                <Select 
                  value={isNewClient ? "new" : "existing"} 
                  onValueChange={(value) => setIsNewClient(value === "new")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">Cliente Existente</SelectItem>
                    <SelectItem value="new">Novo Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isNewClient ? (
                <div className="space-y-2">
                  <Label htmlFor="clientId">Cliente Existente</Label>
                  <Select 
                    value={vehicleData.clientId} 
                    onValueChange={(value) => setVehicleData({
                      ...vehicleData,
                      clientId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">João Silva - 123.456.789-00</SelectItem>
                      <SelectItem value="2">Maria Santos - 987.654.321-00</SelectItem>
                      <SelectItem value="3">Carlos Oliveira - 456.789.123-00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome Completo *</Label>
                    <Input
                      id="clientName"
                      placeholder="João Silva"
                      value={clientData.name}
                      onChange={(e) => setClientData({
                        ...clientData,
                        name: e.target.value
                      })}
                      required={isNewClient}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientCpf">CPF *</Label>
                    <Input
                      id="clientCpf"
                      placeholder="123.456.789-00"
                      value={clientData.cpf}
                      onChange={(e) => setClientData({
                        ...clientData,
                        cpf: formatCPF(e.target.value)
                      })}
                      maxLength={14}
                      required={isNewClient}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone *</Label>
                    <Input
                      id="clientPhone"
                      placeholder="(11) 99999-9999"
                      value={clientData.phone}
                      onChange={(e) => setClientData({
                        ...clientData,
                        phone: formatPhone(e.target.value)
                      })}
                      maxLength={15}
                      required={isNewClient}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientAddress">Endereço *</Label>
                    <Textarea
                      id="clientAddress"
                      placeholder="Rua das Flores, 123 - Centro - São Paulo/SP"
                      value={clientData.address}
                      onChange={(e) => setClientData({
                        ...clientData,
                        address: e.target.value
                      })}
                      required={isNewClient}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="accent" size="lg">
              <Save className="h-4 w-4" />
              Cadastrar Veículo
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}