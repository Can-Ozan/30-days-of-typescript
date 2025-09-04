import { useState } from "react"
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Shield, Palette, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Settings() {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [settings, setSettings] = useState({
    notifications: true,
    autoProcess: false,
    saveHistory: true,
    darkMode: false,
    language: 'tr',
    username: 'Kullanıcı',
    email: 'user@example.com'
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: "✅ Ayar güncellendi",
      description: "Değişiklik başarıyla kaydedildi."
    })
  }

  const handleExportData = () => {
    toast({
      title: "📊 Veri dışa aktarılıyor",
      description: "Verileriniz hazırlanıyor ve indirilecek."
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "⚠️ Hesap silme",
      description: "Bu işlem için lütfen destek ekibiyle iletişime geçin.",
      variant: "destructive"
    })
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
            Ana Sayfaya Dön
          </Button>
          
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <span className="font-semibold">Ayarlar</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Profile Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-trust-blue" />
              <h2 className="text-xl font-semibold">Profil Ayarları</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input 
                  id="username"
                  value={settings.username}
                  onChange={(e) => handleSettingChange('username', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input 
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange('email', e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* App Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-5 h-5 text-efficiency-green" />
              <h2 className="text-xl font-semibold">Uygulama Ayarları</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Bildirimler</Label>
                  <p className="text-sm text-muted-foreground">
                    Analiz tamamlandığında bildirim al
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Otomatik İşleme</Label>
                  <p className="text-sm text-muted-foreground">
                    Dosya yüklendiğinde otomatik analiz et
                  </p>
                </div>
                <Switch
                  checked={settings.autoProcess}
                  onCheckedChange={(checked) => handleSettingChange('autoProcess', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Geçmişi Kaydet</Label>
                  <p className="text-sm text-muted-foreground">
                    Analiz geçmişini cihazında sakla
                  </p>
                </div>
                <Switch
                  checked={settings.saveHistory}
                  onCheckedChange={(checked) => handleSettingChange('saveHistory', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Theme Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-security-orange" />
              <h2 className="text-xl font-semibold">Tema Ayarları</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Karanlık Mod</Label>
                <p className="text-sm text-muted-foreground">
                  Koyu tema kullan
                </p>
              </div>
              <ThemeToggle />
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-premium-gold" />
              <h2 className="text-xl font-semibold">Gizlilik ve Güvenlik</h2>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={handleExportData}
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Verilerimi Dışa Aktar
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleDeleteAccount}
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hesabımı Sil
              </Button>
            </div>
          </Card>

          {/* Advanced Features (Premium) */}
          <Card className="p-6 border-premium-gold/20 bg-premium-light/5">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-premium-gold" />
              <h2 className="text-xl font-semibold">Gelişmiş Özellikler</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Bu özellikler Premium üyelikle kullanılabilir:
            </p>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-premium-gold rounded-full"></div>
                API entegrasyonu ve toplu işleme
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-premium-gold rounded-full"></div>
                Özel AI modelleri
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-premium-gold rounded-full"></div>
                Kurumsal güvenlik özellikleri
              </li>
            </ul>
            
            <Button 
              className="mt-4 bg-premium-gradient hover:opacity-90 text-white"
              onClick={() => navigate('/payment')}
            >
              Premium'a Yükselt
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}