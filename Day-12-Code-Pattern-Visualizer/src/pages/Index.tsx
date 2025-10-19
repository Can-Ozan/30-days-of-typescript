import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TreeVisualizer } from "@/components/TreeVisualizer";
import { parseJavaScriptCode, ASTNode } from "@/utils/codeParser";
import { Button } from "@/components/ui/button";
import { Sparkles, GitBranch } from "lucide-react";
import { toast } from "sonner";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class Calculator {
  add(a, b) {
    return a + b;
  }
  
  multiply(a, b) {
    return a * b;
  }
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

for (let i = 0; i < 10; i++) {
  console.log(i);
}`;

const Index = () => {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("javascript");
  const [astTree, setAstTree] = useState<ASTNode | null>(null);

  const handleVisualize = () => {
    if (language === "javascript" || language === "typescript") {
      const tree = parseJavaScriptCode(code);
      if (tree) {
        setAstTree(tree);
        toast.success("Kod başarıyla analiz edildi!", {
          description: `${tree.children.length} ana düğüm bulundu.`,
        });
      } else {
        toast.error("Kod analiz edilemedi", {
          description: "Lütfen geçerli bir kod girdiğinizden emin olun.",
        });
      }
    } else {
      toast.info("Geliştirme aşamasında", {
        description: `${language} dili için destek yakında eklenecek!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Code Pattern Visualizer</h1>
                <p className="text-sm text-muted-foreground">Kodunuzun yapısını görselleştirin</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector value={language} onChange={setLanguage} />
              <Button onClick={handleVisualize} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Analiz Et
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* Code Editor */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Kod Editörü</h2>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {language}
              </span>
            </div>
            <div className="flex-1">
              <CodeEditor value={code} onChange={setCode} language={language} />
            </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Ağaç Görselleştirmesi</h2>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--node-function))]" />
                  <span className="text-muted-foreground">Fonksiyon</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--node-variable))]" />
                  <span className="text-muted-foreground">Değişken</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--node-loop))]" />
                  <span className="text-muted-foreground">Döngü</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--node-class))]" />
                  <span className="text-muted-foreground">Class</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              {astTree ? (
                <TreeVisualizer astTree={astTree} />
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-border rounded-lg bg-card/50">
                  <div className="text-center max-w-md">
                    <GitBranch className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Görselleştirme Hazır Değil
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Kodunuzu analiz etmek için yukarıdaki "Analiz Et" butonuna tıklayın.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
