import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Camera, 
  CameraOff, 
  Settings, 
  Play, 
  Pause,
  AlertCircle,
  CheckCircle,
  Monitor,
  Wifi,
  WifiOff
} from "lucide-react";

export const CameraStatus = () => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');

  useEffect(() => {
    checkCameraSupport();
    checkPermissions();
    loadDevices();
  }, []);

  const checkCameraSupport = () => {
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setIsSupported(supported);
    console.log('Kamera desteği:', supported);
  };

  const checkPermissions = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setPermissionStatus(permission.state);
        console.log('Kamera izin durumu:', permission.state);
        
        permission.addEventListener('change', () => {
          setPermissionStatus(permission.state);
        });
      }
    } catch (error) {
      console.log('İzin kontrolü yapılamadı:', error);
    }
  };

  const loadDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      console.log('Bulunan video cihazları:', videoDevices);
    } catch (error) {
      console.error('Cihazlar yüklenemedi:', error);
    }
  };

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionStatus('granted');
      stream.getTracks().forEach(track => track.stop()); // Test için durdu
      await loadDevices(); // Cihazları tekrar yükle
    } catch (error) {
      setPermissionStatus('denied');
      console.error('İzin verilmedi:', error);
    }
  };

  const getStatusColor = () => {
    if (!isSupported) return 'destructive';
    if (permissionStatus === 'granted' && devices.length > 0) return 'default';
    if (permissionStatus === 'denied') return 'destructive';
    return 'secondary';
  };

  const getStatusText = () => {
    if (!isSupported) return 'Desteklenmiyor';
    if (permissionStatus === 'granted' && devices.length > 0) return 'Hazır';
    if (permissionStatus === 'denied') return 'İzin Reddedildi';
    if (permissionStatus === 'prompt') return 'İzin Gerekli';
    return 'Kontrol Ediliyor';
  };

  const getStatusIcon = () => {
    if (!isSupported) return <CameraOff className="h-4 w-4" />;
    if (permissionStatus === 'granted' && devices.length > 0) return <CheckCircle className="h-4 w-4" />;
    if (permissionStatus === 'denied') return <CameraOff className="h-4 w-4" />;
    return <Camera className="h-4 w-4" />;
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Kamera Sistem Durumu
        </CardTitle>
        <CardDescription>
          Kamera erişimi ve sistem kontrolleri
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ana Durum */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="font-medium">Kamera Durumu</p>
              <p className="text-sm text-muted-foreground">
                {getStatusText()}
              </p>
            </div>
          </div>
          <Badge variant={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        {/* Detay Bilgiler */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Tarayıcı Desteği</span>
            <div className="flex items-center gap-2">
              {isSupported ? (
                <>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Destekleniyor</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span>Desteklenmiyor</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>İzin Durumu</span>
            <div className="flex items-center gap-2">
              {permissionStatus === 'granted' ? (
                <>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>İzin Verildi</span>
                </>
              ) : permissionStatus === 'denied' ? (
                <>
                  <CameraOff className="h-4 w-4 text-destructive" />
                  <span>İzin Reddedildi</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span>İzin Bekleniyor</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>Bulunan Kameralar</span>
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>{devices.length} cihaz</span>
            </div>
          </div>
        </div>

        {/* Kamera Listesi */}
        {devices.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Kullanılabilir Kameralar:</h4>
            {devices.map((device, index) => (
              <div key={device.deviceId} className="flex items-center gap-2 p-2 bg-secondary/50 rounded text-sm">
                <Camera className="h-4 w-4" />
                <span>{device.label || `Kamera ${index + 1}`}</span>
              </div>
            ))}
          </div>
        )}

        {/* Eylemler */}
        <div className="flex gap-2">
          {permissionStatus !== 'granted' && isSupported && (
            <Button variant="default" onClick={requestPermission} className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Kamera İznini Ver
            </Button>
          )}
          <Button variant="outline" onClick={loadDevices}>
            <Settings className="h-4 w-4 mr-2" />
            Yenile
          </Button>
        </div>

        {/* Uyarılar */}
        {!isSupported && (
          <Alert className="border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tarayıcınız kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın.
            </AlertDescription>
          </Alert>
        )}

        {permissionStatus === 'denied' && (
          <Alert className="border-warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Kamera izni reddedildi. Tarayıcı ayarlarından kamera iznini manuel olarak etkinleştirin.
            </AlertDescription>
          </Alert>
        )}

        {isSupported && devices.length === 0 && permissionStatus === 'granted' && (
          <Alert className="border-warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Kamera bulunamadı. Lütfen kameranızın bağlı ve çalışır durumda olduğundan emin olun.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};