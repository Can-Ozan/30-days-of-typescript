import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Target,
  ArrowUpRight,
  Clock,
  Star,
  CheckCircle2
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Examples = () => {
  const examples = [
    {
      title: "Portföy Optimizasyonu",
      description: "AI analizi ile %23 getiri artışı sağlanan gerçek portföy örneği",
      icon: PieChart,
      stats: "%23 Getiri Artışı",
      duration: "6 aylık süreç",
      features: [
        "Risk analizi ve diversifikasyon",
        "Sektör ağırlık optimizasyonu", 
        "Otomatik rebalancing",
        "Vergi optimizasyonu"
      ],
      result: "₺500.000 portföy → ₺615.000 (6 ay)"
    },
    {
      title: "Emeklilik Planlaması",
      description: "35 yaşındaki bir profesyonel için AI destekli emeklilik stratejisi",
      icon: Target,
      stats: "30 Yıl Plan",
      duration: "Sürekli optimizasyon",
      features: [
        "Yaş bazlı risk ayarlaması",
        "Enflasyon koruması",
        "Bireysel emeklilik optimizasyonu",
        "Hedef takibi"
      ],
      result: "Aylık ₺5.000 → Emeklilik ₺8.2M"
    },
    {
      title: "Acil Durum Fonu",
      description: "AI önerisiyle oluşturulan acil durum fonu ve bütçe planlaması",
      icon: BarChart3,
      stats: "6 Aylık Fon",
      duration: "12 ay sürede",
      features: [
        "Gelir-gider analizi",
        "Otomatik tasarruf planı",
        "Likidite optimizasyonu",
        "Harcama kategorileri"
      ],
      result: "₺0 → ₺180.000 acil fon"
    },
    {
      title: "Yatırım Performansı",
      description: "AI algoritması ile seçilen hisse senetleri performans analizi",
      icon: TrendingUp,
      stats: "+34% Yıllık",
      duration: "12 aylık dönem",
      features: [
        "Teknik analiz entegrasyonu",
        "Makroekonomik faktörler",
        "Sektörel momentum",
        "Risk/getiri optimizasyonu"
      ],
      result: "BIST100'ü %15 geçen performans"
    }
  ];

  const testimonials = [
    {
      name: "Ahmet Kaya",
      role: "Yazılım Mühendisi",
      comment: "AI destekli analizler sayesinde portföyümü optimize ettim. 6 ayda %23 getiri elde ettim.",
      rating: 5
    },
    {
      name: "Elif Demir",
      role: "Pazarlama Müdürü", 
      comment: "Emeklilik planımı AI ile düzenledim. Artık hedeflerime ne kadar yakın olduğumu takip edebiliyorum.",
      rating: 5
    },
    {
      name: "Mehmet Öz",
      role: "İş Geliştirme",
      comment: "Acil durum fonu oluşturmak hiç bu kadar kolay olmamıştı. AI önerileri çok pratik.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-success/10 rounded-full px-4 py-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-success font-medium">Başarı Örnekleri</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Gerçek Başarı
              <span className="text-primary block">Hikayeleri</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AI destekli finansal danışmanlık ile elde edilen gerçek sonuçları inceleyin. 
              Siz de benzer başarıları elde edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {examples.map((example, index) => (
              <Card key={index} className="p-8 hover:shadow-primary transition-smooth border-0 bg-card/50 backdrop-blur-sm group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                    <example.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{example.stats}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {example.duration}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {example.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {example.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {example.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-success/10 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <span className="text-success font-semibold">Sonuç:</span>
                    <p className="text-foreground font-medium">{example.result}</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  Detayları İncele
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Kullanıcı Deneyimleri
            </h2>
            <p className="text-xl text-muted-foreground">
              AI danışmanımızı kullanan müşterilerimizin gerçek yorumları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.comment}"
                </p>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
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
              Siz de Başarı Hikayenizi
              <span className="text-premium block">Yazın</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              AI destekli finansal danışmanlık ile hedeflerinize ulaşın. 
              İlk analizi ücretsiz deneyin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" className="text-lg px-8 py-4">
                Ücretsiz Başlat
                <ArrowUpRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                Demo İzle
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Examples;