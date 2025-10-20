import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UtilityPanel = ({
  isOpen = false,
  activeUtility = null,
  analysisState = null,
  onClose = () => {},
  onExport = () => {},
  onSettings = () => {},
  onHelp = () => {}
}) => {
  // Close panel on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleExportFormat = (format) => {
    onExport({ format, data: analysisState });
    onClose();
  };

  const renderContent = () => {
    switch (activeUtility) {
      case 'export':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Export Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Choose format to export your code analysis results
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="FileJson"
                iconPosition="left"
                onClick={() => handleExportFormat('json')}
                disabled={!analysisState?.hasResults}
              >
                Export as JSON
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="FileImage"
                iconPosition="left"
                onClick={() => handleExportFormat('png')}
                disabled={!analysisState?.hasResults}
              >
                Export as PNG
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="FileText"
                iconPosition="left"
                onClick={() => handleExportFormat('svg')}
                disabled={!analysisState?.hasResults}
              >
                Export as SVG
              </Button>
            </div>

            {!analysisState?.hasResults && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                  <span className="text-sm text-warning">
                    No analysis results to export. Analyze code first.
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure analysis preferences and visualization options
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Theme</label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">Dark</Button>
                  <Button variant="ghost" size="sm" className="flex-1">Light</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Analysis Depth</label>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="flex-1">Basic</Button>
                  <Button variant="outline" size="sm" className="flex-1">Detailed</Button>
                  <Button variant="ghost" size="sm" className="flex-1">Full</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Auto-analyze</label>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    Automatically analyze code on changes
                  </span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Help & Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to use the Code Pattern Visualizer effectively
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Play" size={16} className="mr-2" />
                  Quick Start
                </h4>
                <p className="text-sm text-muted-foreground">
                  Load sample code or paste your own, then click Analyze to visualize the AST structure.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Keyboard" size={16} className="mr-2" />
                  Keyboard Shortcuts
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Analyze Code</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">Ctrl + Enter</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Clear Editor</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">Ctrl + K</code>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Resources
                </h4>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" fullWidth iconName="Book" iconPosition="left">
                    Documentation
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth iconName="Github" iconPosition="left">
                    GitHub Repository
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'more':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">More Options</h3>
              <p className="text-sm text-muted-foreground">
                Additional tools and information
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="ghost"
                fullWidth
                iconName="Info"
                iconPosition="left"
                className="justify-start"
              >
                About Code Pattern Visualizer
              </Button>
              
              <Button
                variant="ghost"
                fullWidth
                iconName="MessageSquare"
                iconPosition="left"
                className="justify-start"
              >
                Send Feedback
              </Button>
              
              <Button
                variant="ghost"
                fullWidth
                iconName="Bug"
                iconPosition="left"
                className="justify-start"
              >
                Report Issue
              </Button>

              <div className="pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Version 1.0.0</div>
                  <div>Built with React & Tailwind CSS</div>
                  <div>© 2024 Code Pattern Visualizer</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-[300] shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Settings" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">Utilities</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
              className="hover:bg-muted"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default UtilityPanel;