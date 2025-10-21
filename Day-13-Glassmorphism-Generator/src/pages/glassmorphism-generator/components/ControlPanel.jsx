import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ControlPanel = ({ 
  parameters, 
  onParameterChange, 
  onRandomize, 
  onReset, 
  onSavePreset,
  activeTab,
  onTabChange 
}) => {
  const tabs = [
    { id: 'glassmorphism', label: 'Glassmorphism', icon: 'Sparkles' },
    { id: 'neumorphism', label: 'Neumorphism', icon: 'Circle' },
    { id: 'frosted', label: 'Frosted Glass', icon: 'Snowflake' }
  ];

  const handleSliderChange = (property, value) => {
    onParameterChange(property, parseFloat(value));
  };

  const handleColorChange = (property, value) => {
    onParameterChange(property, value);
  };

  return (
    <div className="glass-panel rounded-xl p-6 h-full overflow-y-auto glass-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Kontrol Paneli</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRandomize}
            iconName="Shuffle"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Rastgele
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Sıfırla
          </Button>
        </div>
      </div>
      {/* Effect Style Tabs */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Efekt Stili
        </label>
        <div className="grid grid-cols-1 gap-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary/20 border border-primary/30 text-primary' :'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="text-sm font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Blur Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Bulanıklık: {parameters?.blur}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={parameters?.blur}
            onChange={(e) => handleSliderChange('blur', e?.target?.value)}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0px</span>
            <span>50px</span>
          </div>
        </div>
      </div>
      {/* Opacity Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Opaklık: {(parameters?.opacity * 100)?.toFixed(0)}%
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={parameters?.opacity}
            onChange={(e) => handleSliderChange('opacity', e?.target?.value)}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      {/* Border Radius Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Kenar Yuvarlaklığı: {parameters?.borderRadius}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={parameters?.borderRadius}
            onChange={(e) => handleSliderChange('borderRadius', e?.target?.value)}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0px</span>
            <span>50px</span>
          </div>
        </div>
      </div>
      {/* Shadow Intensity Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Gölge Yoğunluğu: {parameters?.shadowIntensity}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={parameters?.shadowIntensity}
            onChange={(e) => handleSliderChange('shadowIntensity', e?.target?.value)}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Yok</span>
            <span>Maksimum</span>
          </div>
        </div>
      </div>
      {/* Background Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Arkaplan Rengi
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={parameters?.backgroundColor}
            onChange={(e) => handleColorChange('backgroundColor', e?.target?.value)}
            className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-transparent"
          />
          <Input
            type="text"
            value={parameters?.backgroundColor}
            onChange={(e) => handleColorChange('backgroundColor', e?.target?.value)}
            placeholder="#1E293B"
            className="flex-1"
          />
        </div>
      </div>
      {/* Highlight Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Vurgu Rengi
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={parameters?.highlightColor}
            onChange={(e) => handleColorChange('highlightColor', e?.target?.value)}
            className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer bg-transparent"
          />
          <Input
            type="text"
            value={parameters?.highlightColor}
            onChange={(e) => handleColorChange('highlightColor', e?.target?.value)}
            placeholder="#FFFFFF"
            className="flex-1"
          />
        </div>
      </div>
      {/* Save Preset */}
      <div className="pt-4 border-t border-white/10">
        <Button
          variant="outline"
          fullWidth
          onClick={onSavePreset}
          iconName="Save"
          iconPosition="left"
          className="text-foreground border-white/20 hover:bg-white/10"
        >
          Ön Ayarı Kaydet
        </Button>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ControlPanel;