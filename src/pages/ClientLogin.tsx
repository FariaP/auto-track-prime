import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Shield, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const [cpf, setCpf] = useState("");
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to client dashboard
    navigate("/client-dashboard");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPlate = (value: string) => {
    const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return alphanumeric.replace(/([A-Z]{3})(\d{4})/, "$1-$2");
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")}
            >
              Área Administrativa
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Card */}
          <Card className="shadow-elevated border-2 border-primary/10">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto bg-gradient-primary p-4 rounded-full w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Bem-vindo</CardTitle>
                <CardDescription className="text-base mt-2">
                  Acompanhe o status do seu veículo de forma segura e transparente
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Login Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Acesso do Cliente</CardTitle>
              <CardDescription>
                Informe seus dados para acessar as informações do seu veículo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    maxLength={14}
                    required
                    className="shadow-card"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plate">Placa do Veículo</Label>
                  <Input
                    id="plate"
                    type="text"
                    placeholder="ABC-1234"
                    value={plate}
                    onChange={(e) => setPlate(formatPlate(e.target.value))}
                    maxLength={8}
                    required
                    className="shadow-card"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  variant="accent"
                >
                  Entrar
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Wrench className="h-4 w-4" />
                  <span>Seus dados são protegidos e utilizados apenas para identificação do veículo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="bg-primary/10 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Seguro</h3>
              <p className="text-xs text-muted-foreground">Dados protegidos</p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary/10 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Transparente</h3>
              <p className="text-xs text-muted-foreground">Status em tempo real</p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary/10 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Profissional</h3>
              <p className="text-xs text-muted-foreground">Serviço de qualidade</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}