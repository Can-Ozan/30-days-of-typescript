import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Languages, Mic, Volume2, Shield, Zap } from 'lucide-react';

interface VoiceSettingsProps {
  language: string;
  onLanguageChange: (language: string) => void;
  sensitivity: number;
  onSensitivityChange: (sensitivity: number) => void;
  autoSave: boolean;
  onAutoSaveChange: (autoSave: boolean) => void;
  noiseReduction: boolean;
  onNoiseReductionChange: (noiseReduction: boolean) => void;
  continuousMode: boolean;
  onContinuousModeChange: (continuousMode: boolean) => void;
  confidence: number;
  onConfidenceChange: (confidence: number) => void;
}

const languages = [
  { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
];

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  language,
  onLanguageChange,
  sensitivity,
  onSensitivityChange,
  autoSave,
  onAutoSaveChange,
  noiseReduction,
  onNoiseReductionChange,
  continuousMode,
  onContinuousModeChange,
  confidence,
  onConfidenceChange
}) => {
  const selectedLanguage = languages.find(lang => lang.code === language);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-voice-primary" />
          <h3 className="text-lg font-semibold">Voice Recognition Settings</h3>
          <Badge variant="outline" className="ml-auto">Advanced</Badge>
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-voice-secondary" />
            <Label className="text-sm font-medium">Recognition Language</Label>
          </div>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue>
                {selectedLanguage && (
                  <div className="flex items-center space-x-2">
                    <span>{selectedLanguage.flag}</span>
                    <span>{selectedLanguage.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Microphone Sensitivity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-voice-secondary" />
              <Label className="text-sm font-medium">Microphone Sensitivity</Label>
            </div>
            <Badge variant="outline" className="text-xs">{sensitivity}%</Badge>
          </div>
          <Slider
            value={[sensitivity]}
            onValueChange={(value) => onSensitivityChange(value[0])}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-voice-secondary" />
              <Label className="text-sm font-medium">Confidence Threshold</Label>
            </div>
            <Badge variant="outline" className="text-xs">{confidence}%</Badge>
          </div>
          <Slider
            value={[confidence]}
            onValueChange={(value) => onConfidenceChange(value[0])}
            max={100}
            min={50}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Higher values filter out uncertain recognitions
          </p>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-voice-secondary" />
              <Label htmlFor="auto-save" className="text-sm font-medium">Auto-save sessions</Label>
            </div>
            <Switch
              id="auto-save"
              checked={autoSave}
              onCheckedChange={onAutoSaveChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-voice-secondary" />
              <Label htmlFor="noise-reduction" className="text-sm font-medium">Noise reduction</Label>
            </div>
            <Switch
              id="noise-reduction"
              checked={noiseReduction}
              onCheckedChange={onNoiseReductionChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-voice-secondary" />
              <Label htmlFor="continuous-mode" className="text-sm font-medium">Continuous recognition</Label>
            </div>
            <Switch
              id="continuous-mode"
              checked={continuousMode}
              onCheckedChange={onContinuousModeChange}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border/30">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Test Microphone
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Calibrate Voice
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoiceSettings;