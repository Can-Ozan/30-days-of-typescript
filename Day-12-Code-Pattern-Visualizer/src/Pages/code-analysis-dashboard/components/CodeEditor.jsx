import React, { useState, useCallback, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeEditor = ({ 
  code, 
  onChange, 
  onAnalyze, 
  onClear, 
  onLoadDemo, 
  isAnalyzing = false,
  hasError = false,
  errorMessage = ''
}) => {
  const textareaRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  // Demo code for initial load
  const demoCode = `// TypeScript Fonksiyon Örneği
function calculateTotal(items: Item[]): number {
  let total = 0;
  
  for (const item of items) {
    if (item.isActive && item.price > 0) {
      total += item.price * item.quantity;
      
      // İndirim hesaplama
      if (item.discount > 0) {
        const discountAmount = total * (item.discount / 100);
        total -= discountAmount;
      }
    }
  }
  
  return Math.round(total * 100) / 100;
}

// Sınıf tanımı
class ShoppingCart {
  private items: Item[] = [];
  
  constructor(private userId: string) {}
  
  addItem(item: Item): void {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }
  
  getTotal(): number {
    return calculateTotal(this.items);
  }
}`;

  // Update line count when code changes
  useEffect(() => {
    const lines = code?.split('\n')?.length;
    setLineCount(lines);
  }, [code]);

  const handleCodeChange = useCallback((e) => {
    onChange(e?.target?.value);
  }, [onChange]);

  const handleLoadDemo = useCallback(() => {
    onChange(demoCode);
    onLoadDemo();
  }, [onChange, onLoadDemo]);

  const handleKeyDown = useCallback((e) => {
    // Ctrl+Enter to analyze
    if (e?.ctrlKey && e?.key === 'Enter') {
      e?.preventDefault();
      onAnalyze();
    }
    
    // Ctrl+K to clear
    if (e?.ctrlKey && e?.key === 'k') {
      e?.preventDefault();
      onClear();
    }

    // Tab handling for better code editing
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const start = e?.target?.selectionStart;
      const end = e?.target?.selectionEnd;
      const value = e?.target?.value;
      
      onChange(value?.substring(0, start) + '  ' + value?.substring(end));
      
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  }, [onAnalyze, onClear, onChange]);

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <Icon name="Code2" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="font-medium text-foreground">Kod Editörü</h3>
            <p className="text-xs text-muted-foreground">
              JavaScript/TypeScript kodunuzu buraya yapıştırın
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={handleLoadDemo}
            disabled={isAnalyzing}
          >
            Demo Yükle
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={onClear}
            disabled={isAnalyzing || !code?.trim()}
          >
            Temizle
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={onAnalyze}
            disabled={isAnalyzing || !code?.trim()}
            loading={isAnalyzing}
          >
            Analiz Et
          </Button>
        </div>
      </div>
      {/* Editor Content */}
      <div className="flex-1 flex relative">
        {/* Line Numbers */}
        <div className="w-12 bg-muted/30 border-r border-border flex-shrink-0">
          <div className="p-2 text-xs text-muted-foreground font-mono leading-6">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="text-right pr-2">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Code Input Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            placeholder="// Kodunuzu buraya yapıştırın veya yazın...
function example() {
  console.log('Merhaba Dünya!');
}"
            className={`
              w-full h-full p-4 bg-transparent text-foreground font-mono text-sm
              resize-none outline-none leading-6
              placeholder:text-muted-foreground
              ${hasError ? 'border-l-2 border-l-error' : ''}
            `}
            spellCheck={false}
            disabled={isAnalyzing}
          />
          
          {/* Syntax Error Indicator */}
          {hasError && (
            <div className="absolute top-2 right-2 flex items-center space-x-2 bg-error/10 border border-error/20 rounded-lg px-3 py-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-xs text-error">Sözdizimi Hatası</span>
            </div>
          )}
          
          {/* Loading Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-4 py-3">
                <Icon name="Loader2" size={20} color="var(--color-primary)" className="animate-spin" />
                <span className="text-sm text-foreground">Kod analiz ediliyor...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Editor Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-surface text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>{lineCount} satır</span>
          <span>{code?.length} karakter</span>
          <span>JavaScript/TypeScript</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {hasError && errorMessage && (
            <div className="flex items-center space-x-1 text-error">
              <Icon name="AlertTriangle" size={12} />
              <span>{errorMessage}</span>
            </div>
          )}
          <span>Ctrl+Enter: Analiz Et</span>
          <span>Ctrl+K: Temizle</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;