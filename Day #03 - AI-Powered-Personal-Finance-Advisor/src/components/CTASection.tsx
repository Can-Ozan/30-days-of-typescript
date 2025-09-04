import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Users,
  Award,
  Zap
} from "lucide-react";

const CTASection = () => {
  const benefits = [
    "Ücretsiz 30 günlük deneme",
    "7/24 AI destekli analiz",
    "Kişiselleştirilmiş öneriler",
    "Güvenli veri işleme",
    "Mobil uygulama erişimi"
  ];

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Aktif Kullanıcı"
    },
    {
      icon: Award,
      value: "%98",
      label: "Memnuniyet Oranı"
    },
    {
      icon: Zap,
      value: "5dk",
      label: "Kurulum Süresi"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl float-animation" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Başlamaya Hazır mısınız?</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Finansal Özgürlüğünüz
              <span className="text-premium block">Sadece Bir Tık Uzağınızda</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              AI destekli kişisel finans danışmanınızla tanışın ve finansal hedeflerinize 
              ulaşmanın en akıllı yolunu keşfedin.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-center">
                <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Benefits and CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Benefits */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-6">
                Neler Dahil?
              </h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-premium" />
                    <span className="text-premium font-semibold">Sınırlı Süre</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">
                    İlk Ay Ücretsiz
                  </p>
                  <p className="text-white/80">
                    Kredi kartı gerekmez
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button variant="premium" size="lg" className="w-full text-lg py-4">
                    Hemen Başla
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="glass" size="lg" className="w-full text-lg py-4">
                    Demo Rezervasyonu
                  </Button>
                </div>
                
                <p className="text-xs text-white/60 mt-4">
                  30 gün ücretsiz deneme. İstediğiniz zaman iptal edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;