import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { Globe, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

interface LanguageSelectorProps {
  user: User | null;
}

const LanguageSelector = ({ user }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('tr');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserLanguage();
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
        setSelectedLanguage(data.language);
      }
    } catch (error) {
      console.error('Dil yüklenirken hata:', error);
    }
  };

  const changeLanguage = async (languageCode: string) => {
    if (!user) {
      setSelectedLanguage(languageCode);
      localStorage.setItem('preferred_language', languageCode);
      toast({
        title: "Dil Değiştirildi",
        description: `Dil ${languages.find(l => l.code === languageCode)?.name} olarak ayarlandı.`,
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ language: languageCode })
        .eq('user_id', user.id);

      if (error) throw error;

      setSelectedLanguage(languageCode);
      toast({
        title: "Dil Güncellendi",
        description: `Dil tercihiniz ${languages.find(l => l.code === languageCode)?.name} olarak kaydedildi.`,
      });
    } catch (error: any) {
      console.error('Dil güncellenirken hata:', error);
      toast({
        title: "Hata",
        description: "Dil ayarı güncellenemedi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          <Globe className="h-4 w-4 mr-2" />
          <span className="mr-1">{currentLanguage.flag}</span>
          {currentLanguage.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center">
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </div>
            {selectedLanguage === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;