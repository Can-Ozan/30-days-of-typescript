import { useState } from "react"
import { Header } from "@/components/header"
import { DocumentClassifier } from "@/components/document-classifier"
import { PremiumFeatures } from "@/components/premium-features"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, FileText, Zap, Crown, ArrowRight } from "lucide-react"
import heroImage from "@/assets/hero-image.jpg"

const Index = () => {
  const [isPremium, setIsPremium] = useState(false)
  const [activeTab, setActiveTab] = useState("classifier")

  const handleUpgrade = () => {
    window.location.href = '/payment'
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isPremium={isPremium} onUpgrade={() => setActiveTab("premium")} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative mb-16 overflow-hidden rounded-3xl">
          <div 
            className="relative bg-cover bg-center h-96"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white p-8">
              <div className="max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4" />
                  AI Destekli Belge Analizi
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Belgelerinizi
                  <span className="bg-ai-gradient bg-clip-text text-transparent"> AI ile </span>
                  Sınıflandırın
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  Yapay zeka teknolojisi ile belgelerinizi otomatik olarak kategorilere ayırın. 
                  Hızlı, güvenli ve hassas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-white/90"
                    onClick={() => {
                      setActiveTab("classifier")
                      document.getElementById('classifier-section')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Hemen Başla
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => setActiveTab("premium")}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Premium Özellikleri Gör
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-ai-gradient-subtle border-ai-blue/20">
              <div className="w-12 h-12 bg-ai-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">99.2%</h3>
              <p className="text-muted-foreground">Doğruluk Oranı</p>
            </Card>
            
            <Card className="p-6 text-center bg-ai-gradient-subtle border-ai-purple/20">
              <div className="w-12 h-12 bg-ai-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10+</h3>
              <p className="text-muted-foreground">Belge Kategorisi</p>
            </Card>
            
            <Card className="p-6 text-center bg-premium-gradient/10 border-premium-gold/20">
              <div className="w-12 h-12 bg-premium-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">&lt;2s</h3>
              <p className="text-muted-foreground">Analiz Süresi</p>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="classifier" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Sınıflandırıcı
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classifier" className="space-y-8" id="classifier-section">
            <DocumentClassifier isPremium={isPremium} />
          </TabsContent>

          <TabsContent value="premium" className="space-y-8">
            <PremiumFeatures onUpgrade={handleUpgrade} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 DokümanAI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default Index