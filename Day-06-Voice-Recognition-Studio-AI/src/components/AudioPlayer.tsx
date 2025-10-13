import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  transcript: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  transcript,
  isPlaying,
  onPlay,
  onPause,
  volume,
  onVolumeChange
}) => {
  const speakText = () => {
    if (!transcript) return;
    
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = volume;
    
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  const handlePlay = () => {
    if (isPlaying) {
      stopSpeaking();
      onPause();
    } else {
      speakText();
      onPlay();
    }
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handlePlay}
            disabled={!transcript}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {isPlaying ? (
              <PauseCircle className="w-4 h-4" />
            ) : (
              <PlayCircle className="w-4 h-4" />
            )}
            <span>{isPlaying ? 'Durdur' : 'Dinle'}</span>
          </Button>
          
          <Badge variant="secondary" className="text-xs">
            Metin-Ses Dönüştürme
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <VolumeX className="w-4 h-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-voice-primary"
          />
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;