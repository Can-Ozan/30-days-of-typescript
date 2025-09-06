import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Star, Calendar } from 'lucide-react';

interface TranscriptSession {
  id: string;
  text: string;
  timestamp: Date;
  duration: number;
  wordCount: number;
  starred: boolean;
}

interface HistoryProps {
  sessions: TranscriptSession[];
  onLoadSession: (session: TranscriptSession) => void;
  onDeleteSession: (id: string) => void;
  onToggleStar: (id: string) => void;
}

const TranscriptHistory: React.FC<HistoryProps> = ({
  sessions,
  onLoadSession,
  onDeleteSession,
  onToggleStar
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (sessions.length === 0) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="text-center text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Henüz kayıtlı oturum bulunmuyor.</p>
          <p className="text-sm mt-2">İlk ses kaydınızı yapın!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-voice-primary" />
        Geçmiş Oturumlar
      </h3>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 bg-background/30 rounded-lg border border-border/30 hover:bg-background/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(session.timestamp)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {session.wordCount} kelime
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatDuration(session.duration)}
                  </Badge>
                </div>
                
                <p className="text-sm line-clamp-2 mb-3">
                  {session.text.substring(0, 100)}
                  {session.text.length > 100 && '...'}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => onLoadSession(session)}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Yükle
                  </Button>
                  
                  <Button
                    onClick={() => onToggleStar(session.id)}
                    variant="ghost"
                    size="sm"
                    className={`text-xs ${session.starred ? 'text-voice-warning' : ''}`}
                  >
                    <Star className={`w-3 h-3 ${session.starred ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    onClick={() => onDeleteSession(session.id)}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TranscriptHistory;