import { createContext, useContext, useEffect, useState } from "react";
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  user?: User | null;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  user,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  // Kullanıcı temasını yükle
  useEffect(() => {
    if (user) {
      loadUserTheme();
    }
  }, [user]);

  const loadUserTheme = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('theme')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      if (data?.theme) {
        setTheme(data.theme as Theme);
      }
    } catch (error) {
      console.error('Tema yüklenirken hata:', error);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: async (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);

      // Kullanıcı girişi yapmışsa tema tercihini kaydet
      if (user) {
        try {
          await supabase
            .from('profiles')
            .update({ theme })
            .eq('user_id', user.id);
        } catch (error) {
          console.error('Tema kaydedilirken hata:', error);
        }
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};