import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Square, Search, Volume2, Heart, Zap, Download, Settings, History, BarChart3, Command } from 'lucide-react';
import VoiceStats from './VoiceStats';
import AudioPlayer from './AudioPlayer';
import TranscriptHistory from './TranscriptHistory';
import VoiceSettings from './VoiceSettings';
import VoiceCommands from './VoiceCommands';
import VoiceAnalytics from './VoiceAnalytics';
import ExportManager from './ExportManager';

interface TranscriptSession {
  id: string;
  text: string;
  timestamp: Date;
  duration: number;
  wordCount: number;
  starred: boolean;
}

interface VoiceRecorderProps {}

const VoiceRecorder: React.FC<VoiceRecorderProps> = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [emotion, setEmotion] = useState<'nötr' | 'mutlu' | 'üzgün' | 'heyecanlı'>('nötr');
  const [recordingTime, setRecordingTime] = useState(0);
  const [sessionCount, setSessionCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [sessions, setSessions] = useState<TranscriptSession[]>([]);
  
  // Enhanced settings
  const [language, setLanguage] = useState('tr-TR');
  const [sensitivity, setSensitivity] = useState(75);
  const [autoSave, setAutoSave] = useState(true);
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [continuousMode, setContinuousMode] = useState(true);
  const [confidence, setConfidence] = useState(70);
  
  // Analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalSessions: 0,
    totalDuration: 0,
    totalWords: 0,
    averageWPM: 0,
    accuracyRate: 85,
    confidenceScore: 78,
    emotionDistribution: [
      { emotion: 'neutral', count: 45, color: 'hsl(var(--muted-foreground))' },
      { emotion: 'happy', count: 30, color: 'hsl(var(--voice-success))' },
      { emotion: 'excited', count: 15, color: 'hsl(var(--voice-accent))' },
      { emotion: 'sad', count: 10, color: 'hsl(var(--voice-warning))' }
    ],
    languageUsage: [
      { language: 'Turkish', sessions: 12 },
      { language: 'English', sessions: 8 },
      { language: 'German', sessions: 3 }
    ],
    dailyUsage: [
      { day: 'Mon', sessions: 5, duration: 1200 },
      { day: 'Tue', sessions: 8, duration: 1800 },
      { day: 'Wed', sessions: 3, duration: 900 },
      { day: 'Thu', sessions: 6, duration: 1400 },
      { day: 'Fri', sessions: 9, duration: 2100 },
      { day: 'Sat', sessions: 4, duration: 800 },
      { day: 'Sun', sessions: 2, duration: 600 }
    ],
    speechPatterns: {
      pauseFrequency: 12,
      averageSentenceLength: 18,
      vocabularyRichness: 82,
      speechClarity: 88
    }
  });
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
          analyzeEmotion(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setAudioLevel(0);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setAudioLevel(0);
      };
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Timer effect for recording time
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isListening]);

  const analyzeEmotion = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('harika') || lowerText.includes('güzel') || lowerText.includes('mükemmel')) {
      setEmotion('mutlu');
    } else if (lowerText.includes('üzgün') || lowerText.includes('kötü') || lowerText.includes('problem')) {
      setEmotion('üzgün');
    } else if (lowerText.includes('heyecan') || lowerText.includes('muhteşem') || lowerText.includes('inanılmaz')) {
      setEmotion('heyecanlı');
    } else {
      setEmotion('nötr');
    }
  };

  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
        }
        animationRef.current = requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setIsListening(true);
      recognitionRef.current.start();
      startAudioAnalysis();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setAudioLevel(0);
    
    // Save session when stopping
    if (transcript.trim() && autoSave) {
      saveSession();
    }
  };

  const saveSession = () => {
    const newSession: TranscriptSession = {
      id: Date.now().toString(),
      text: transcript,
      timestamp: new Date(),
      duration: recordingTime,
      wordCount: transcript.split(' ').filter(word => word.length > 0).length,
      starred: false
    };
    
    setSessions(prev => [newSession, ...prev]);
    setSessionCount(prev => prev + 1);
    setRecordingTime(0);
  };

  const loadSession = (session: TranscriptSession) => {
    setTranscript(session.text);
    setRecordingTime(session.duration);
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const toggleStar = (id: string) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id 
          ? { ...session, starred: !session.starred }
          : session
      )
    );
  };

  const clearTranscript = () => {
    setTranscript('');
    setEmotion('nötr');
    setRecordingTime(0);
  };

  const downloadTranscript = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ses-metni.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-voice-primary/30 text-voice-primary font-semibold">
          {part}
        </mark>
      ) : part
    );
  };

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'mutlu': return <span className="text-voice-success">😊</span>;
      case 'üzgün': return <span className="text-voice-warning">😢</span>;
      case 'heyecanlı': return <span className="text-voice-accent">🤩</span>;
      default: return <span className="text-muted-foreground">😐</span>;
    }
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Tarayıcı Desteği Yok</h2>
          <p className="text-muted-foreground">
            Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome, Edge veya Safari kullanın.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Ses Tanıma Stüdyosu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sesini metne dönüştür, ara, vurgula ve analiz et. Gerçek zamanlı ses tanıma teknolojisi.
          </p>
        </div>

        {/* Voice Stats */}
        <VoiceStats 
          transcript={transcript}
          isListening={isListening}
          recordingTime={recordingTime}
          sessionCount={sessionCount}
        />

        {/* Voice Control Panel */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex flex-col items-center space-y-6">
            {/* Voice Level Indicator */}
            <div className="relative">
              <div className="flex items-center justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-8 bg-voice-primary rounded-full transition-all duration-150 ${
                      audioLevel * 5 > i ? 'animate-wave' : 'opacity-30'
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isListening ? `${Math.max(8, audioLevel * 40 + 8)}px` : '8px'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Main Control Button */}
            <div className="relative">
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                className={`w-20 h-20 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-voice-warning hover:bg-voice-warning/90 animate-pulse-glow' 
                    : 'bg-gradient-primary hover:scale-110 shadow-voice'
                }`}
              >
                {isListening ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              {isListening && (
                <div className="absolute -inset-4 border-2 border-voice-primary rounded-full animate-ping opacity-30" />
              )}
            </div>

            {/* Status and Emotion */}
            <div className="flex items-center space-x-4">
              <Badge variant={isListening ? "default" : "secondary"} className="px-4 py-2">
                {isListening ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Dinleniyor...
                  </>
                ) : (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Durduruldu
                  </>
                )}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Duygu:</span>
                {getEmotionIcon()}
                <span className="text-sm font-medium capitalize">{emotion}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Audio Player */}
        <AudioPlayer
          transcript={transcript}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          volume={volume}
          onVolumeChange={setVolume}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="transcript" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Transcript</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="commands" className="flex items-center space-x-2">
              <Command className="w-4 h-4" />
              <span>Commands</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="mt-6">
            {/* Search and Controls */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Metinde ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={clearTranscript}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    Temizle
                  </Button>
                  <Button
                    onClick={downloadTranscript}
                    disabled={!transcript}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Transcript Display */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 min-h-[400px]">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-voice-primary" />
                  Metin Çıktısı
                </h3>
                <div className="min-h-[300px] p-4 bg-background/30 rounded-lg border border-border/30">
                  {transcript ? (
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {highlightText(transcript, searchTerm)}
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-center mt-20">
                      Konuşmaya başlayın, ses tanıma sistemi otomatik olarak metne dönüştürecek...
                    </p>
                  )}
                </div>
                {transcript && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{transcript.length} karakter</span>
                    <span>{transcript.split(' ').filter(word => word.length > 0).length} kelime</span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <TranscriptHistory
              sessions={sessions}
              onLoadSession={loadSession}
              onDeleteSession={deleteSession}
              onToggleStar={toggleStar}
            />
          </TabsContent>

          <TabsContent value="commands" className="mt-6">
            <VoiceCommands
              isListening={isListening}
              onStartListening={startListening}
              onStopListening={stopListening}
              onClearTranscript={clearTranscript}
              onSaveSession={saveSession}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <VoiceAnalytics sessionData={analyticsData} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VoiceSettings
                language={language}
                onLanguageChange={setLanguage}
                sensitivity={sensitivity}
                onSensitivityChange={setSensitivity}
                autoSave={autoSave}
                onAutoSaveChange={setAutoSave}
                noiseReduction={noiseReduction}
                onNoiseReductionChange={setNoiseReduction}
                continuousMode={continuousMode}
                onContinuousModeChange={setContinuousMode}
                confidence={confidence}
                onConfidenceChange={setConfidence}
              />
              
              <ExportManager
                sessions={sessions}
                currentTranscript={transcript}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VoiceRecorder;