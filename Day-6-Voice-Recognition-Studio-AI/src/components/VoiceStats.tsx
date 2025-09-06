import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, FileText, Mic2, Zap, Brain } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, className = '' }) => {
  return (
    <Card className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-voice transition-all duration-300 hover:scale-105 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <Badge variant="secondary" className="mt-2 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              {change}
            </Badge>
          )}
        </div>
        <div className="text-voice-primary opacity-80">
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface VoiceStatsProps {
  transcript: string;
  isListening: boolean;
  recordingTime: number;
  sessionCount: number;
}

const VoiceStats: React.FC<VoiceStatsProps> = ({ 
  transcript, 
  isListening, 
  recordingTime,
  sessionCount 
}) => {
  const wordCount = transcript.split(' ').filter(word => word.length > 0).length;
  const charCount = transcript.length;
  const avgWordsPerMinute = recordingTime > 0 ? Math.round((wordCount / recordingTime) * 60) : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Toplam Kelime"
        value={wordCount.toString()}
        change={isListening ? "Artıyor" : "Durdu"}
        icon={<FileText className="w-8 h-8" />}
        className="animate-fade-in"
      />
      
      <StatsCard
        title="Kayıt Süresi"
        value={formatTime(recordingTime)}
        icon={<Clock className="w-8 h-8" />}
        className="animate-fade-in"
      />
      
      <StatsCard
        title="WPM Hızı"
        value={avgWordsPerMinute.toString()}
        change={avgWordsPerMinute > 120 ? "Hızlı" : avgWordsPerMinute > 80 ? "Normal" : "Yavaş"}
        icon={<Zap className="w-8 h-8" />}
        className="animate-fade-in"
      />
      
      <StatsCard
        title="Oturum Sayısı"
        value={sessionCount.toString()}
        icon={<Brain className="w-8 h-8" />}
        className="animate-fade-in"
      />
    </div>
  );
};

export default VoiceStats;