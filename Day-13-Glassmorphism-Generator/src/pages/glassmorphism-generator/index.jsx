import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ControlPanel from './components/ControlPanel';
import PreviewPanel from './components/PreviewPanel';
import CodeOutput from './components/CodeOutput';
import PresetManager from './components/PresetManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GlassmorphismGenerator = () => {
  const [parameters, setParameters] = useState({
    blur: 16,
    opacity: 0.25,
    borderRadius: 16,
    shadowIntensity: 0.3,
    backgroundColor: '#1E293B',
    highlightColor: '#FFFFFF'
  });

  const [activeTab, setActiveTab] = useState('glassmorphism');
  const [showPresets, setShowPresets] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleParameterChange = (property, value) => {
    setParameters(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleRandomize = () => {
    const randomParameters = {
      blur: Math.floor(Math.random() * 50) + 1,
      opacity: Math.round((Math.random() * 0.8 + 0.1) * 100) / 100,
      borderRadius: Math.floor(Math.random() * 50),
      shadowIntensity: Math.round((Math.random() * 1) * 10) / 10,
      backgroundColor: `#${Math.floor(Math.random()*16777215)?.toString(16)?.padStart(6, '0')}`,
      highlightColor: `#${Math.floor(Math.random()*16777215)?.toString(16)?.padStart(6, '0')}`
    };
    setParameters(randomParameters);
  };

  const handleReset = () => {
    setParameters({
      blur: 16,
      opacity: 0.25,
      borderRadius: 16,
      shadowIntensity: 0.3,
      backgroundColor: '#1E293B',
      highlightColor: '#FFFFFF'
    });
    setActiveTab('glassmorphism');
  };

  const handleSavePreset = () => {
    setShowPresets(true);
  };

  const handleLoadPreset = (presetParameters) => {
    setParameters(presetParameters);
  };

  return (
    <>
      <Helmet>
        <title>Glassmorphism Generator - Modern Cam Efektleri Oluşturun</title>
        <meta 
          name="description" 
          content="Gerçek zamanlı önizleme ile modern glassmorphism efektleri oluşturun. CSS kodunu anında kopyalayın ve projelerinizde kullanın." 
        />
        <meta name="keywords" content="glassmorphism, css generator, cam efekti, ui design, frontend tools" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
                  <Icon name="Sparkles" size={32} className="text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                  Glassmorphism Generator
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Modern cam efektleri oluşturun, gerçek zamanlı önizleme yapın ve CSS kodunu anında kopyalayın.
                Tasarımlarınızı bir sonraki seviyeye taşıyın.
              </p>
            </div>

            {/* Mobile Layout Toggle */}
            {isMobile && (
              <div className="flex justify-center mb-6">
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                  <Button
                    variant={showPresets ? "ghost" : "default"}
                    size="sm"
                    onClick={() => setShowPresets(false)}
                    className="text-xs"
                  >
                    Düzenle
                  </Button>
                  <Button
                    variant={showPresets ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setShowPresets(true)}
                    className="text-xs"
                  >
                    Ön Ayarlar
                  </Button>
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Left Panel - Controls */}
              <div className={`lg:col-span-3 ${isMobile && showPresets ? 'hidden' : ''}`}>
                <ControlPanel
                  parameters={parameters}
                  onParameterChange={handleParameterChange}
                  onRandomize={handleRandomize}
                  onReset={handleReset}
                  onSavePreset={handleSavePreset}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>

              {/* Center Panel - Preview */}
              <div className={`lg:col-span-6 ${isMobile && showPresets ? 'hidden' : ''}`}>
                <PreviewPanel
                  parameters={parameters}
                  activeTab={activeTab}
                />
              </div>

              {/* Right Panel - Presets (Desktop) / Mobile Toggle */}
              <div className={`lg:col-span-3 ${isMobile && !showPresets ? 'hidden' : ''}`}>
                <PresetManager
                  parameters={parameters}
                  onLoadPreset={handleLoadPreset}
                  onSavePreset={handleSavePreset}
                />
              </div>
            </div>

            {/* Bottom Panel - Code Output */}
            <div className={`${isMobile && showPresets ? 'hidden' : ''}`}>
              <CodeOutput
                parameters={parameters}
                activeTab={activeTab}
              />
            </div>

            {/* Quick Actions Bar */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
              <div className="flex items-center space-x-2 px-4 py-2 glass-panel rounded-full border border-white/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRandomize}
                  iconName="Shuffle"
                  className="text-primary hover:text-primary/80"
                >
                  {!isMobile && "Rastgele"}
                </Button>
                <div className="w-px h-6 bg-white/20"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  iconName="RotateCcw"
                  className="text-warning hover:text-warning/80"
                >
                  {!isMobile && "Sıfırla"}
                </Button>
                <div className="w-px h-6 bg-white/20"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(document.querySelector('pre code')?.textContent);
                  }}
                  iconName="Copy"
                  className="text-success hover:text-success/80"
                >
                  {!isMobile && "Kopyala"}
                </Button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Gerçek Zamanlı</h3>
                <p className="text-sm text-muted-foreground">
                  Değişikliklerinizi anında görün ve efektleri canlı olarak test edin.
                </p>
              </div>

              <div className="glass-panel rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Code" size={24} className="text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Hazır CSS</h3>
                <p className="text-sm text-muted-foreground">
                  Üretilen CSS kodunu tek tıkla kopyalayın ve projelerinizde kullanın.
                </p>
              </div>

              <div className="glass-panel rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Bookmark" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ön Ayarlar</h3>
                <p className="text-sm text-muted-foreground">
                  Favori ayarlarınızı kaydedin ve daha sonra tekrar kullanın.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GlassmorphismGenerator;