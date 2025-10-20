import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({
  status = 'idle', // idle, analyzing, success, error, warning
  message = '',
  progress = 0,
  onDismiss = null,
  className = ''
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'analyzing':
        return {
          icon: 'Loader2',
          iconClass: 'animate-spin',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          textColor: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconClass: '',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          textColor: 'text-success',
          iconColor: 'var(--color-success)'
        };
      case 'error':
        return {
          icon: 'XCircle',
          iconClass: '',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          textColor: 'text-error',
          iconColor: 'var(--color-error)'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          iconClass: '',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();

  if (!config || status === 'idle') return null;

  return (
    <div className={`
      fixed top-20 right-6 max-w-sm z-[150]
      ${config?.bgColor} ${config?.borderColor} ${config?.textColor}
      border rounded-lg p-4 shadow-lg backdrop-blur-panel
      animate-slide-in-from-right
      ${className}
    `}>
      <div className="flex items-start space-x-3">
        <Icon 
          name={config?.icon} 
          size={20} 
          color={config?.iconColor}
          className={config?.iconClass}
        />
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">
            {status === 'analyzing' && 'Analyzing Code...'}
            {status === 'success' && 'Analysis Complete'}
            {status === 'error' && 'Analysis Failed'}
            {status === 'warning' && 'Warning'}
          </div>
          
          {message && (
            <div className="text-xs text-muted-foreground mt-1">
              {message}
            </div>
          )}
          
          {status === 'analyzing' && progress > 0 && (
            <div className="mt-2">
              <div className="w-full bg-muted/30 rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(progress)}% complete
              </div>
            </div>
          )}
        </div>
        
        {onDismiss && status !== 'analyzing' && (
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;