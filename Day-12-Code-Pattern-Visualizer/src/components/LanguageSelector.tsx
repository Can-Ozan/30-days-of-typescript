import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2 } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const languages = [
  { value: "javascript", label: "JavaScript", extension: "js" },
  { value: "typescript", label: "TypeScript", extension: "ts" },
  { value: "python", label: "Python", extension: "py" },
  { value: "java", label: "Java", extension: "java" },
  { value: "cpp", label: "C++", extension: "cpp" },
];

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Code2 className="w-5 h-5 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-secondary border-border">
          <SelectValue placeholder="Dil seçin" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
