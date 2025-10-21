import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Theme toggle logic would be implemented here
  };

  const handleRandomize = () => {
    // Randomize glassmorphism parameters
    console.log('Randomizing parameters...');
  };

  const handleReset = () => {
    // Reset all parameters to default
    console.log('Resetting parameters...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-90 backdrop-blur-sm"></div>
            <div className="absolute inset-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-xl border border-white/20"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Glassmorphism Generator
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Create stunning glass effects
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Randomize Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRandomize}
            iconName="Shuffle"
            iconPosition="left"
            className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors"
          >
            Randomize
          </Button>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
            className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon 
              name={isDarkMode ? "Sun" : "Moon"} 
              size={18} 
              className="transition-transform duration-300"
            />
          </Button>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="MoreVertical" size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </header>
  );
};

export default Header;