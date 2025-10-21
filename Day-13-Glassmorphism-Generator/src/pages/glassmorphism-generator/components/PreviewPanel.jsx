import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PreviewPanel = ({ parameters, activeTab }) => {
  const [isHovered, setIsHovered] = useState(false);

  const generateGlassStyle = () => {
    const baseStyle = {
      borderRadius: `${parameters?.borderRadius}px`,
      transition: 'all 0.3s ease'
    };

    switch (activeTab) {
      case 'glassmorphism':
        return {
          ...baseStyle,
          background: `rgba(${hexToRgb(parameters?.backgroundColor)}, ${parameters?.opacity})`,
          backdropFilter: `blur(${parameters?.blur}px)`,
          WebkitBackdropFilter: `blur(${parameters?.blur}px)`,
          border: `1px solid rgba(${hexToRgb(parameters?.highlightColor)}, 0.2)`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.3})`
        };
      case 'neumorphism':
        return {
          ...baseStyle,
          background: parameters?.backgroundColor,
          boxShadow: `
            ${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 40}px rgba(0, 0, 0, 0.2),
            -${parameters?.shadowIntensity * 20}px -${parameters?.shadowIntensity * 20}px ${parameters?.shadowIntensity * 40}px rgba(255, 255, 255, 0.1)
          `
        };
      case 'frosted':
        return {
          ...baseStyle,
          background: `rgba(${hexToRgb(parameters?.backgroundColor)}, ${parameters?.opacity * 0.8})`,
          backdropFilter: `blur(${parameters?.blur * 1.5}px) saturate(1.2)`,
          WebkitBackdropFilter: `blur(${parameters?.blur * 1.5}px) saturate(1.2)`,
          border: `1px solid rgba(${hexToRgb(parameters?.highlightColor)}, 0.3)`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, ${parameters?.shadowIntensity * 0.2}),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        };
      default:
        return baseStyle;
    }
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i?.exec(hex);
    return result ?
    `${parseInt(result?.[1], 16)}, ${parseInt(result?.[2], 16)}, ${parseInt(result?.[3], 16)}` :
    '30, 41, 59';
  };

  const mockData = {
    user: {
      name: "Ayşe Demir",
      role: "UI/UX Tasarımcı",
      avatar: "https://images.unsplash.com/photo-1730222168387-051038de25be",
      avatarAlt: "Professional headshot of young woman with brown hair smiling at camera"
    },
    stats: [
    { label: "Projeler", value: "24", icon: "Briefcase" },
    { label: "Takipçiler", value: "1.2K", icon: "Users" },
    { label: "Beğeniler", value: "3.4K", icon: "Heart" }],

    recentActivity: "2 saat önce aktif"
  };

  return (
    <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Canlı Önizleme</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Canlı</span>
          </div>
        </div>
      </div>
      {/* Preview Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-full max-w-sm">
          {/* Background Elements for Context */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl transform rotate-3 scale-105 opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-primary/10 to-secondary/10 rounded-2xl transform -rotate-2 scale-110 opacity-30"></div>

          {/* Main Preview Card */}
          <div
            style={generateGlassStyle()}
            className="relative p-6 transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            {/* Light Reflection Effect */}
            {isHovered &&
            <div
              className="absolute inset-0 rounded-inherit opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${parameters?.highlightColor}40 50%, transparent 100%)`,
                borderRadius: `${parameters?.borderRadius}px`
              }} />

            }

            {/* Card Content */}
            <div className="relative z-10">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={mockData?.user?.avatar}
                    alt={mockData?.user?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />

                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white/20"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{mockData?.user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{mockData?.user?.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{mockData?.recentActivity}</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {mockData?.stats?.map((stat, index) =>
                <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-white/10">
                        <Icon name={stat?.icon} size={16} className="text-primary" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-foreground">{stat?.value}</div>
                    <div className="text-xs text-muted-foreground">{stat?.label}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 py-2 px-4 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors duration-200 text-sm font-medium">
                  Takip Et
                </button>
                <button className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-foreground rounded-lg transition-colors duration-200 text-sm font-medium">
                  Mesaj
                </button>
              </div>
            </div>
          </div>

          {/* Effect Indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-black/20 rounded-full backdrop-blur-sm">
              <Icon name="Sparkles" size={12} className="text-primary" />
              <span className="text-xs text-foreground capitalize">{activeTab}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Önizleme Bilgisi</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Kartın üzerine gelerek ışık yansıması efektini görebilirsiniz. 
          Gerçek zamanlı değişiklikler anında uygulanır.
        </p>
      </div>
    </div>);

};

export default PreviewPanel;