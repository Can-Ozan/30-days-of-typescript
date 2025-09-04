import { Crown, Zap, Shield, BarChart3, FileSearch, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PremiumFeaturesProps {
  onUpgrade?: () => void
}

export function PremiumFeatures({ onUpgrade }: PremiumFeaturesProps) {
  const features = [
    {
      icon: FileSearch,
      title: "10 Belge Kategorisi",
      description: "Invoice, Contract, Resume, Report, Legal, Medical, Technical, Financial, Marketing, Academic",
      current: "4 kategori"
    },
    {
      icon: BarChart3,
      title: "Detaylı Analiz",
      description: "Güvenlik skoru, içerik analizi ve önem derecesi değerlendirmesi",
      current: "Temel sınıflandırma"
    },
    {
      icon: Shield,
      title: "Güvenlik Kontrolü",
      description: "Hassas veri tespiti ve gizlilik skoru analizi",
      current: "Mevcut değil"
    },
    {
      icon: Zap,
      title: "Hızlı İşleme",
      description: "Öncelikli işleme kuyruğu ile 3x daha hızlı sonuçlar",
      current: "Standart hız"
    },
    {
      icon: Sparkles,
      title: "AI Öneriler",
      description: "Belge organizasyonu ve kategori önerileri",
      current: "Mevcut değil"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="relative overflow-hidden border-2 border-premium-gold/20 bg-premium-gradient/5">
        <div className="absolute inset-0 bg-premium-gradient opacity-10"></div>
        
        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-premium-gradient rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Premium'a Yükselt</h2>
            <p className="text-muted-foreground text-lg">
              Gelişmiş AI özellikleri ile belge analizinizi güçlendirin
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-premium-gradient rounded-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Şu an: {feature.current}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>7 gün ücretsiz deneme</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>İstediğin zaman iptal et</span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-premium-gradient hover:opacity-90 text-white px-8"
              onClick={onUpgrade}
            >
              <Crown className="w-5 h-5 mr-2" />
              Premium'a Başla - ₺29.99/ay
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}