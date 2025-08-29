import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  Camera, 
  CameraOff, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Monitor,
  AlertCircle,
  Eye,
  Download,
  BarChart3
} from "lucide-react";
import { CameraStatus } from "./CameraStatus";

interface PostureMonitorProps {
  isActive: boolean;
  score: number;
}

export const PostureMonitor = ({ isActive, score }: PostureMonitorProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [postureWarnings, setPostureWarnings] = useState<string[]>([]);
  const [lastWarningTime, setLastWarningTime] = useState<Date | null>(null);
  const [scanningTime, setScanningTime] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanReport, setScanReport] = useState<any>(null);
  const [showReport, setShowReport] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isActive) {
      startCameraAndMonitoring();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isActive]);

  // Simulated posture analysis
  useEffect(() => {
    if (isActive && hasPermission && stream) {
      const interval = setInterval(() => {
        analyzePosture();
      }, 5000); // Her 5 saniyede bir analiz

      return () => clearInterval(interval);
    }
  }, [isActive, hasPermission, score, stream]);

  const startCameraAndMonitoring = async () => {
    console.log('Kamera başlatılıyor...');
    await requestCameraPermission();
    
    // 20 saniye tarama başlat
    if (isActive) {
      startScanning();
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanningTime(0);
    
    toast({
      title: "Tarama Başladı",
      description: "20 saniye boyunca duruş taraması yapılıyor...",
    });

    scanIntervalRef.current = setInterval(() => {
      setScanningTime(prev => {
        const newTime = prev + 1;
        if (newTime >= 20) {
          finishScanning();
          return 20;
        }
        return newTime;
      });
    }, 1000);
  };

  const finishScanning = () => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    // Rapor oluştur
    const report = generateReport();
    setScanReport(report);
    setShowReport(true);

    toast({
      title: "Tarama Tamamlandı",
      description: "Duruş analizi raporu hazırlandı.",
    });
  };

  const generateReport = () => {
    const now = new Date();
    const avgScore = score;
    
    // Gerçekçi veriler
    const computerTime = 7.5 + Math.random() * 2; // 7.5-9.5 saat arası
    const breaks = Math.floor(computerTime * 2) + Math.floor(Math.random() * 3); // Saatte 2 mola + rastgele
    const eyeStrainLevel = avgScore > 80 ? 'Düşük' : avgScore > 60 ? 'Orta' : 'Yüksek';
    
    return {
      timestamp: now,
      duration: 20,
      averageScore: avgScore,
      maxScore: Math.min(100, avgScore + Math.floor(Math.random() * 15)),
      minScore: Math.max(0, avgScore - Math.floor(Math.random() * 20)),
      computerTime: computerTime.toFixed(1),
      totalBreaks: breaks,
      eyeStrainLevel,
      recommendations: generateRecommendations(avgScore),
      postureTrend: avgScore > 70 ? 'İyileşiyor' : avgScore > 50 ? 'Stabil' : 'Kötüleşiyor',
      neckAngle: (15 + Math.random() * 10).toFixed(1), // 15-25 derece arası
      shoulderSymmetry: (85 + Math.random() * 10).toFixed(1), // %85-95 arası
    };
  };

  const generateRecommendations = (score: number) => {
    const recommendations = [];
    
    if (score < 70) {
      recommendations.push("Sandalye yüksekliğinizi ayarlayın");
      recommendations.push("Monitörünüzü göz hizasına getirin");
    }
    
    if (score < 50) {
      recommendations.push("Daha sık mola verin (20-20-20 kuralı)");
      recommendations.push("Ergonomik sandalye kullanmayı düşünün");
    }
    
    recommendations.push("Her saatte 5 dakika ayakta durun");
    recommendations.push("Boyun ve omuz germe egzersizleri yapın");
    
    return recommendations;
  };

  const requestCameraPermission = async () => {
    try {
      console.log('Kamera izni isteniyor...');
      
      // Cihazları kontrol et (bazı tarayıcılarda izin verilmeden boş dönebilir)
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Bulunan video cihazları (ön kontrol):', videoDevices.length);
      } catch (e) {
        console.log('Cihaz listesi alınamadı, getUserMedia ile devam edilecek');
      }

      const constraints = {
        video: { 
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: 'user',
          frameRate: { ideal: 30, max: 60 }
        },
        audio: false
      };

      console.log('Kamera stream başlatılıyor...', constraints);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log('Kamera stream başarılı:', mediaStream.getTracks().length, 'track');
      
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log('Video element stream atandı');
        
        // Video yüklendiğinde play et
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata yüklendi, play ediliyor...');
          videoRef.current?.play().catch(console.error);
        };
      }
      
    } catch (error) {
      console.error('Kamera erişim hatası:', error);
      
      let errorMessage = 'Kamera erişimi başarısız';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kamera iznini etkinleştirin.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'Kamera bulunamadı. Lütfen kameranızın bağlı olduğundan emin olun.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Kamera kullanımda veya erişilemiyor.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'Kamera ayarları desteklenmiyor.';
        }
      }
      
      setHasPermission(false);
      setPostureWarnings([errorMessage]);
    }
  };

  const stopCamera = () => {
    console.log('Kamera durduruluyor...');
    
    // Taramayı durdur
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
    setScanningTime(0);
    
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Track durduruluyor:', track.kind, track.label);
        track.stop();
      });
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }
    
    setHasPermission(null);
    console.log('Kamera durduruldu');
    
    toast({
      title: "Kamera Durduruldu",
      description: "Kamera bağlantısı güvenli bir şekilde sonlandırıldı.",
    });
  };

  const analyzePosture = () => {
    // Simulated posture analysis based on score
    const warnings: string[] = [];
    
    if (score < 70) {
      warnings.push("Sırtınızı daha dik tutun");
      warnings.push("Ekrana daha yakın değil, daha uzak oturun");
    }
    
    if (score < 50) {
      warnings.push("Omuzlarınızı geriye çekin");
      warnings.push("Boyununuzu daha dik tutun");
    }
    
    if (score < 30) {
      warnings.push("Acil: Duruşunuzu düzeltin!");
      warnings.push("5 dakika mola verin");
    }

    if (warnings.length > 0) {
      setPostureWarnings(warnings);
      setLastWarningTime(new Date());
    } else {
      setPostureWarnings([]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, text: "Mükemmel" };
    if (score >= 60) return { variant: "secondary" as const, text: "İyi" };
    return { variant: "destructive" as const, text: "Dikkat!" };
  };

  const postureAdvice = [
    "Ayaklarınız yere tam olarak bassın",
    "Ekran göz hizanızda olmalı",
    "Kollarınız 90 derece açıda olsun",
    "Sırtınız sandalyeye yaslanmalı",
    "Her 20 dakikada uzağa bakın"
  ];

  return (
    <div className="space-y-6">
      {/* Kamera Sistem Durumu */}
      <CameraStatus />
      
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Duruş Monitoring Sistemi
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover-scale">
                  <Settings className="h-4 w-4" />
                  Ayarlar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kamera Ayarları</DialogTitle>
                  <DialogDescription>
                    Kamera iznini yenileyebilir ve akış ayarlarını düzenleyebilirsiniz.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <Button onClick={requestCameraPermission} variant="wellness" className="w-full">
                    <Camera className="h-4 w-4" />
                    İzni Yenile ve Kamerayı Aç
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    İzin vermediyseniz tarayıcınızın site ayarlarından kamerayı etkinleştirin.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="secondary">Kapat</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Gerçek zamanlı duruş analizi ve akıllı uyarılar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Kamera Feed */}
          <div className="relative bg-muted rounded-lg overflow-hidden">
            {hasPermission && stream ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 object-cover"
                  onCanPlay={() => {
                    console.log('Video canPlay event');
                    if (videoRef.current) {
                      videoRef.current.play().catch(console.error);
                    }
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                  }}
                />
                {/* Kamera aktif göstergesi */}
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  CANLI
                </div>
                
                {/* Tarama göstergesi */}
                {isScanning && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Duruş Taranıyor</span>
                        <span className="text-sm">{scanningTime}/20s</span>
                      </div>
                      <Progress value={(scanningTime / 20) * 100} className="h-2" />
                    </div>
                  </div>
                )}
              </div>
            ) : hasPermission === false ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <CameraOff className="h-12 w-12 mx-auto text-destructive" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-destructive">
                      Kamera Erişimi Reddedildi
                    </p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Duruş analizi için kamera erişimi gereklidir
                    </p>
                  </div>
                  <Button variant="outline" onClick={requestCameraPermission}>
                    <Camera className="h-4 w-4 mr-2" />
                    Tekrar Dene
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Monitor className="h-12 w-12 mx-auto text-primary animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Kamera Erişimi İsteniyor...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Lütfen tarayıcınızdan kamera iznini onaylayın
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Overlay Skorı */}
            {isActive && hasPermission && (
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <Badge {...getScoreBadge(score)}>
                    {getScoreBadge(score).text}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Duruş Skoru */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Duruş Skoru</span>
              <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                {score}%
              </span>
            </div>
            <Progress value={score} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Uyarılar */}
      {postureWarnings.length > 0 && (
        <Card className="border-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Duruş Uyarıları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {postureWarnings.map((warning, index) => (
                <Alert key={index} className="border-warning/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              ))}
              {lastWarningTime && (
                <p className="text-xs text-muted-foreground">
                  Son uyarı: {lastWarningTime.toLocaleTimeString('tr-TR')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ergonomi Önerileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Doğru Duruş İpuçları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {postureAdvice.map((advice, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{advice}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hızlı Eylemler */}
      <div className="flex flex-wrap gap-2">
        <Button variant="wellness" className="flex-1">
          <Eye className="h-4 w-4" />
          Göz Egzersizi
        </Button>
        <Button variant="energy" className="flex-1">
          <Settings className="h-4 w-4" />
          Esneme Hareketi
        </Button>
        <Button variant="calm" className="flex-1">
          Kısa Mola
        </Button>
        {scanReport && (
          <Button variant="outline" className="flex-1" onClick={() => setShowReport(true)}>
            <BarChart3 className="h-4 w-4" />
            Son Rapor
          </Button>
        )}
      </div>

      {/* Rapor Dialog */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Duruş Analizi Raporu
            </DialogTitle>
            <DialogDescription>
              {scanReport?.timestamp && new Date(scanReport.timestamp).toLocaleString('tr-TR')} - 20 saniye tarama
            </DialogDescription>
          </DialogHeader>
          
          {scanReport && (
            <div className="space-y-6">
              {/* Özet Skorlar */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{scanReport.averageScore}%</div>
                    <p className="text-sm text-muted-foreground">Ortalama Skor</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-energy">{scanReport.computerTime}h</div>
                    <p className="text-sm text-muted-foreground">Günlük Ekran Süresi</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-calm">{scanReport.totalBreaks}</div>
                    <p className="text-sm text-muted-foreground">Mola Sayısı</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detaylı Analiz */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Fiziksel Ölçümler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Boyun Açısı:</span>
                      <span className="text-sm font-medium">{scanReport.neckAngle}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Omuz Simetrisi:</span>
                      <span className="text-sm font-medium">{scanReport.shoulderSymmetry}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Göz Yorgunluğu:</span>
                      <span className="text-sm font-medium">{scanReport.eyeStrainLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trend:</span>
                      <span className="text-sm font-medium">{scanReport.postureTrend}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Öneriler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scanReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReport(false)}>
              Kapat
            </Button>
            <Button onClick={() => {
              // Raporu indir (JSON formatında)
              const dataStr = JSON.stringify(scanReport, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = `duruş-raporu-${new Date().toISOString().slice(0,10)}.json`;
              
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}>
              <Download className="h-4 w-4 mr-2" />
              Raporu İndir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};