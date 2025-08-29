import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Target
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const DashboardPreview = () => {
  const stats = [
    {
      icon: Wallet,
      label: "Toplam Portföy",
      value: "₺156,750",
      change: "+12.5%",
      positive: true
    },
    {
      icon: TrendingUp,
      label: "Aylık Getiri",
      value: "₺8,430",
      change: "+18.2%",
      positive: true
    },
    {
      icon: Target,
      label: "Hedef Tamamlanma",
      value: "68%",
      change: "+5.1%",
      positive: true
    },
    {
      icon: CreditCard,
      label: "Aylık Harcama",
      value: "₺12,350",
      change: "-8.7%",
      positive: false
    }
  ];

  return (
    <section id="dashboard" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <BarChart3 className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-medium">Gerçek Zamanlı Dashboard</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Finansal Durumunuz
            <span className="text-secondary block">Bir Bakışta</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Akıllı dashboard'umuz tüm finansal verilerinizi tek ekranda toplar. 
            AI destekli analizler ve gerçek zamanlı güncellemeler ile her zaman kontrolde kalın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Dashboard Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <img 
                src={dashboardImage} 
                alt="AI Dashboard Preview" 
                className="w-full rounded-3xl shadow-glow border border-border/20"
              />
              
              {/* Overlay stats */}
              <div className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-primary border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Güven Skoru</p>
                    <p className="text-lg font-bold text-success">9.2/10</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 gradient-secondary opacity-5 rounded-3xl blur-3xl transform scale-110" />
          </div>

          {/* Stats Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-primary transition-smooth bg-card/50 backdrop-blur-sm border-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.positive ? 'gradient-success' : 'gradient-primary'} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-success' : 'text-primary'}`}>
                      {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Akıllı Kategorizasyon</h4>
                  <p className="text-muted-foreground">Harcamalarınız otomatik olarak kategorize edilir ve analiz edilir.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Predictive Analytics</h4>
                  <p className="text-muted-foreground">Gelecekteki finansal durumunuzu tahmin eder ve önerilerde bulunur.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 gradient-success rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Otomatik Tasarruf</h4>
                  <p className="text-muted-foreground">AI, tasarruf fırsatlarını tespit eder ve otomatik olarak ayırır.</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Dashboard'u Keşfet
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;