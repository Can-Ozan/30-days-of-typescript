import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ai-finance-hero.jpg";

const FinanceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Floating elements for dynamic effect */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-white/5 blur-2xl float-animation" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Bot className="w-5 h-5 text-white" />
              <span className="text-white font-medium">AI Destekli Finans Danışmanı</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Finansal
              <span className="bg-gradient-to-r from-white to-secondary-glow bg-clip-text text-transparent block">
                Geleceğinizi
              </span>
              <span className="text-premium">Şekillendirin</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Yapay zeka destekli kişisel finans danışmanımız ile yatırımlarınızı optimize edin, 
              harcamalarınızı takip edin ve finansal hedeflerinize ulaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/trial">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Ücretsiz Analiz Başlat
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                Demo İzle
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span>256-bit SSL Güvenlik</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-premium" />
                <span>%98 Doğruluk Oranı</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-smooth">
              <img 
                src={heroImage} 
                alt="AI Finance Assistant" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-glow pulse-glow"
              />
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-primary float-animation">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aylık Getiri</p>
                  <p className="text-lg font-bold text-success">+12.5%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-primary" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI Analiz</p>
                  <p className="text-lg font-bold text-primary">Aktif</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FinanceHero;