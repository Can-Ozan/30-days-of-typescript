import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Eye, 
  Volume, 
  VolumeX, 
  Bell, 
  BellOff, 
  Monitor,
  Camera,
  Mic,
  Settings,
  AlertTriangle,
  CheckCircle,
  Timer,
  Zap
} from "lucide-react";

interface StreamerModeProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

interface StreamerSettings {
  silentMode: boolean;
  visualOnlyAlerts: boolean;
  postureMonitoring: boolean;
  eyeReminders: boolean;
  breakReminders: boolean;
  alertOpacity: number;
  alertDuration: number;
  cameraPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  minimizeOverlay: boolean;
}

export const StreamerMode = ({ isActive, setIsActive }: StreamerModeProps) => {
  const [settings, setSettings] = useState<StreamerSettings>({
    silentMode: true,
    visualOnlyAlerts: true,
    postureMonitoring: true,
    eyeReminders: true,
    breakReminders: true,
    alertOpacity: 80,
    alertDuration: 3,
    cameraPosition: 'top-right',
    minimizeOverlay: false
  });

  const [streamerStats, setStreamerStats] = useState({
    streamDuration: 145, // dakika
    postureScore: 78,
    eyeBreaksTaken: 8,
    remindersShown: 15,
    lastBreak: 12 // dakika önce
  });

  const updateSetting = <K extends keyof StreamerSettings>(
    key: K, 
    value: StreamerSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const formatStreamTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}dk`;
  };

  const getHealthStatus = () => {
    if (streamerStats.postureScore >= 80) return { text: "Mükemmel", color: "text-primary", variant: "default" as const };
    if (streamerStats.postureScore >= 60) return { text: "İyi", color: "text-warning", variant: "secondary" as const };
    return { text: "Dikkat!", color: "text-destructive", variant: "destructive" as const };
  };

  const streamerTips = [
    "Kamera açısını ayarlayarak duruş takibini optimize edin",
    "Yayın sırasında sessiz uyarıları etkinleştirin",
    "Düzenli mola hatırlatmalarını kullanın",
    "Göz egzersizi uyarılarını visual-only modda açın",
    "Stream kalitesini etkilemeden sağlığınızı koruyun"
  ];

  return (
    <div className="space-y-6">
      {/* Yayıncı Modu Kontrolü */}
      <Card className={`border-2 transition-all ${isActive ? "border-primary bg-primary/5" : ""}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Yayıncı Modu
                {isActive && <Badge variant="default" className="animate-pulse-wellness">Aktif</Badge>}
              </CardTitle>
              <CardDescription>
                Yayın yaparken sağlık takibi için özel tasarlanmış mod
              </CardDescription>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="scale-125"
            />
          </div>
        </CardHeader>
        {isActive && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {formatStreamTime(streamerStats.streamDuration)}
                </div>
                <p className="text-xs text-muted-foreground">Yayın Süresi</p>
              </div>
              <div>
                <div className={`text-2xl font-bold ${getHealthStatus().color}`}>
                  {streamerStats.postureScore}%
                </div>
                <p className="text-xs text-muted-foreground">Duruş Skoru</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-energy">
                  {streamerStats.eyeBreaksTaken}
                </div>
                <p className="text-xs text-muted-foreground">Göz Molası</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">
                  {streamerStats.lastBreak}dk
                </div>
                <p className="text-xs text-muted-foreground">Son Mola</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Yayıncı Ayarları */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Yayıncı Özel Ayarları
          </CardTitle>
          <CardDescription>
            Yayın kalitesini etkilemeden sağlık takibi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sessiz Mod */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                {settings.silentMode ? <VolumeX className="h-4 w-4" /> : <Volume className="h-4 w-4" />}
                Sessiz Mod
              </Label>
              <p className="text-sm text-muted-foreground">
                Tüm ses uyarılarını kapatır
              </p>
            </div>
            <Switch
              checked={settings.silentMode}
              onCheckedChange={(checked) => updateSetting('silentMode', checked)}
            />
          </div>

          {/* Görsel Uyarılar */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Sadece Görsel Uyarılar
              </Label>
              <p className="text-sm text-muted-foreground">
                Ses yerine görsel uyarılar gösterir
              </p>
            </div>
            <Switch
              checked={settings.visualOnlyAlerts}
              onCheckedChange={(checked) => updateSetting('visualOnlyAlerts', checked)}
            />
          </div>

          {/* Duruş İzleme */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Duruş İzleme
              </Label>
              <p className="text-sm text-muted-foreground">
                Arka planda duruş kontrolü yapar
              </p>
            </div>
            <Switch
              checked={settings.postureMonitoring}
              onCheckedChange={(checked) => updateSetting('postureMonitoring', checked)}
            />
          </div>

          {/* Göz Hatırlatıcıları */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Göz Egzersizi Hatırlatıcıları
              </Label>
              <p className="text-sm text-muted-foreground">
                20-20-20 kuralı hatırlatmaları
              </p>
            </div>
            <Switch
              checked={settings.eyeReminders}
              onCheckedChange={(checked) => updateSetting('eyeReminders', checked)}
            />
          </div>

          {/* Mola Hatırlatıcıları */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Mola Hatırlatıcıları
              </Label>
              <p className="text-sm text-muted-foreground">
                Düzenli aralıklarla mola önerileri
              </p>
            </div>
            <Switch
              checked={settings.breakReminders}
              onCheckedChange={(checked) => updateSetting('breakReminders', checked)}
            />
          </div>

          {/* Uyarı Şeffaflığı */}
          <div className="space-y-3">
            <Label>Uyarı Şeffaflığı ({settings.alertOpacity}%)</Label>
            <Slider
              value={[settings.alertOpacity]}
              onValueChange={(value) => updateSetting('alertOpacity', value[0])}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Uyarı mesajlarının ekrandaki görünürlüğü
            </p>
          </div>

          {/* Uyarı Süresi */}
          <div className="space-y-3">
            <Label>Uyarı Gösterim Süresi ({settings.alertDuration} saniye)</Label>
            <Slider
              value={[settings.alertDuration]}
              onValueChange={(value) => updateSetting('alertDuration', value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Uyarıların ekranda kalma süresi
            </p>
          </div>

          {/* Kamera Pozisyonu */}
          <div className="space-y-3">
            <Label>Duruş Kamerası Pozisyonu</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'top-left', label: 'Sol Üst' },
                { value: 'top-right', label: 'Sağ Üst' },
                { value: 'bottom-left', label: 'Sol Alt' },
                { value: 'bottom-right', label: 'Sağ Alt' }
              ].map(({ value, label }) => (
                <Button
                  key={value}
                  variant={settings.cameraPosition === value ? "default" : "outline"}
                  onClick={() => updateSetting('cameraPosition', value as any)}
                  className="text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Yayıncı İpuçları */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Yayıncılar İçin İpuçları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streamerTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hızlı Aksiyonlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="wellness" className="h-20 flex-col gap-2">
          <Eye className="h-6 w-6" />
          <span>Hızlı Göz Molası</span>
        </Button>
        <Button variant="energy" className="h-20 flex-col gap-2">
          <Timer className="h-6 w-6" />
          <span>5 Dakika Mola</span>
        </Button>
        <Button variant="calm" className="h-20 flex-col gap-2">
          <AlertTriangle className="h-6 w-6" />
          <span>Duruş Kontrolü</span>
        </Button>
      </div>

      {/* Yayın Sırasında Durum */}
      {isActive && (
        <Card className="bg-gradient-wellness text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Yayın Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <Badge {...getHealthStatus()} className="text-lg px-4 py-2">
                Sağlık Durumu: {getHealthStatus().text}
              </Badge>
              <p className="text-sm opacity-90">
                Son {streamerStats.lastBreak} dakikada mola verilmedi. 
                {streamerStats.lastBreak > 30 && " Mola zamanı!"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};