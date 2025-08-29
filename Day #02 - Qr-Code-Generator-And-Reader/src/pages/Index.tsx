import React, { useState } from 'react';
import { AppNavigation } from '@/components/AppNavigation';
import { QRGenerator } from '@/components/QRGenerator';
import { QRScanner } from '@/components/QRScanner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'scanner'>('generator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <AppNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'generator' && <QRGenerator />}
        {activeTab === 'scanner' && <QRScanner />}
      </main>
    </div>
  );
};

export default Index;
