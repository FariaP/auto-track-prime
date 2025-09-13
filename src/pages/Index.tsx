import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, Users, BarChart3, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-foreground/10 p-4 rounded-full">
                <Car className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              AutoTech
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Sistema profissional de gestão para oficinas mecânicas. 
              Controle completo de serviços, orçamentos e relacionamento com clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                variant="accent"
                onClick={() => navigate("/admin")}
              >
                <Wrench className="h-5 w-5" />
                Área Administrativa
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate("/client-login")}
              >
                <Users className="h-5 w-5" />
                Área do Cliente
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que sua oficina precisa para um atendimento profissional e eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dashboard Inteligente</CardTitle>
                <CardDescription>
                  Acompanhe todos os veículos em tempo real com indicadores visuais de status
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <Car className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Gestão de Veículos</CardTitle>
                <CardDescription>
                  Cadastro completo com histórico de serviços e manutenções realizadas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-success/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Área do Cliente</CardTitle>
                <CardDescription>
                  Clientes acompanham o progresso do serviço com transparência total
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-warning/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Orçamentos Detalhados</CardTitle>
                <CardDescription>
                  Gere orçamentos profissionais com separação de itens obrigatórios e opcionais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Checklist de Serviços</CardTitle>
                <CardDescription>
                  Controle cada etapa do processo com checklists organizados por prioridade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Histórico Completo</CardTitle>
                <CardDescription>
                  Mantenha registro de todos os serviços com datas, valores e observações
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card py-20 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Escolha a área apropriada para acessar o sistema
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="default"
              onClick={() => navigate("/admin")}
            >
              <Wrench className="h-5 w-5" />
              Área Administrativa
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              onClick={() => navigate("/client-login")}
            >
              <Users className="h-5 w-5" />
              Área do Cliente
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
