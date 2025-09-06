import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Image, Database, Share, Cloud, Mail } from 'lucide-react';

interface TranscriptSession {
  id: string;
  text: string;
  timestamp: Date;
  duration: number;
  wordCount: number;
  starred: boolean;
  language?: string;
  confidence?: number;
}

interface ExportManagerProps {
  sessions: TranscriptSession[];
  currentTranscript: string;
}

const exportFormats = [
  { id: 'txt', name: 'Plain Text (.txt)', icon: FileText },
  { id: 'json', name: 'JSON Data (.json)', icon: Database },
  { id: 'csv', name: 'CSV Spreadsheet (.csv)', icon: Database },
  { id: 'pdf', name: 'PDF Document (.pdf)', icon: FileText },
  { id: 'docx', name: 'Word Document (.docx)', icon: FileText },
  { id: 'html', name: 'HTML Page (.html)', icon: Image },
];

const ExportManager: React.FC<ExportManagerProps> = ({ sessions, currentTranscript }) => {
  const [selectedFormat, setSelectedFormat] = useState('txt');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeStatistics, setIncludeStatistics] = useState(false);
  const [exportType, setExportType] = useState<'current' | 'selected' | 'all'>('current');

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const selectAllSessions = () => {
    setSelectedSessions(sessions.map(s => s.id));
  };

  const clearSelection = () => {
    setSelectedSessions([]);
  };

  const generateFileName = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const typeStr = exportType === 'current' ? 'current' : 
                   exportType === 'selected' ? 'selected' : 'all';
    return `voice-transcript-${typeStr}-${dateStr}`;
  };

  const exportAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      ).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const prepareExportData = () => {
    let sessionsToExport: TranscriptSession[] = [];
    
    switch (exportType) {
      case 'current':
        if (currentTranscript) {
          sessionsToExport = [{
            id: 'current',
            text: currentTranscript,
            timestamp: new Date(),
            duration: 0,
            wordCount: currentTranscript.split(' ').length,
            starred: false
          }];
        }
        break;
      case 'selected':
        sessionsToExport = sessions.filter(s => selectedSessions.includes(s.id));
        break;
      case 'all':
        sessionsToExport = sessions;
        break;
    }

    return sessionsToExport;
  };

  const handleExport = () => {
    const data = prepareExportData();
    const filename = generateFileName();

    switch (selectedFormat) {
      case 'txt':
        const textContent = data.map(session => {
          let content = session.text;
          if (includeMetadata) {
            content = `Session: ${session.id}\nDate: ${session.timestamp.toLocaleString()}\nDuration: ${session.duration}s\nWord Count: ${session.wordCount}\n\n${content}`;
          }
          return content;
        }).join('\n\n---\n\n');
        exportAsText(textContent, filename);
        break;

      case 'json':
        const jsonData = {
          exportDate: new Date().toISOString(),
          exportType,
          includeMetadata,
          includeTimestamps,
          sessions: data.map(session => ({
            id: session.id,
            text: session.text,
            ...(includeTimestamps && { timestamp: session.timestamp }),
            ...(includeMetadata && {
              duration: session.duration,
              wordCount: session.wordCount,
              starred: session.starred,
              language: session.language,
              confidence: session.confidence
            })
          })),
          ...(includeStatistics && {
            statistics: {
              totalSessions: data.length,
              totalWords: data.reduce((sum, s) => sum + s.wordCount, 0),
              totalDuration: data.reduce((sum, s) => sum + s.duration, 0),
              averageSessionLength: data.reduce((sum, s) => sum + s.wordCount, 0) / data.length
            }
          })
        };
        exportAsJSON(jsonData, filename);
        break;

      case 'csv':
        const csvData = data.map(session => ({
          ID: session.id,
          Text: session.text.replace(/\n/g, ' '),
          Timestamp: includeTimestamps ? session.timestamp.toISOString() : '',
          Duration: includeMetadata ? session.duration : '',
          WordCount: includeMetadata ? session.wordCount : '',
          Starred: includeMetadata ? session.starred : '',
          Language: includeMetadata ? session.language || '' : '',
          Confidence: includeMetadata ? session.confidence || '' : ''
        }));
        exportAsCSV(csvData, filename);
        break;

      default:
        // For other formats (PDF, DOCX, HTML), we'll use text format for now
        const fallbackContent = data.map(s => s.text).join('\n\n');
        exportAsText(fallbackContent, filename);
    }
  };

  const shareToClipboard = async () => {
    const data = prepareExportData();
    const content = data.map(s => s.text).join('\n\n');
    
    try {
      await navigator.clipboard.writeText(content);
      // You might want to show a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-voice-primary" />
            <h3 className="text-lg font-semibold">Export Manager</h3>
          </div>
          <Badge variant="outline">
            {exportType === 'current' ? '1 session' : 
             exportType === 'selected' ? `${selectedSessions.length} selected` :
             `${sessions.length} sessions`}
          </Badge>
        </div>

        {/* Export Type Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">What to export</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'current', label: 'Current Transcript', disabled: !currentTranscript },
              { value: 'selected', label: 'Selected Sessions' },
              { value: 'all', label: 'All Sessions' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={exportType === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setExportType(option.value as any)}
                disabled={option.disabled}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Session Selection (only when 'selected' is chosen) */}
        {exportType === 'selected' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Select sessions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllSessions}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={session.id}
                    checked={selectedSessions.includes(session.id)}
                    onCheckedChange={() => handleSessionToggle(session.id)}
                  />
                  <Label htmlFor={session.id} className="flex-1 text-sm cursor-pointer">
                    <div className="flex justify-between">
                      <span>{session.timestamp.toLocaleDateString()}</span>
                      <span className="text-muted-foreground">{session.wordCount} words</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Export format</Label>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {exportFormats.map((format) => (
                <SelectItem key={format.id} value={format.id}>
                  <div className="flex items-center space-x-2">
                    <format.icon className="w-4 h-4" />
                    <span>{format.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Include in export</Label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="metadata"
                checked={includeMetadata}
                onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
              />
              <Label htmlFor="metadata" className="text-sm">
                Session metadata (duration, word count, etc.)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="timestamps"
                checked={includeTimestamps}
                onCheckedChange={(checked) => setIncludeTimestamps(checked === true)}
              />
              <Label htmlFor="timestamps" className="text-sm">
                Timestamps and dates
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="statistics"
                checked={includeStatistics}
                onCheckedChange={(checked) => setIncludeStatistics(checked === true)}
              />
              <Label htmlFor="statistics" className="text-sm">
                Summary statistics (JSON format only)
              </Label>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-3 pt-4 border-t border-border/30">
          <Button 
            onClick={handleExport}
            className="flex-1"
            disabled={exportType === 'selected' && selectedSessions.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" onClick={shareToClipboard}>
            <Share className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExportManager;