import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Crown, 
  Check, 
  Zap, 
  Star, 
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Brain,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Pro = () => {
  const features = [
    {
      icon: Brain,
      title: "Gelişmiş AI Analizi",
      description: "Derin öğrenme algoritmaları ile 10 kat daha detaylı portföy analizi"
    },
    {
      icon: TrendingUp,
      title: "Özel Yatırım Stratejileri",
      description: "Kişisel risk profilinize göre özelleştirilmiş yatırım stratejileri"
    },
    {
      icon: BarChart3,
      title: "Gerçek Zamanlı Piyasa Analizi",
      description: "Anlık piyasa verilerini takip eden AI destekli uyarı sistemi"
    },
    {
      icon: Shield,
      title: "Kurumsal Güvenlik",
      description: "Banka seviyesi güvenlik ve veri şifreleme protokolleri"
    },
    {
      icon: Target,
      title: "Hedef Optimizasyonu",
      description: "AI destekli finansal hedef belirleme ve otomatik optimizasyon"
    },
    {
      icon: Clock,
      title: "24/7 Premium Destek",
      description: "Finansal uzmanlardan anlık destek ve özel danışmanlık hizmeti"
    }
  ];

  const plans = [
    {
      name: "Temel",
      price: "Ücretsiz",
      period: "",
      features: [
        "Temel portföy analizi",
        "3 yatırım önerisi/ay",
        "Basit dashboard",
        "Email destek"
      ],
      button: "Mevcut Plan",
      variant: "outline" as const
    },
    {
      name: "Pro",
      price: "₺299",
      period: "/ay",
      popular: true,
      features: [
        "Gelişmiş AI analizi",
        "Sınırsız yatırım önerisi",
        "Gerçek zamanlı uyarılar",
        "Özel strateji geliştirme",
        "24/7 premium destek",
        "Mobil uygulama",
        "Risk yönetimi araçları",
        "Vergi optimizasyonu"
      ],
      button: "Pro'ya Geç",
      variant: "hero" as const
    },
    {
      name: "Kurumsal",
      price: "Özel Fiyat",
      period: "",
      features: [
        "Kurumsal AI çözümleri",
        "API entegrasyonu",
        "Çoklu hesap yönetimi",
        "Özel raporlama",
        "Dedicated hesap yöneticisi",
        "SLA garantisi"
      ],
      button: "İletişime Geç",
      variant: "secondary" as const
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-premium/10 rounded-full px-4 py-2 mb-6">
              <Crown className="w-5 h-5 text-premium" />
              <span className="text-premium font-medium">Pro Sürüm</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Finansal Zeka
              <span className="text-premium block">Pro Seviyede</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Profesyonel yatırımcılar için tasarlanmış gelişmiş AI özelliklerini keşfedin. 
              Portföyünüzü kurumsal seviyede optimize edin.
            </p>
            
            <Link to="/payment">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                14 Gün Ücretsiz Dene
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Pro Özellikler
            </h2>
            <p className="text-xl text-muted-foreground">
              Finansal başarınızı bir üst seviyeye taşıyacak gelişmiş araçlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-primary transition-smooth border-0 bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 gradient-premium rounded-2xl flex items-center justify-center mb-6 shadow-glow">
                  <feature.icon className="w-8 h-8 text-premium-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Size Uygun Planı Seçin
            </h2>
            <p className="text-xl text-muted-foreground">
              İhtiyaçlarınıza göre esnek fiyatlandırma seçenekleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 relative border-0 bg-card/50 backdrop-blur-sm ${
                  plan.popular 
                    ? 'ring-2 ring-premium shadow-glow scale-105' 
                    : 'hover:shadow-primary'
                } transition-smooth`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="gradient-premium text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      En Popüler
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={plan.name === "Pro" ? "/payment" : plan.name === "Kurumsal" ? "/contact" : "#"}>
                  <Button variant={plan.variant} className="w-full">
                    {plan.button}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Profesyonel Finansal Yönetim
              <span className="text-premium block">Başlasın</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Pro sürümle finansal hedeflerinize daha hızlı ulaşın. 
              14 gün ücretsiz deneme, kredi kartı gerekmez.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/payment">
                <Button variant="premium" size="lg" className="text-lg px-8 py-4">
                  <Zap className="w-5 h-5" />
                  Pro'yu Dene
                </Button>
              </Link>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                Demo Rezervasyonu
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pro;