import React, { useState, useCallback, useEffect } from 'react';
import AppHeader from '../../components/ui/AppHeader';
import StatusIndicator from '../../components/ui/StatusIndicator';
import CodeEditor from './components/CodeEditor';
import VisualizationPanel from './components/VisualizationPanel';
import StatusBar from './components/StatusBar';
import AnalysisEngine from './components/AnalysisEngine';

const CodeAnalysisDashboard = () => {
  const [code, setCode] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('idle');

  const { parseCode, validateSyntax } = AnalysisEngine();

  // Load saved code from localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('codeAnalyzer_lastCode');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Save code to localStorage when it changes
  useEffect(() => {
    if (code?.trim()) {
      localStorage.setItem('codeAnalyzer_lastCode', code);
    }
  }, [code]);

  // Debounced syntax validation
  useEffect(() => {
    if (!code?.trim()) {
      setHasError(false);
      setErrorMessage('');
      return;
    }

    const timeoutId = setTimeout(() => {
      const validation = validateSyntax(code);
      setHasError(!validation?.isValid);
      setErrorMessage(validation?.error || '');
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [code, validateSyntax]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!code?.trim()) {
      setStatusType('warning');
      setStatusMessage('Analiz için kod girmeniz gerekiyor');
      return;
    }

    const validation = validateSyntax(code);
    if (!validation?.isValid) {
      setStatusType('error');
      setStatusMessage(`Sözdizimi hatası: ${validation?.error}`);
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setStatusType('analyzing');
    setStatusMessage('Kod yapısı analiz ediliyor...');

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 20;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 200);

      const result = await parseCode(code);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setAnalysisData(result);
        setIsAnalyzing(false);
        setStatusType('success');
        setStatusMessage(`Analiz tamamlandı! ${result?.stats?.totalNodes} düğüm bulundu`);
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setStatusType('idle');
        }, 3000);
      }, 500);

    } catch (error) {
      setIsAnalyzing(false);
      setProgress(0);
      setStatusType('error');
      setStatusMessage(`Analiz hatası: ${error?.message}`);
      console.error('Analysis error:', error);
    }
  }, [code, parseCode, validateSyntax]);

  const handleClear = useCallback(() => {
    setCode('');
    setAnalysisData(null);
    setHasError(false);
    setErrorMessage('');
    setProgress(0);
    setStatusType('idle');
    localStorage.removeItem('codeAnalyzer_lastCode');
  }, []);

  const handleLoadDemo = useCallback(() => {
    setStatusType('success');
    setStatusMessage('Demo kod yüklendi');
    setTimeout(() => setStatusType('idle'), 2000);
  }, []);

  const handleExport = useCallback((exportData) => {
    const { format, data } = exportData;
    
    try {
      let content, filename, mimeType;
      
      switch (format) {
        case 'json':
          content = JSON.stringify(data, null, 2);
          filename = `kod-analizi-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'svg':
          // For SVG export, we'd need to serialize the SVG element
          content = '<svg>&lt;!-- SVG content would be here --&gt;</svg>';
          filename = `kod-haritasi-${new Date()?.toISOString()?.split('T')?.[0]}.svg`;
          mimeType = 'image/svg+xml';
          break;
        default:
          throw new Error('Desteklenmeyen format');
      }
      
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
      
      setStatusType('success');
      setStatusMessage(`${format?.toUpperCase()} formatında dışa aktarıldı`);
      setTimeout(() => setStatusType('idle'), 3000);
      
    } catch (error) {
      setStatusType('error');
      setStatusMessage(`Dışa aktarma hatası: ${error?.message}`);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAnalysisData(null);
    setProgress(0);
    setStatusType('idle');
  }, []);

  const handleDismissStatus = useCallback(() => {
    setStatusType('idle');
  }, []);

  // Calculate line count for status bar
  const lineCount = code?.split('\n')?.length;

  return (
    <div className="min-h-screen bg-background">
      {/* App Header */}
      <AppHeader 
        analysisState={{
          hasResults: !!analysisData,
          hasCode: !!code?.trim(),
          isAnalyzing
        }}
        onExport={handleExport}
      />
      {/* Status Indicator */}
      <StatusIndicator
        status={statusType}
        message={statusMessage}
        progress={progress}
        onDismiss={handleDismissStatus}
      />
      {/* Main Content */}
      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Code Editor */}
          <div className="w-1/2 p-4 border-r border-border">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              onLoadDemo={handleLoadDemo}
              isAnalyzing={isAnalyzing}
              hasError={hasError}
              errorMessage={errorMessage}
            />
          </div>

          {/* Right Panel - Visualization */}
          <div className="w-1/2 p-4">
            <VisualizationPanel
              analysisData={analysisData}
              isAnalyzing={isAnalyzing}
              onExport={handleExport}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar
          analysisStats={analysisData?.stats}
          isAnalyzing={isAnalyzing}
          progress={progress}
          errorMessage={errorMessage}
          hasError={hasError}
          codeLength={code?.length}
          lineCount={lineCount}
        />
      </div>
    </div>
  );
};

export default CodeAnalysisDashboard;