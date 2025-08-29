import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User as UserIcon, 
  Clock,
  Lightbulb,
  Bell
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  messageType?: 'suggestion' | 'reminder' | 'general';
}

interface AIAssistantProps {
  user: User | null;
}

const AIAssistant = ({ user }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Aktivite takibi için
  useEffect(() => {
    const updateActivity = () => setLastActivity(new Date());
    
    // Mouse ve keyboard hareketlerini takip et
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('click', updateActivity);
    
    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, []);

  // Otomatik hatırlatmalar
  useEffect(() => {
    const checkForReminders = () => {
      const now = new Date();
      const timeSinceActivity = now.getTime() - lastActivity.getTime();
      const minutesSinceActivity = timeSinceActivity / (1000 * 60);

      // 30 dakika hareketsizlik sonrası hatırlatma
      if (minutesSinceActivity >= 30) {
        addAssistantMessage(
          "30 dakikadır hareketsizsiniz. Bir mola verip esneme hareketleri yapmayı düşünür müsünüz? 🤸‍♀️",
          'reminder'
        );
        setLastActivity(new Date()); // Hatırlatmayı tekrar etmemek için
      }

      // 2 saat sonrası göz egzersizi hatırlatması
      if (minutesSinceActivity >= 120) {
        addAssistantMessage(
          "2 saattir çalışıyorsunuz! Gözleriniz için 20-20-20 kuralını uygulayın: 20 saniye boyunca 6 metre uzaktaki bir noktaya bakın. 👁️",
          'reminder'
        );
      }
    };

    const interval = setInterval(checkForReminders, 5 * 60 * 1000); // 5 dakikada bir kontrol
    return () => clearInterval(interval);
  }, [lastActivity]);

  // Chat geçmişini yükle
  useEffect(() => {
    if (user) {
      loadChatHistory();
      // Hoş geldin mesajı
      setTimeout(() => {
        addAssistantMessage(
          `Merhaba ${user.user_metadata?.full_name || 'kullanıcı'}! Ben sizin kişisel sağlık asistanınızım. Duruş kontrolü, egzersiz hatırlatmaları ve sağlıklı alışkanlıklar konusunda size yardımcı olacağım. Herhangi bir sorunuz var mı? 🌟`,
          'general'
        );
      }, 1000);
    }
  }, [user]);

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      if (data) {
        const chatMessages: Message[] = [];
        data.forEach(chat => {
          chatMessages.push({
            id: `user-${chat.id}`,
            text: chat.message,
            type: 'user',
            timestamp: new Date(chat.created_at)
          });
          chatMessages.push({
            id: `assistant-${chat.id}`,
            text: chat.response,
            type: 'assistant',
            timestamp: new Date(chat.created_at),
            messageType: chat.message_type as 'suggestion' | 'reminder' | 'general'
          });
        });
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error('Chat geçmişi yüklenirken hata:', error);
    }
  };

  const addAssistantMessage = (text: string, messageType: 'suggestion' | 'reminder' | 'general' = 'general') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'assistant',
      timestamp: new Date(),
      messageType
    };
    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // AI yanıtı al
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { 
          message: inputValue,
          userId: user.id,
          context: "health_assistant"
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        type: 'assistant',
        timestamp: new Date(),
        messageType: 'general'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Chat geçmişini kaydet
      await supabase.from('ai_chat_history').insert({
        user_id: user.id,
        message: inputValue,
        response: data.response,
        message_type: 'general'
      });

    } catch (error: any) {
      console.error('AI yanıt hatası:', error);
      toast({
        title: "Hata",
        description: "AI asistan şu anda yanıt veremiyor. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const getMessageIcon = (messageType?: string) => {
    switch (messageType) {
      case 'suggestion':
        return <Lightbulb className="h-3 w-3" />;
      case 'reminder':
        return <Bell className="h-3 w-3" />;
      default:
        return <Bot className="h-3 w-3" />;
    }
  };

  const getMessageTypeLabel = (messageType?: string) => {
    switch (messageType) {
      case 'suggestion':
        return 'Öneri';
      case 'reminder':
        return 'Hatırlatma';
      default:
        return 'Genel';
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Sağlık Asistanı
          <Badge variant="secondary" className="ml-auto">Çevrimiçi</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p>AI asistanınızla sohbete başlayın!</p>
                <p className="text-sm mt-2">Sağlık, duruş ve egzersiz konularında size yardımcı olabilirim.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {getMessageIcon(message.messageType)}
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.type === 'assistant' && message.messageType && (
                      <Badge variant="outline" className="text-xs">
                        {getMessageTypeLabel(message.messageType)}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-energy/10 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="ml-3 bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              placeholder="Mesajınızı yazın..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={isLoading || !user}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputValue.trim() || isLoading || !user}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;