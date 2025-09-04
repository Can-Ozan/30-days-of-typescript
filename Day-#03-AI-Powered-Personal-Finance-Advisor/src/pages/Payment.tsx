import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Crown,
  ArrowLeft,
  Shield
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ödeme işlemi burada yapılacak
    console.log("Ödeme bilgileri:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <Link to="/pro" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth mb-6">
                <ArrowLeft className="w-4 h-4" />
                Pro Sayfasına Dön
              </Link>
              
              <div className="inline-flex items-center gap-2 bg-premium/10 rounded-full px-4 py-2 mb-6">
                <Crown className="w-5 h-5 text-premium" />
                <span className="text-premium font-medium">Pro Ödeme</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Pro Sürüme
                <span className="text-premium block">Geçiş Yapın</span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Güvenli ödeme ile hemen profesyonel özelliklere erişin
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sipariş Özeti */}
              <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Crown className="w-6 h-6 text-premium" />
                  Sipariş Özeti
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pro Aylık Plan</span>
                    <span className="font-semibold text-foreground">₺299</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">KDV (%20)</span>
                    <span className="font-semibold text-foreground">₺59.80</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">Toplam</span>
                      <span className="text-2xl font-bold text-premium">₺358.80</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>14 gün ücretsiz deneme</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>İstediğiniz zaman iptal edebilirsiniz</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>7/24 premium destek</span>
                  </div>
                </div>
              </Card>

              {/* Ödeme Formu */}
              <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Ödeme Bilgileri
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Kart Üzerindeki İsim</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ahmet Yılmaz"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Kart Numarası</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Son Kullanma</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="AA/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Ödeme bilgileriniz SSL ile şifrelenir ve güvenlidir</span>
                  </div>
                  
                  <Button type="submit" variant="premium" size="lg" className="w-full text-lg">
                    <Lock className="w-5 h-5" />
                    Güvenli Ödemeyi Tamamla
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;