import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Camera, CameraOff, RotateCcw, Flashlight, FlashlightOff, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

export const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          setIsScanning(false);
          qrScanner.stop();
          toast({
            title: 'QR Code Detected',
            description: 'QR code has been successfully scanned!'
          });
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        }
      );

      qrScannerRef.current = qrScanner;
      
      await qrScanner.start();
      setIsScanning(true);
      
      // Check if device has flash
      const hasFlashSupport = await qrScanner.hasFlash();
      setHasFlash(hasFlashSupport);
      
    } catch (error) {
      toast({
        title: 'Camera Error',
        description: 'Unable to access camera. Please check permissions.',
        variant: 'destructive'
      });
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsScanning(false);
      setFlashOn(false);
    }
  };

  const toggleFlash = async () => {
    if (qrScannerRef.current && hasFlash) {
      try {
        await qrScannerRef.current.toggleFlash();
        setFlashOn(!flashOn);
      } catch (error) {
        toast({
          title: 'Flash Error',
          description: 'Unable to toggle flashlight',
          variant: 'destructive'
        });
      }
    }
  };

  const scanFromImage = async () => {
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image.dataUrl) {
        const result = await QrScanner.scanImage(image.dataUrl);
        setScanResult(result);
        toast({
          title: 'QR Code Detected',
          description: 'QR code has been successfully scanned from image!'
        });
      }
    } catch (error) {
      toast({
        title: 'Scan Error',
        description: 'Unable to scan QR code from image',
        variant: 'destructive'
      });
    }
  };

  const copyResult = async () => {
    if (scanResult) {
      await navigator.clipboard.writeText(scanResult);
      toast({
        title: 'Copied',
        description: 'Result copied to clipboard'
      });
    }
  };

  const openUrl = () => {
    if (scanResult && isValidUrl(scanResult)) {
      window.open(scanResult, '_blank');
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const formatResult = (result: string): string => {
    if (result.startsWith('BEGIN:VCARD')) {
      return 'Contact Card (vCard)';
    } else if (isValidUrl(result)) {
      return 'Website URL';
    } else if (result.includes('@') && result.includes('.')) {
      return 'Email Address';
    } else if (result.match(/^\+?[\d\s\-\(\)]+$/)) {
      return 'Phone Number';
    } else {
      return 'Text Content';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Camera className="w-8 h-8 text-primary" />
          QR Code Scanner
        </h2>
        <p className="text-muted-foreground">Scan QR codes using your camera or from images</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <Card>
          <CardHeader>
            <CardTitle>Camera Scanner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                style={{ display: isScanning ? 'block' : 'none' }}
              />
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center text-white/80">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Camera will appear here</p>
                  </div>
                </div>
              )}
              {isScanning && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Scanning...
                  </Badge>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {!isScanning ? (
                <Button onClick={startScanning} className="col-span-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <>
                  <Button onClick={stopScanning} variant="outline">
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                  {hasFlash && (
                    <Button onClick={toggleFlash} variant="outline">
                      {flashOn ? (
                        <FlashlightOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Flashlight className="w-4 h-4 mr-2" />
                      )}
                      Flash
                    </Button>
                  )}
                </>
              )}
            </div>

            <Button onClick={scanFromImage} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Scan from Image
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Scan Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scanResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{formatResult(scanResult)}</Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={copyResult}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      {isValidUrl(scanResult) && (
                        <Button size="sm" variant="ghost" onClick={openUrl}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm break-all">{scanResult}</p>
                </div>

                {scanResult.startsWith('BEGIN:VCARD') && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="text-sm space-y-1">
                      {scanResult.split('\n').map((line, index) => {
                        if (line.startsWith('FN:')) return <p key={index}><strong>Name:</strong> {line.replace('FN:', '')}</p>;
                        if (line.startsWith('ORG:')) return <p key={index}><strong>Organization:</strong> {line.replace('ORG:', '')}</p>;
                        if (line.startsWith('TEL:')) return <p key={index}><strong>Phone:</strong> {line.replace('TEL:', '')}</p>;
                        if (line.startsWith('EMAIL:')) return <p key={index}><strong>Email:</strong> {line.replace('EMAIL:', '')}</p>;
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="w-8 h-8" />
                </div>
                <p>Scan a QR code to see results here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};