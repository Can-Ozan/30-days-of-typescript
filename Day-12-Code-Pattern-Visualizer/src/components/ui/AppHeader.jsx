import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import UtilityPanel from './UtilityPanel';

const AppHeader = ({ 
  analysisState = null, 
  onExport = () => {}, 
  onSettings = () => {},
  onHelp = () => {} 
}) => {
  const [isUtilityPanelOpen, setIsUtilityPanelOpen] = useState(false);
  const [activeUtility, setActiveUtility] = useState(null);

  const handleUtilityClick = (utilityType) => {
    setActiveUtility(utilityType);
    setIsUtilityPanelOpen(true);
  };

  const handleCloseUtility = () => {
    setIsUtilityPanelOpen(false);
    setActiveUtility(null);
  };

  const handleExport = () => {
    if (analysisState && analysisState?.hasResults) {
      onExport(analysisState);
    } else {
      handleUtilityClick('export');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon 
                name="Code2" 
                size={20} 
                color="var(--color-primary-foreground)" 
                strokeWidth={2.5}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground font-heading">
                Code Pattern Visualizer
              </h1>
              <span className="text-xs text-muted-foreground font-caption">
                AST Analysis & Visualization
              </span>
            </div>
          </div>

          {/* Utility Actions */}
          <div className="flex items-center space-x-2">
            {/* Export Button - Context Aware */}
            <Button
              variant={analysisState?.hasResults ? "default" : "ghost"}
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={handleExport}
              disabled={!analysisState?.hasResults && !analysisState?.hasCode}
              className="transition-micro"
            >
              Export
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              iconName="Settings"
              onClick={() => handleUtilityClick('settings')}
              className="transition-micro hover:bg-muted"
            />

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              iconName="HelpCircle"
              onClick={() => handleUtilityClick('help')}
              className="transition-micro hover:bg-muted"
            />

            {/* More Options */}
            <Button
              variant="ghost"
              size="icon"
              iconName="MoreVertical"
              onClick={() => handleUtilityClick('more')}
              className="transition-micro hover:bg-muted"
            />
          </div>
        </div>

        {/* Analysis Status Indicator */}
        {analysisState?.isAnalyzing && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted overflow-hidden">
            <div className="h-full bg-primary animate-pulse w-full"></div>
          </div>
        )}
      </header>

      {/* Utility Panel */}
      <UtilityPanel
        isOpen={isUtilityPanelOpen}
        activeUtility={activeUtility}
        analysisState={analysisState}
        onClose={handleCloseUtility}
        onExport={onExport}
        onSettings={onSettings}
        onHelp={onHelp}
      />
    </>
  );
};

export default AppHeader;