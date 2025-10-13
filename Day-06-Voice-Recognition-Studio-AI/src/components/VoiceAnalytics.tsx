import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Clock, Target, Zap, Brain, Volume2, Mic } from 'lucide-react';

interface VoiceAnalyticsProps {
  sessionData: {
    totalSessions: number;
    totalDuration: number;
    totalWords: number;
    averageWPM: number;
    accuracyRate: number;
    confidenceScore: number;
    emotionDistribution: { emotion: string; count: number; color: string }[];
    languageUsage: { language: string; sessions: number }[];
    dailyUsage: { day: string; sessions: number; duration: number }[];
    speechPatterns: {
      pauseFrequency: number;
      averageSentenceLength: number;
      vocabularyRichness: number;
      speechClarity: number;
    };
  };
}

const VoiceAnalytics: React.FC<VoiceAnalyticsProps> = ({ sessionData }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-voice-success' };
    if (score >= 75) return { level: 'Good', color: 'text-voice-primary' };
    if (score >= 60) return { level: 'Average', color: 'text-voice-warning' };
    return { level: 'Needs Improvement', color: 'text-destructive' };
  };

  const accuracyLevel = getPerformanceLevel(sessionData.accuracyRate);
  const confidenceLevel = getPerformanceLevel(sessionData.confidenceScore);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-voice-primary/20 rounded-lg">
              <Mic className="w-4 h-4 text-voice-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
              <p className="text-xl font-bold">{sessionData.totalSessions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-voice-secondary/20 rounded-lg">
              <Clock className="w-4 h-4 text-voice-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Duration</p>
              <p className="text-xl font-bold">{formatDuration(sessionData.totalDuration)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-voice-accent/20 rounded-lg">
              <Zap className="w-4 h-4 text-voice-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Words Spoken</p>
              <p className="text-xl font-bold">{sessionData.totalWords.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-voice-success/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-voice-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg WPM</p>
              <p className="text-xl font-bold">{sessionData.averageWPM}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-voice-primary" />
            Recognition Performance
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Accuracy Rate</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={accuracyLevel.color}>
                    {accuracyLevel.level}
                  </Badge>
                  <span className="text-sm font-bold">{sessionData.accuracyRate}%</span>
                </div>
              </div>
              <Progress value={sessionData.accuracyRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Confidence Score</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={confidenceLevel.color}>
                    {confidenceLevel.level}
                  </Badge>
                  <span className="text-sm font-bold">{sessionData.confidenceScore}%</span>
                </div>
              </div>
              <Progress value={sessionData.confidenceScore} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Speech Clarity</span>
                <span className="text-sm font-bold">{sessionData.speechPatterns.speechClarity}%</span>
              </div>
              <Progress value={sessionData.speechPatterns.speechClarity} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Vocabulary Richness</span>
                <span className="text-sm font-bold">{sessionData.speechPatterns.vocabularyRichness}%</span>
              </div>
              <Progress value={sessionData.speechPatterns.vocabularyRichness} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-voice-primary" />
            Emotion Distribution
          </h3>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionData.emotionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {sessionData.emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sessionData.emotionDistribution.map((emotion, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: emotion.color }}
                />
                <span className="text-xs capitalize">{emotion.emotion}</span>
                <span className="text-xs text-muted-foreground ml-auto">{emotion.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Usage Patterns */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Volume2 className="w-5 h-5 mr-2 text-voice-primary" />
          Usage Patterns
        </h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sessionData.dailyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Bar 
                dataKey="sessions" 
                fill="hsl(var(--voice-primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Speech Patterns */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-voice-primary" />
          Speech Pattern Analysis
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-voice-primary">
              {sessionData.speechPatterns.averageSentenceLength}
            </p>
            <p className="text-xs text-muted-foreground">Avg Sentence Length</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-voice-secondary">
              {sessionData.speechPatterns.pauseFrequency}
            </p>
            <p className="text-xs text-muted-foreground">Pauses per Minute</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-voice-accent">
              {sessionData.averageWPM}
            </p>
            <p className="text-xs text-muted-foreground">Words per Minute</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-voice-success">
              {sessionData.speechPatterns.speechClarity}%
            </p>
            <p className="text-xs text-muted-foreground">Speech Clarity</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceAnalytics;