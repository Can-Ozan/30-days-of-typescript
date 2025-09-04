import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

// Çeviri metinleri
const translations = {
  tr: {
    // Ana sayfa
    'title': 'Akıllı Ergonomi Asistanı',
    'subtitle': 'Evden çalışanlar için geliştirilmiş akıllı sağlık ve ergonomi sistemi. Duruşunuzu kontrol edin, sağlıklı alışkanlıklar geliştirin.',
    'posture_score': 'Duruş Skoru',
    'perfect': 'Mükemmel',
    'good': 'İyi',
    'attention_needed': 'Dikkat Gerekli',
    'todays_session': 'Bugünkü Seans',
    'completed': 'Tamamlanan',
    'eye_exercise': 'Göz Egzersizi',
    'today': 'Bu gün',
    'health_score': 'Sağlık Skoru',
    'very_good': 'Çok iyi',
    'posture_control': 'Duruş Kontrolü',
    'posture_control_description': 'Kameranızı kullanarak gerçek zamanlı duruş analizi',
    'monitoring_status': 'Monitoring Durumu',
    'active': 'Aktif',
    'passive': 'Pasif',
    'stop': 'Durdur',
    'start': 'Başlat',
    'smart_reminders': 'Akıllı Hatırlatmalar',
    'smart_reminders_description': 'Kişiselleştirilmiş sağlık önerileri',
    'quick_actions': 'Hızlı Eylemler',
    'stretching_movements': 'Esneme Hareketleri',
    'streamer_mode': 'Yayıncı Modu',
    'logout': 'Çıkış',
    'monitoring': 'Monitoring',
    'offline': 'Offline',
    // Navigation
    'home': 'Ana Sayfa',
    'posture': 'Duruş',
    'exercises': 'Egzersizler',
    'ai_assistant': 'AI Asistan',
    'leaderboard': 'Liderlik',
    'statistics': 'İstatistikler',
    'feedback': 'Geri Bildirim',
    // Diğer metinler...
  },
  en: {
    'title': 'Smart Ergonomics Assistant',
    'subtitle': 'Smart health and ergonomics system designed for remote workers. Monitor your posture and develop healthy habits.',
    'posture_score': 'Posture Score',
    'perfect': 'Perfect',
    'good': 'Good',
    'attention_needed': 'Attention Needed',
    'todays_session': 'Today\'s Session',
    'completed': 'Completed',
    'eye_exercise': 'Eye Exercise',
    'today': 'Today',
    'health_score': 'Health Score',
    'very_good': 'Very Good',
    'posture_control': 'Posture Control',
    'posture_control_description': 'Real-time posture analysis using your camera',
    'monitoring_status': 'Monitoring Status',
    'active': 'Active',
    'passive': 'Passive',
    'stop': 'Stop',
    'start': 'Start',
    'smart_reminders': 'Smart Reminders',
    'smart_reminders_description': 'Personalized health recommendations',
    'quick_actions': 'Quick Actions',
    'stretching_movements': 'Stretching Movements',
    'streamer_mode': 'Streamer Mode',
    'logout': 'Logout',
    'monitoring': 'Monitoring',
    'offline': 'Offline',
    // Navigation
    'home': 'Home',
    'posture': 'Posture',
    'exercises': 'Exercises',
    'ai_assistant': 'AI Assistant',
    'leaderboard': 'Leaderboard',
    'statistics': 'Statistics',
    'feedback': 'Feedback',
  },
  de: {
    'title': 'Intelligenter Ergonomie-Assistent',
    'subtitle': 'Intelligentes Gesundheits- und Ergonomiesystem für Fernarbeiter. Überwachen Sie Ihre Haltung und entwickeln Sie gesunde Gewohnheiten.',
    'posture_score': 'Haltungsbewertung',
    'perfect': 'Perfekt',
    'good': 'Gut',
    'attention_needed': 'Aufmerksamkeit erforderlich',
    'todays_session': 'Heutige Sitzung',
    'completed': 'Abgeschlossen',
    'eye_exercise': 'Augenübung',
    'today': 'Heute',
    'health_score': 'Gesundheitsbewertung',
    'very_good': 'Sehr gut',
    'posture_control': 'Haltungskontrolle',
    'posture_control_description': 'Echtzeitanalyse der Haltung mit Ihrer Kamera',
    'monitoring_status': 'Überwachungsstatus',
    'active': 'Aktiv',
    'passive': 'Passiv',
    'stop': 'Stoppen',
    'start': 'Starten',
    'smart_reminders': 'Intelligente Erinnerungen',
    'smart_reminders_description': 'Personalisierte Gesundheitsempfehlungen',
    'quick_actions': 'Schnelle Aktionen',
    'stretching_movements': 'Dehnübungen',
    'streamer_mode': 'Streamer-Modus',
    'logout': 'Abmelden',
    'monitoring': 'Überwachung',
    'offline': 'Offline',
    // Navigation
    'home': 'Startseite',
    'posture': 'Haltung',
    'exercises': 'Übungen',
    'ai_assistant': 'KI-Assistent',
    'leaderboard': 'Bestenliste',
    'statistics': 'Statistiken',
    'feedback': 'Feedback',
  }
  // Diğer diller eklenebilir...
};

export type Language = keyof typeof translations;

export const useTranslation = (user?: User | null) => {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    if (user) {
      loadUserLanguage();
    } else {
      // Kullanıcı giriş yapmamışsa localStorage'dan yükle
      const savedLang = localStorage.getItem('preferred_language') as Language;
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      }
    }
  }, [user]);

  const loadUserLanguage = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('language')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      if (data?.language) {
        setLanguage(data.language as Language);
      }
    } catch (error) {
      console.error('Dil yüklenirken hata:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations[Language]] || key;
  };

  return { t, language, setLanguage };
};