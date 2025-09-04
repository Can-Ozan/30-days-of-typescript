import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle2,
  Bot,
  Phone
} from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const steps = [
    {
      number: "1",
      title: "Hesap Oluştur",
      description: "Temel bilgilerinizi girin"
    },
    {
      number: "2",
      title: "Email Doğrula",
      description: "Email adresinizi onaylayın"
    },
    {
      number: "3",
      title: "Profil Tamamla",
      description: "Finansal profilinizi oluşturun"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16 min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Side - Steps & Benefits */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left mb-8">
                  <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
                    <Bot className="w-5 h-5 text-secondary" />
                    <span className="text-secondary font-medium">Ücretsiz Hesap Oluştur</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                    AI Destekli Finansal
                    <span className="text-secondary block">Yolculuğa Başlayın</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    30 saniyede hesap oluşturun ve finansal hedeflerinize 
                    ulaşmanın en akıllı yolunu keşfedin.
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-6 mb-8">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                        index === 0 
                          ? 'gradient-secondary text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-success" />
                    <span className="font-semibold text-foreground">30 Gün Ücretsiz</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Kredi kartı gerekmez
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      İstediğiniz zaman iptal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Tüm özelliklere erişim
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="order-1 lg:order-2">
              <Card className="p-8 lg:p-10 border-0 bg-card/80 backdrop-blur-md shadow-primary max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Hesap Oluştur
                  </h2>
                  <p className="text-muted-foreground">
                    Ücretsiz hesabınızı oluşturun
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ad
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          placeholder="Adınız"
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Soyad
                      </label>
                      <Input 
                        placeholder="Soyadınız"
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        type="email"
                        placeholder="email@örnek.com"
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        placeholder="+90 5xx xxx xx xx"
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Güçlü bir şifre oluşturun"
                        className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Şifre Tekrar
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Şifrenizi tekrar girin"
                        className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor="terms" 
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        <a href="#" className="text-primary hover:text-primary/80">
                          Kullanım Şartları
                        </a>{" "}
                        ve{" "}
                        <a href="#" className="text-primary hover:text-primary/80">
                          Gizlilik Politikası
                        </a>'nı okudum ve kabul ediyorum.
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="newsletter"
                        checked={subscribeNewsletter}
                        onCheckedChange={(checked) => setSubscribeNewsletter(checked === true)}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor="newsletter" 
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        Finansal ipuçları ve yeni özellikler hakkında email almak istiyorum.
                      </label>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full text-lg py-3"
                    disabled={!agreeTerms}
                  >
                    Hesap Oluştur
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">
                        veya
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" size="lg" className="w-full text-lg py-3">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google ile Kayıt Ol
                  </Button>
                </form>

                <div className="text-center mt-8 pt-6 border-t border-border/50">
                  <p className="text-muted-foreground">
                    Zaten hesabınız var mı?{" "}
                    <a 
                      href="/login" 
                      className="text-primary hover:text-primary/80 font-medium transition-smooth"
                    >
                      Giriş yapın
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;