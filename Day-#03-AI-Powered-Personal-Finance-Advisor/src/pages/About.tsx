import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  Target, 
  Zap,
  Shield,
  TrendingUp,
  Brain,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Aktif Kullanıcı",
      description: "Türkiye'nin en büyük AI finans topluluğu"
    },
    {
      icon: TrendingUp,
      value: "%127",
      label: "Ortalama Getiri",
      description: "Son 12 ayda kullanıcı portföy performansı"
    },
    {
      icon: Award,
      value: "15+",
      label: "Ödül",
      description: "Fintech ve AI kategorilerinde kazanılan ödüller"
    },
    {
      icon: Shield,
      value: "%99.9",
      label: "Uptime",
      description: "Kesintisiz hizmet güvenilirlik oranı"
    }
  ];

  const team = [
    {
      name: "Dr. Ahmet Yılmaz",
      role: "Kurucu & CEO",
      description: "Stanford'da AI ve finans doktorası. 15 yıl Goldman Sachs deneyimi.",
      speciality: "Yapay Zeka & Finans"
    },
    {
      name: "Zeynep Kaya",
      role: "CTO",
      description: "MIT Bilgisayar Mühendisliği. Ex-Google, Ex-Tesla teknoloji lideri.",
      speciality: "Machine Learning"
    },
    {
      name: "Prof. Dr. Murat Demir",
      role: "Baş Veri Bilimci",
      description: "Boğaziçi Üniversitesi öğretim üyesi. Finansal modelleme uzmanı.",
      speciality: "Quantitative Finance"
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "İnovasyon",
      description: "En güncel AI teknolojilerini finansal hizmetlere entegre ediyoruz."
    },
    {
      icon: Shield,
      title: "Güven",
      description: "Verilerinizin güvenliği ve gizliliği bizim için birinci önceliktir."
    },
    {
      icon: Target,
      title: "Başarı",
      description: "Kullanıcılarımızın finansal hedeflerine ulaşması temel amacımızdır."
    },
    {
      icon: Users,
      title: "Topluluk",
      description: "Finansal okuryazarlığı artıran bir topluluk inşa ediyoruz."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Hakkımızda</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Finansal Geleceği
              <span className="text-primary block">Birlikte Şekillendiriyoruz</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AI Finance, yapay zeka ve finans alanındaki derin uzmanlığımızı birleştirerek 
              kişisel finansal yönetimi demokratikleştirmeyi hedefleyen bir Türk startup'ıdır.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-primary transition-smooth border-0 bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-primary mb-3">
                  {stat.label}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Misyonumuz
              </h2>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Finansal danışmanlık hizmetlerini herkes için erişilebilir kılmak ve 
                yapay zeka gücüyle kişiselleştirilmiş finansal rehberlik sunmak.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Türkiye'de finansal okuryazarlığı artırarak, bireylerin bilinçli 
                yatırım kararları almasını ve finansal hedeflerine ulaşmasını sağlıyoruz.
              </p>
              
              <Button variant="hero" size="lg">
                Hikayemizi Keşfet
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 border-0 bg-card/50 backdrop-blur-sm hover:shadow-primary transition-smooth">
                  <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Uzman Ekibimiz
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dünya çapında deneyime sahip, AI ve finans alanında uzman ekibimiz 
              ile geleceğin finansal çözümlerini bugünden sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8 text-center border-0 bg-card/50 backdrop-blur-sm hover:shadow-primary transition-smooth">
                <div className="w-24 h-24 gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                
                <div className="text-primary font-medium mb-4">
                  {member.role}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {member.description}
                </p>
                
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">
                    {member.speciality}
                  </span>
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
              Finansal Yolculuğunuza
              <span className="text-premium block">Birlikte Başlayalım</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              AI destekli finansal danışmanımızla tanışın ve finansal hedeflerinize 
              ulaşmanın en akıllı yolunu keşfedin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" className="text-lg px-8 py-4">
                <Zap className="w-5 h-5" />
                Hemen Başla
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;