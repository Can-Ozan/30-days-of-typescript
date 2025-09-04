import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Headphones,
  Users,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@aifinance.com.tr",
      description: "7/24 email desteği"
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+90 212 123 45 67",
      description: "Hafta içi 09:00-18:00"
    },
    {
      icon: MapPin,
      title: "Adres",
      value: "Maslak, İstanbul",
      description: "Teknoloji merkezi"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      value: "7/24 Online",
      description: "Kesintisiz hizmet"
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Canlı Sohbet",
      description: "Anında destek alın",
      action: "Sohbeti Başlat",
      variant: "hero" as const
    },
    {
      icon: Headphones,
      title: "Telefon Desteği",
      description: "Uzmanlarımızla görüşün",
      action: "Ara",
      variant: "secondary" as const
    },
    {
      icon: Users,
      title: "Demo Rezervasyonu",
      description: "Kişisel demo talep edin",
      action: "Rezervasyon Yap",
      variant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-medium">İletişim</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Size Nasıl
              <span className="text-secondary block">Yardımcı Olabiliriz?</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin. 
              Uzman ekibimiz size yardımcı olmaya hazır.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-primary transition-smooth border-0 bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {option.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {option.description}
                </p>
                
                <Button variant={option.variant} className="w-full">
                  {option.action}
                </Button>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Mesaj Gönderin
                </h2>
                <p className="text-muted-foreground">
                  Formu doldurun, en kısa sürede size geri dönelim.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ad Soyad
                    </label>
                    <Input 
                      placeholder="Adınızı yazın"
                      className="bg-card/50 border-border/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input 
                      type="email"
                      placeholder="email@örnek.com"
                      className="bg-card/50 border-border/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefon
                  </label>
                  <Input 
                    placeholder="+90 5xx xxx xx xx"
                    className="bg-card/50 border-border/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Konu
                  </label>
                  <Input 
                    placeholder="Mesaj konusu"
                    className="bg-card/50 border-border/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mesaj
                  </label>
                  <Textarea 
                    placeholder="Mesajınızı yazın..."
                    rows={6}
                    className="bg-card/50 border-border/50"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Mesajı Gönder
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  İletişim Bilgileri
                </h2>
                <p className="text-muted-foreground">
                  Bize ulaşmanın farklı yolları
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 border-0 bg-card/50 backdrop-blur-sm hover:shadow-primary transition-smooth">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-lg text-primary font-medium mb-1">
                          {info.value}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Sık Sorulan Sorular
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Ücretsiz deneme süresi ne kadar?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      30 gün boyunca tüm özellikleri ücretsiz deneyebilirsiniz.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Verilerim güvende mi?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      256-bit SSL şifreleme ile banka seviyesi güvenlik sağlıyoruz.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  Tüm SSS'leri Görüntüle
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Hemen Başlamaya
              <span className="text-premium block">Hazır mısınız?</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              AI destekli finansal danışmanınızla tanışın ve finansal hedeflerinize 
              ulaşmanın en akıllı yolunu keşfedin.
            </p>
            
            <Button variant="premium" size="lg" className="text-lg px-8 py-4">
              Ücretsiz Hesap Oluştur
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;