import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, Play, Pause, Square, Save, Trash2, Settings, Plus } from 'lucide-react';

interface VoiceCommand {
  id: string;
  trigger: string;
  action: string;
  description: string;
  enabled: boolean;
}

interface VoiceCommandsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onClearTranscript: () => void;
  onSaveSession: () => void;
}

const defaultCommands: VoiceCommand[] = [
  { id: '1', trigger: 'start recording', action: 'start', description: 'Begin voice recognition', enabled: true },
  { id: '2', trigger: 'stop recording', action: 'stop', description: 'End voice recognition', enabled: true },
  { id: '3', trigger: 'clear text', action: 'clear', description: 'Clear current transcript', enabled: true },
  { id: '4', trigger: 'save session', action: 'save', description: 'Save current session', enabled: true },
  { id: '5', trigger: 'new paragraph', action: 'newline', description: 'Add line break', enabled: true },
  { id: '6', trigger: 'delete last word', action: 'deleteWord', description: 'Remove last word', enabled: true },
  { id: '7', trigger: 'undo', action: 'undo', description: 'Undo last action', enabled: true },
  { id: '8', trigger: 'repeat', action: 'repeat', description: 'Repeat last phrase', enabled: false },
];

const VoiceCommands: React.FC<VoiceCommandsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  onClearTranscript,
  onSaveSession
}) => {
  const [commands, setCommands] = useState<VoiceCommand[]>(defaultCommands);
  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCommand = (action: string) => {
    switch (action) {
      case 'start':
        onStartListening();
        break;
      case 'stop':
        onStopListening();
        break;
      case 'clear':
        onClearTranscript();
        break;
      case 'save':
        onSaveSession();
        break;
      case 'newline':
        // This would be handled in the parent component
        break;
      case 'deleteWord':
        // This would be handled in the parent component
        break;
      case 'undo':
        // This would be handled in the parent component
        break;
    }
  };

  const toggleCommand = (id: string) => {
    setCommands(prev => 
      prev.map(cmd => 
        cmd.id === id ? { ...cmd, enabled: !cmd.enabled } : cmd
      )
    );
  };

  const addCommand = () => {
    if (newTrigger && newAction) {
      const newCommand: VoiceCommand = {
        id: Date.now().toString(),
        trigger: newTrigger.toLowerCase(),
        action: newAction,
        description: `Custom command: ${newAction}`,
        enabled: true
      };
      setCommands(prev => [...prev, newCommand]);
      setNewTrigger('');
      setNewAction('');
      setShowAddForm(false);
    }
  };

  const removeCommand = (id: string) => {
    setCommands(prev => prev.filter(cmd => cmd.id !== id));
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Command className="w-5 h-5 text-voice-primary" />
            <h3 className="text-lg font-semibold">Voice Commands</h3>
            <Badge variant="outline">
              {commands.filter(cmd => cmd.enabled).length} Active
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Command
          </Button>
        </div>

        {/* Add New Command Form */}
        {showAddForm && (
          <Card className="p-4 bg-background/30 border-border/30">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Voice trigger (e.g., 'start recording')"
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                />
                <Input
                  placeholder="Action name"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addCommand} size="sm">Add Command</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Commands List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {commands.map((command) => (
            <div
              key={command.id}
              className={`p-4 rounded-lg border transition-all ${
                command.enabled 
                  ? 'bg-background/30 border-voice-primary/30' 
                  : 'bg-background/10 border-border/20 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge 
                      variant={command.enabled ? "default" : "secondary"}
                      className="text-xs"
                    >
                      "{command.trigger}"
                    </Badge>
                    <span className="text-sm text-muted-foreground">→</span>
                    <span className="text-sm font-medium">{command.action}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{command.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCommand(command.id)}
                    className="text-xs"
                  >
                    {command.enabled ? 'Disable' : 'Enable'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCommand(command.action)}
                    disabled={!command.enabled}
                    className="text-xs"
                  >
                    {command.action === 'start' && <Play className="w-3 h-3" />}
                    {command.action === 'stop' && <Square className="w-3 h-3" />}
                    {command.action === 'clear' && <Trash2 className="w-3 h-3" />}
                    {command.action === 'save' && <Save className="w-3 h-3" />}
                    {!['start', 'stop', 'clear', 'save'].includes(command.action) && 
                      <Settings className="w-3 h-3" />
                    }
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCommand(command.id)}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Help */}
        <Card className="p-4 bg-voice-primary/5 border-voice-primary/20">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Command className="w-4 h-4 mr-2" />
            How to use voice commands
          </h4>
          <p className="text-xs text-muted-foreground">
            Say the trigger phrase while recording to execute commands. 
            Commands are processed in real-time during voice recognition.
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default VoiceCommands;