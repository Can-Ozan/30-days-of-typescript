import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBar = ({ 
  analysisStats = null, 
  isAnalyzing = false, 
  progress = 0,
  errorMessage = '',
  hasError = false,
  codeLength = 0,
  lineCount = 0
}) => {
  const mockStats = {
    totalNodes: 13,
    functions: 4,
    variables: 3,
    loops: 1,
    conditionals: 4,
    classes: 1,
    complexity: 22,
    linesOfCode: 45,
    parseTime: 156
  };

  const currentStats = analysisStats || mockStats;

  const getComplexityLevel = (complexity) => {
    if (complexity <= 10) return { level: 'Düşük', color: 'text-success' };
    if (complexity <= 20) return { level: 'Orta', color: 'text-warning' };
    return { level: 'Yüksek', color: 'text-error' };
  };

  const complexityInfo = getComplexityLevel(currentStats?.complexity);

  return (
    <div className="h-12 bg-surface border-t border-border flex items-center justify-between px-6">
      {/* Left Section - Analysis Status */}
      <div className="flex items-center space-x-6">
        {isAnalyzing ? (
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={16} color="var(--color-primary)" className="animate-spin" />
            <span className="text-sm text-foreground">Analiz ediliyor...</span>
            {progress > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
              </div>
            )}
          </div>
        ) : hasError ? (
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-sm text-error">{errorMessage || 'Analiz hatası'}</span>
          </div>
        ) : analysisStats ? (
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm text-success">
              Analiz tamamlandı ({currentStats?.parseTime}ms)
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Icon name="Code2" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Analiz için hazır</span>
          </div>
        )}
      </div>
      {/* Center Section - Code Stats */}
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="FileText" size={14} />
          <span>{lineCount} satır</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="Type" size={14} />
          <span>{codeLength} karakter</span>
        </div>
        
        {analysisStats && (
          <>
            <div className="w-px h-4 bg-border" />
            
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} />
              <span>{currentStats?.functions} fonksiyon</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={14} />
              <span>{currentStats?.variables} değişken</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="RotateCw" size={14} />
              <span>{currentStats?.loops} döngü</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="GitBranch" size={14} />
              <span>{currentStats?.conditionals} koşul</span>
            </div>
          </>
        )}
      </div>
      {/* Right Section - Complexity & Language */}
      <div className="flex items-center space-x-6">
        {analysisStats && (
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color={complexityInfo?.color?.replace('text-', 'var(--color-')} />
            <span className="text-sm text-muted-foreground">Karmaşıklık:</span>
            <span className={`text-sm font-medium ${complexityInfo?.color}`}>
              {currentStats?.complexity} ({complexityInfo?.level})
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-sm text-muted-foreground">JavaScript/TypeScript</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;