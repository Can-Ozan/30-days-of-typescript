import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PresetManager = ({ parameters, onLoadPreset, onSavePreset }) => {
  const [presets, setPresets] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');

  // Default presets
  const defaultPresets = [
    {
      id: 'modern-glass',
      name: 'Modern Cam',
      parameters: {
        blur: 16,
        opacity: 0.25,
        borderRadius: 16,
        shadowIntensity: 0.3,
        backgroundColor: '#1E293B',
        highlightColor: '#FFFFFF'
      },
      createdAt: new Date()?.toISOString()
    },
    {
      id: 'subtle-frost',
      name: 'Hafif Buzlu',
      parameters: {
        blur: 8,
        opacity: 0.15,
        borderRadius: 12,
        shadowIntensity: 0.2,
        backgroundColor: '#334155',
        highlightColor: '#F8FAFC'
      },
      createdAt: new Date()?.toISOString()
    },
    {
      id: 'vibrant-glow',
      name: 'Canlı Işıltı',
      parameters: {
        blur: 24,
        opacity: 0.35,
        borderRadius: 20,
        shadowIntensity: 0.5,
        backgroundColor: '#3B82F6',
        highlightColor: '#FFFFFF'
      },
      createdAt: new Date()?.toISOString()
    }
  ];

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = () => {
    try {
      const savedPresets = localStorage.getItem('glassmorphism-presets');
      if (savedPresets) {
        setPresets(JSON.parse(savedPresets));
      } else {
        setPresets(defaultPresets);
        localStorage.setItem('glassmorphism-presets', JSON.stringify(defaultPresets));
      }
    } catch (error) {
      console.error('Ön ayarlar yüklenemedi:', error);
      setPresets(defaultPresets);
    }
  };

  const savePreset = () => {
    if (!presetName?.trim()) return;

    const newPreset = {
      id: Date.now()?.toString(),
      name: presetName?.trim(),
      parameters: { ...parameters },
      createdAt: new Date()?.toISOString()
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('glassmorphism-presets', JSON.stringify(updatedPresets));
    
    setPresetName('');
    setShowSaveDialog(false);
    
    if (onSavePreset) {
      onSavePreset(newPreset);
    }
  };

  const loadPreset = (preset) => {
    if (onLoadPreset) {
      onLoadPreset(preset?.parameters);
    }
  };

  const deletePreset = (presetId) => {
    const updatedPresets = presets?.filter(p => p?.id !== presetId);
    setPresets(updatedPresets);
    localStorage.setItem('glassmorphism-presets', JSON.stringify(updatedPresets));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Bookmark" size={20} className="text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Ön Ayarlar</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          iconPosition="left"
          className="text-foreground border-white/20 hover:bg-white/10"
        >
          Yeni Kaydet
        </Button>
      </div>
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-medium text-foreground mb-3">Yeni Ön Ayar Kaydet</h4>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Ön ayar adı girin..."
              value={presetName}
              onChange={(e) => setPresetName(e?.target?.value)}
              className="flex-1"
              onKeyPress={(e) => e?.key === 'Enter' && savePreset()}
            />
            <Button
              variant="default"
              size="sm"
              onClick={savePreset}
              disabled={!presetName?.trim()}
              iconName="Save"
            >
              Kaydet
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName('');
              }}
              iconName="X"
            >
              İptal
            </Button>
          </div>
        </div>
      )}
      {/* Presets List */}
      <div className="space-y-3 max-h-96 overflow-y-auto glass-scrollbar">
        {presets?.map((preset) => (
          <div
            key={preset?.id}
            className="group p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {preset?.name}
                </h4>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Bulanıklık: {preset?.parameters?.blur}px</span>
                  <span>Opaklık: {Math.round(preset?.parameters?.opacity * 100)}%</span>
                  <span>{formatDate(preset?.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => loadPreset(preset)}
                  iconName="Play"
                  className="text-primary hover:text-primary/80"
                >
                  Yükle
                </Button>
                {!defaultPresets?.find(dp => dp?.id === preset?.id) && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => deletePreset(preset?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error/80"
                  >
                    Sil
                  </Button>
                )}
              </div>
            </div>

            {/* Preview Colors */}
            <div className="flex items-center space-x-2 mt-3">
              <div
                className="w-4 h-4 rounded border border-white/20"
                style={{ backgroundColor: preset?.parameters?.backgroundColor }}
              ></div>
              <div
                className="w-4 h-4 rounded border border-white/20"
                style={{ backgroundColor: preset?.parameters?.highlightColor }}
              ></div>
              <span className="text-xs text-muted-foreground">
                Renk Paleti
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {presets?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-sm">
            Henüz kaydedilmiş ön ayar bulunmuyor.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            className="mt-2 text-primary hover:text-primary/80"
          >
            İlk ön ayarınızı oluşturun
          </Button>
        </div>
      )}
    </div>
  );
};

export default PresetManager;