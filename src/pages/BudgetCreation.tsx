import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calculator, Plus, Trash2, FileText, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface BudgetItem {
  id: string;
  description: string;
  price: number;
  required: boolean;
}

export default function BudgetCreation() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [estimatedDate, setEstimatedDate] = useState("");
  const [observations, setObservations] = useState("");
  
  const [items, setItems] = useState<BudgetItem[]>([
    { id: "1", description: "Troca de óleo", price: 80, required: true },
    { id: "2", description: "Filtro de ar", price: 45, required: true }
  ]);

  const [newItem, setNewItem] = useState({
    description: "",
    price: "",
    required: true
  });

  const addItem = () => {
    if (newItem.description && newItem.price) {
      const item: BudgetItem = {
        id: Date.now().toString(),
        description: newItem.description,
        price: parseFloat(newItem.price),
        required: newItem.required
      };
      setItems([...items, item]);
      setNewItem({ description: "", price: "", required: true });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalRequired = items
    .filter(item => item.required)
    .reduce((sum, item) => sum + item.price, 0);

  const totalOptional = items
    .filter(item => !item.required)
    .reduce((sum, item) => sum + item.price, 0);

  const totalGeneral = totalRequired + totalOptional;

  const handleGenerateBudget = () => {
    if (!selectedVehicle) {
      toast({
        title: "Erro",
        description: "Selecione um veículo para gerar o orçamento.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Orçamento gerado com sucesso!",
      description: "O orçamento foi criado e está disponível para o cliente.",
      variant: "default"
    });

    navigate("/admin");
  };

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
              <h1 className="text-2xl font-bold text-foreground">Criar Orçamento</h1>
              <p className="text-muted-foreground">Gerar orçamento detalhado para cliente</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Seleção do Veículo</CardTitle>
                <CardDescription>Escolha o veículo para o orçamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Veículo</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC-1234">ABC-1234 - Honda Civic 2020 - João Silva</SelectItem>
                      <SelectItem value="XYZ-5678">XYZ-5678 - Toyota Corolla 2019 - Maria Santos</SelectItem>
                      <SelectItem value="DEF-9012">DEF-9012 - Ford Focus 2021 - Carlos Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDate">Data Estimada de Entrega</Label>
                  <Input
                    id="estimatedDate"
                    type="date"
                    value={estimatedDate}
                    onChange={(e) => setEstimatedDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add New Item */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Adicionar Item</CardTitle>
                <CardDescription>Adicione serviços e peças ao orçamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      placeholder="Ex: Troca de pastilha de freio"
                      value={newItem.description}
                      onChange={(e) => setNewItem({
                        ...newItem,
                        description: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Valor (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={newItem.price}
                      onChange={(e) => setNewItem({
                        ...newItem,
                        price: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemType">Tipo</Label>
                    <Select 
                      value={newItem.required ? "required" : "optional"}
                      onValueChange={(value) => setNewItem({
                        ...newItem,
                        required: value === "required"
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="required">Obrigatório</SelectItem>
                        <SelectItem value="optional">Opcional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={addItem} 
                  className="mt-4" 
                  variant="accent"
                  disabled={!newItem.description || !newItem.price}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Item
                </Button>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Itens do Orçamento</CardTitle>
                <CardDescription>Lista de serviços e peças</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant={item.required ? "primary" : "secondary"}>
                            {item.required ? "Obrigatório" : "Opcional"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="w-32">
                        <Input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                          className="text-right"
                        />
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum item adicionado ao orçamento
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Observations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Observações</CardTitle>
                <CardDescription>Informações adicionais sobre o orçamento</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Adicione observações sobre o orçamento, prazos ou condições especiais..."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            <Card className="shadow-elevated border-2 border-primary/10 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Resumo do Orçamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Itens obrigatórios:</span>
                    <span className="font-medium">R$ {totalRequired.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Itens opcionais:</span>
                    <span className="font-medium">R$ {totalOptional.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Geral:</span>
                    <span className="text-primary">R$ {totalGeneral.toFixed(2)}</span>
                  </div>
                </div>

                {estimatedDate && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Entrega: {new Date(estimatedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  <Button 
                    onClick={handleGenerateBudget}
                    className="w-full" 
                    variant="accent"
                    size="lg"
                  >
                    <FileText className="h-4 w-4" />
                    Gerar Orçamento
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/admin")}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}