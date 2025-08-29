import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { 
  MessageSquare, 
  Star, 
  Send,
  Bug,
  Lightbulb,
  MessageCircle,
  ThumbsUp
} from "lucide-react";

interface FeedbackSystemProps {
  user: User | null;
}

const FeedbackSystem = ({ user }: FeedbackSystemProps) => {
  const [rating, setRating] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !category || !message.trim()) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const feedbackData = {
        user_id: user?.id || null,
        rating: parseInt(rating),
        category,
        message: message.trim(),
        status: 'pending'
      };

      // Anonim kullanıcı için email ekle (gerçek uygulamada)
      if (!user && email.trim()) {
        // Email'i message'a ekleyebiliriz
        feedbackData.message += `\n\nİletişim: ${email}`;
      }

      const { error } = await supabase
        .from('user_feedback')
        .insert(feedbackData);

      if (error) throw error;

      toast({
        title: "Geri Bildirim Gönderildi",
        description: "Değerli geri bildiriminiz için teşekkürler! En kısa sürede değerlendireceğiz.",
      });

      // Formu temizle
      setRating("");
      setCategory("");
      setMessage("");
      setEmail("");

    } catch (error: any) {
      console.error('Geri bildirim gönderilirken hata:', error);
      toast({
        title: "Hata",
        description: "Geri bildirim gönderilemedi. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryValue: string) => {
    switch (categoryValue) {
      case 'bug':
        return <Bug className="h-4 w-4" />;
      case 'feature':
        return <Lightbulb className="h-4 w-4" />;
      case 'general':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value.toString())}
            className={`p-1 rounded transition-colors ${
              parseInt(rating) >= value 
                ? 'text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <Star 
              className="h-6 w-6" 
              fill={parseInt(rating) >= value ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
    );
  };

  const getRatingText = (ratingValue: string) => {
    switch (ratingValue) {
      case '1': return 'Çok Kötü';
      case '2': return 'Kötü';
      case '3': return 'Orta';
      case '4': return 'İyi';
      case '5': return 'Mükemmel';
      default: return '';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Geri Bildirim Gönder
        </CardTitle>
        <CardDescription>
          Deneyiminizi bizimle paylaşın ve uygulamayı birlikte geliştirelim.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Değerlendirme */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Uygulamayı nasıl değerlendirirsiniz?
            </Label>
            <div className="flex items-center gap-4">
              {renderStars()}
              {rating && (
                <span className="text-sm font-medium text-primary">
                  {getRatingText(rating)}
                </span>
              )}
            </div>
          </div>

          {/* Kategori */}
          <div className="space-y-3">
            <Label htmlFor="category" className="text-base font-medium">
              Geri bildirim kategorisi
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Hata Bildirimi
                  </div>
                </SelectItem>
                <SelectItem value="feature">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Özellik Önerisi
                  </div>
                </SelectItem>
                <SelectItem value="general">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Genel Geri Bildirim
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Anonim kullanıcı için email */}
          {!user && (
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-medium">
                E-posta (İsteğe bağlı)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Size geri dönüş yapmak istediğimizde kullanacağız.
              </p>
            </div>
          )}

          {/* Mesaj */}
          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-medium">
              Mesajınız *
            </Label>
            <Textarea
              id="message"
              placeholder={
                category === 'bug' 
                  ? "Karşılaştığınız hatayı detaylı bir şekilde açıklayın..."
                  : category === 'feature'
                  ? "Hangi özelliği görmek istiyorsunuz? Detaylarını açıklayın..."
                  : "Düşüncelerinizi bizimle paylaşın..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>

          {/* Gönder Butonu */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-wellness hover:opacity-90"
            disabled={loading || !rating || !category || !message.trim()}
          >
            {loading ? (
              "Gönderiliyor..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Geri Bildirim Gönder
              </>
            )}
          </Button>
        </form>

        {/* Teşekkür Mesajı */}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-1">Geri Bildiriminiz Önemli!</h4>
              <p className="text-sm text-muted-foreground">
                Her geri bildirim, uygulamayı daha iyi hale getirmemize yardımcı oluyor. 
                Önerilerinizi ve deneyimlerinizi bizimle paylaştığınız için teşekkürler.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSystem;