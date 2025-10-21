import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeOutput = ({ parameters, activeTab }) => {
  const [copied, setCopied] = useState(false);
  const [cssCode, setCssCode] = useState('');

  useEffect(() => {
    setCssCode(generateCSS());
  }, [parameters, activeTab]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i?.exec(hex);
    return result 
      ? `${parseInt(result?.[1], 16)}, ${parseInt(result?.[2], 16)}, ${parseInt(result?.[3], 16)}`
      : '30, 41, 59';
  };

  const generateCSS = () => {
    const bgRgb = hexToRgb(parameters?.backgroundColor);
    const highlightRgb = hexToRgb(parameters?.highlightColor);

    switch (activeTab) {
      case 'glassmorphism':
        return `.glass-card {
  background: rgba(${bgRgb}, ${parameters?.opacity});
  backdrop-filter: blur(${parameters?.blur}px);
  -webkit-backdrop-filter: blur(${parameters?.blur}px);
  border-radius: ${parameters?.borderRadius}px;
  border: 1px solid rgba(${highlightRgb}, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.3});
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.4});
}

/* Light reflection effect */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(${highlightRgb}, 0.1) 50%, transparent 100%);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.glass-card:hover::before {
  opacity: 1;
}`;

      case 'neumorphism':
        return `.neomorphic-card {
  background: ${parameters?.backgroundColor};
  border-radius: ${parameters?.borderRadius}px;
  box-shadow: 
    ${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 40}px rgba(0, 0, 0, 0.2),
    -${parameters?.shadowIntensity * 20}px -${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 40}px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.neomorphic-card:hover {
  box-shadow: 
    ${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 20}px rgba(0, 0, 0, 0.15),
    -${parameters?.shadowIntensity * 10}px -${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 20}px rgba(255, 255, 255, 0.15);
}

/* Pressed state */
.neomorphic-card:active {
  box-shadow: 
    inset ${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 20}px rgba(0, 0, 0, 0.2),
    inset -${parameters?.shadowIntensity * 10}px -${parameters?.shadowIntensity * 10}px ${parameters?.shadowIntensity * 20}px rgba(255, 255, 255, 0.1);
}`;

      case 'frosted':
        return `.frosted-card {
  background: rgba(${bgRgb}, ${parameters?.opacity * 0.8});
  backdrop-filter: blur(${parameters?.blur * 1.5}px) saturate(1.2);
  -webkit-backdrop-filter: blur(${parameters?.blur * 1.5}px) saturate(1.2);
  border-radius: ${parameters?.borderRadius}px;
  border: 1px solid rgba(${highlightRgb}, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.2}),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.frosted-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.3}),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Frost texture effect */
.frosted-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  border-radius: inherit;
  pointer-events: none;
}`;

      default:
        return '';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-effect.css`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Code" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">CSS Kodu</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            iconName={copied ? "Check" : "Copy"}
            iconPosition="left"
            className={`transition-colors ${
              copied 
                ? 'text-success hover:text-success' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCSS}
            iconName="Download"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            İndir
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative">
        <pre className="bg-black/20 rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground border border-white/10 max-h-96 glass-scrollbar">
          <code className="language-css">
            {cssCode}
          </code>
        </pre>
        
        {/* Language Badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30">
            CSS
          </span>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Kullanım Talimatları</h4>
            <p className="text-xs text-muted-foreground">
              Bu CSS kodunu kopyalayıp projenizde kullanabilirsiniz. 
              Sınıf adını ihtiyacınıza göre değiştirebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-4 flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center space-x-2">
          <Icon name="FileDown" size={16} className="text-accent" />
          <span className="text-sm text-foreground">Dışa Aktarma Seçenekleri</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={downloadCSS}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            CSS Dosyası
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => {
              // PNG export functionality would be implemented here
              console.log('PNG export başlatılıyor...');
            }}
          >
            PNG Görsel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeOutput;