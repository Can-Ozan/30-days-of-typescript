import { useState } from "react"
import { ArrowLeft, Crown, Check, CreditCard, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const plans = {
    monthly: {
      price: '₺29.99',
      period: 'ay',
      savings: null
    },
    yearly: {
      price: '₺299.99',
      period: 'yıl',
      savings: '2 ay ücretsiz'
    }
  }

  const features = [
    '10 Belge Kategorisi',
    'Detaylı Analiz Raporları',
    'Güvenlik Skoru',
    'Öncelikli İşleme',
    'AI Önerileri',
    'Sınırsız Dosya',
    '7/24 Destek'
  ]

  const handlePayment = async () => {
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "🎉 Ödeme Başarılı!",
      description: "Premium hesabınız aktif edildi. Tüm özelliklere erişiminiz var!"
    })
    
    setProcessing(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </Button>
          
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-premium-gold" />
            <span className="font-semibold">Premium Üyelik</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-premium-gradient rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Premium'a Hoş Geldiniz
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI destekli belge analizinin tüm gücünü keşfedin. 
              Gelişmiş özellikler ve öncelikli destek ile.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Plan Seçimi</h2>
              
              <div className="space-y-4 mb-8">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPlan === 'monthly' 
                      ? 'border-primary bg-trust-light/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Aylık Plan</h3>
                      <p className="text-sm text-muted-foreground">Esnek ödeme</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{plans.monthly.price}</div>
                      <div className="text-sm text-muted-foreground">/{plans.monthly.period}</div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                    selectedPlan === 'yearly' 
                      ? 'border-primary bg-efficiency-light/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPlan('yearly')}
                >
                  {plans.yearly.savings && (
                    <Badge className="absolute -top-2 -right-2 bg-efficiency-green text-white">
                      {plans.yearly.savings}
                    </Badge>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Yıllık Plan</h3>
                      <p className="text-sm text-muted-foreground">En popüler</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{plans.yearly.price}</div>
                      <div className="text-sm text-muted-foreground">/{plans.yearly.period}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-premium-gradient hover:opacity-90 text-white"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    İşleniyor...
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ödemeyi Tamamla
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                İstediğiniz zaman iptal edebilirsiniz. Güvenli ödeme SSL ile korunur.
              </p>
            </Card>

            {/* Features */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Premium Özellikler</h2>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 bg-success-gradient rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-security-light/10 border border-security-orange/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-security-orange mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-security-orange">Güvenlik Garantisi</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verileriniz şifrelenir ve asla üçüncü şahıslarla paylaşılmaz. 
                      KVKK uyumlu veri işleme.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-efficiency-light/10 border border-efficiency-green/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-efficiency-green mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-efficiency-green">Performans Artışı</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Premium kullanıcılar öncelikli işleme kuyruğunda yer alır. 
                      3x daha hızlı analiz.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}