import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Crown,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Trial = () => {
  const [remainingTries, setRemainingTries] = useState(3);
  const [currentAnalysis, setCurrentAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAnalysis = () => {
    if (remainingTries > 0) {
      setIsAnalyzing(true);
      setRemainingTries(prev => prev - 1);
      
      // Simulated AI analysis
      setTimeout(() => {
        setCurrentAnalysis(`Portföy Analizi #${4 - remainingTries}:
        
• Risk seviyeniz: Orta düzey
• Diversifikasyon puanı: 75/100
• Getiri potansiyeli: %12-18 yıllık
• Önerilen optimizasyon: Teknoloji sektöründe ağırlığı artırın
• Risk/Getiri oranı: İyi dengelenmiş
        
Bu analiz deneme sürümünde sınırlıdır. Daha detaylı analiz için Pro sürüme geçin.`);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Deneme Sürümü</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                AI Danışmanınızla
                <span className="text-primary block">Tanışın</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                3 ücretsiz deneme hakkınızla AI destekli finansal analizi keşfedin
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-muted-foreground">Kalan deneme hakkı:</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{remainingTries}</span>
                  <span className="text-muted-foreground">/3</span>
                </div>
              </div>
              
              <Progress value={(3 - remainingTries) * 33.33} className="w-full max-w-md mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Demo Panel */}
              <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Portföy Analizi Deneyin
                </h2>
                
                <div className="space-y-6">
                  <Button 
                    onClick={startAnalysis}
                    disabled={remainingTries === 0 || isAnalyzing}
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                  >
                    {isAnalyzing ? "Analiz Ediliyor..." : "AI Analizi Başlat"}
                    <Brain className="w-5 h-5" />
                  </Button>
                  
                  {currentAnalysis && (
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-3">AI Analiz Sonucu:</h3>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {currentAnalysis}
                      </pre>
                    </div>
                  )}
                  
                  {remainingTries === 0 && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-semibold">Deneme Haklarınız Bitti</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sınırsız analiz ve gelişmiş özellikler için Pro sürüme geçin
                      </p>
                      <Link to="/pro">
                        <Button variant="premium" size="sm" className="w-full">
                          Pro Sürüme Geç
                          <Crown className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>

              {/* Pro Features Preview */}
              <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Crown className="w-6 h-6 text-premium" />
                  Pro Sürümde Neler Var?
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">Sınırsız AI analizi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">Gerçek zamanlı piyasa uyarıları</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">Kişisel yatırım stratejileri</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">Risk yönetimi araçları</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">24/7 premium destek</span>
                  </div>
                </div>
                
                <div className="bg-premium/10 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <span className="text-premium font-semibold">14 Gün Ücretsiz</span>
                    <p className="text-sm text-muted-foreground">Kredi kartı gerekmez</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link to="/pro">
                    <Button variant="premium" size="lg" className="w-full">
                      Pro Sürüme Geç
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full">
                      Sorularınız mı Var?
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial;