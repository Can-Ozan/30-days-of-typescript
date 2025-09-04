import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const AIFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Akıllı Portföy Analizi",
      description: "AI algoritmalarımız portföyünüzü analiz eder ve risk-getiri dengesini optimize eder.",
      color: "gradient-primary",
      stats: "7/24 Analiz"
    },
    {
      icon: PieChart,
      title: "Otomatik Bütçe Planlama",
      description: "Harcama alışkanlıklarınızı öğrenir ve kişiselleştirilmiş bütçe önerileri sunar.",
      color: "gradient-success",
      stats: "%95 Doğruluk"
    },
    {
      icon: TrendingUp,
      title: "Yatırım Önerileri",
      description: "Piyasa trendlerini analiz ederek size özel yatırım fırsatları önerir.",
      color: "gradient-secondary",
      stats: "+18% Ortalama Getiri"
    },
    {
      icon: Shield,
      title: "Risk Yönetimi",
      description: "Portföyünüzdeki riskleri tespit eder ve koruma stratejileri geliştirir.",
      color: "gradient-primary",
      stats: "Maksimum Güvenlik"
    },
    {
      icon: Target,
      title: "Hedef Takibi",
      description: "Finansal hedeflerinizi belirler ve bunlara ulaşmanız için yol haritası çizer.",
      color: "gradient-success",
      stats: "Kişisel Hedefler"
    },
    {
      icon: AlertTriangle,
      title: "Erken Uyarı Sistemi",
      description: "Piyasadaki değişiklikleri önceden tespit eder ve sizi bilgilendirir.",
      color: "gradient-secondary",
      stats: "Anlık Bildirimler"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">AI Özellikleri</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Yapay Zeka ile
            <span className="text-primary block">Finansal Başarı</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Gelişmiş AI algoritmalarımız 7/24 piyasaları izler, 
            verilerinizi analiz eder ve size özel stratejiler geliştirir.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-primary transition-smooth hover:card-hover border-0 bg-card/50 backdrop-blur-sm group cursor-pointer"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth shadow-glow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {feature.stats}
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-smooth gap-2">
                <span>Daha Fazla Bilgi</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 border border-border/50">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-success" />
              <span className="text-success font-semibold">5 Dakikada Kurulum</span>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground mb-4">
              AI Danışmanınızla Tanışın
            </h3>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hesabınızı oluşturun ve AI destekli finansal analizi hemen deneyimleyin. 
              İlk rapor ücretsiz!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trial">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  <Smartphone className="w-5 h-5" />
                  Hemen Başla
                </Button>
              </Link>
              <Link to="/examples">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Örnekleri İncele
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;