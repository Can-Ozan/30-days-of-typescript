import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Share2, QrCode, LinkIcon, User, Mail, Phone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  organization: string;
}

export const QRGenerator: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [contact, setContact] = useState<ContactInfo>({
    name: '',
    phone: '',
    email: '',
    organization: ''
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [qrSize, setQrSize] = useState<number>(300);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async (data: string) => {
    if (!data.trim()) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(data, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate QR code',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContactQR = () => {
    if (!contact.name && !contact.phone && !contact.email) return;
    
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
END:VCARD`;
    
    generateQR(vCard);
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
    
    toast({
      title: 'Success',
      description: 'QR code downloaded successfully'
    });
  };

  const copyQRToClipboard = async () => {
    if (!qrDataUrl) return;
    
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      toast({
        title: 'Success',
        description: 'QR code copied to clipboard'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy QR code',
        variant: 'destructive'
      });
    }
  };

  const shareQR = async () => {
    if (!qrDataUrl || !navigator.share) {
      toast({
        title: 'Error',
        description: 'Sharing not supported on this device',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'QR Code',
        files: [file]
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to share QR code',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <QrCode className="w-8 h-8 text-primary" />
          QR Code Generator
        </h2>
        <p className="text-muted-foreground">Create QR codes for text, URLs, and contact information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Generator */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generate QR Code</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            {showSettings && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label>QR Code Size</Label>
                  <Select value={qrSize.toString()} onValueChange={(value) => setQrSize(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="200">Small (200px)</SelectItem>
                      <SelectItem value="300">Medium (300px)</SelectItem>
                      <SelectItem value="400">Large (400px)</SelectItem>
                      <SelectItem value="600">Print A4 (600px)</SelectItem>
                      <SelectItem value="800">High Quality (800px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text Content</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter any text to generate QR code..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={() => generateQR(text)} 
                  disabled={!text.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => generateQR(url)} 
                  disabled={!url.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={contact.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      placeholder="Company"
                      value={contact.organization}
                      onChange={(e) => setContact({...contact, organization: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={contact.phone}
                        onChange={(e) => setContact({...contact, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={contact.email}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={generateContactQR} 
                  disabled={(!contact.name && !contact.phone && !contact.email) || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Contact QR'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Generated QR Code */}
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {qrDataUrl ? (
                <div className="relative">
                  <img 
                    src={qrDataUrl} 
                    alt="Generated QR Code" 
                    className="border rounded-lg shadow-lg"
                    style={{ maxWidth: '300px', height: 'auto' }}
                  />
                  <Badge className="absolute -top-2 -right-2 bg-green-500">
                    Ready
                  </Badge>
                </div>
              ) : (
                <div className="w-72 h-72 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>QR code will appear here</p>
                  </div>
                </div>
              )}
            </div>
            
            {qrDataUrl && (
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={downloadQR} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={copyQRToClipboard} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={shareQR} variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};