import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Code, Zap, Globe, Shield, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ApiDocumentation() {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Kopyalandı!",
      description: "Kod panoya kopyalandı."
    })
  }

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/classify",
      description: "Belge sınıflandırma",
      parameters: {
        file: "File (multipart/form-data)",
        language: "string (optional) - tr, en, de, fr, es, it, pt, ru, ar, zh",
        explain: "boolean (premium feature)"
      },
      response: {
        success: true,
        data: {
          classifications: [
            {
              label: "Invoice/Fatura",
              confidence: 0.92,
              category: "Financial",
              language: "tr",
              riskLevel: "low",
              explanation: {
                keywords: ["fatura", "amount", "total"],
                reasoning: "AI modeli bu belgeyi Invoice/Fatura olarak sınıflandırdı...",
                highlightedText: "Highlighted content..."
              }
            }
          ],
          detectedLanguage: "tr",
          processingTime: "1.2s"
        }
      }
    },
    {
      method: "GET",
      endpoint: "/api/languages",
      description: "Desteklenen dilleri listele",
      parameters: {},
      response: {
        success: true,
        data: {
          languages: {
            tr: "Türkçe",
            en: "English",
            de: "Deutsch"
          }
        }
      }
    },
    {
      method: "GET",
      endpoint: "/api/categories",
      description: "Mevcut kategorileri listele",
      parameters: {
        premium: "boolean (optional)"
      },
      response: {
        success: true,
        data: {
          categories: ["Invoice", "Contract", "Resume", "Report"]
        }
      }
    }
  ]

  const codeExamples = {
    javascript: `// JavaScript/Node.js Örneği
const formData = new FormData();
formData.append('file', file);
formData.append('language', 'tr');
formData.append('explain', 'true');

const response = await fetch('/api/classify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result.data.classifications);`,
    
    python: `# Python Örneği
import requests

url = "https://your-api.com/api/classify"
files = {"file": open("document.pdf", "rb")}
data = {"language": "tr", "explain": "true"}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()
print(result["data"]["classifications"])`,

    curl: `# cURL Örneği
curl -X POST "https://your-api.com/api/classify" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "language=tr" \\
  -F "explain=true"`
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
          <Code className="w-4 h-4" />
          RESTful API Documentation
        </div>
        <h1 className="text-3xl font-bold">DokümanAI API</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Güçlü belge sınıflandırma özelliklerini kendi uygulamanıza entegre edin. 
          Çok dilli destek, açıklanabilir AI ve yüksek doğruluk oranı.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm">10+ Dil Desteği</h3>
          <p className="text-xs text-muted-foreground">Otomatik dil tespiti</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm">Açıklanabilir AI</h3>
          <p className="text-xs text-muted-foreground">Karar açıklamaları</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm">Risk Analizi</h3>
          <p className="text-xs text-muted-foreground">Güven puanları</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-sm">Hızlı İşlem</h3>
          <p className="text-xs text-muted-foreground">&lt;2s yanıt süresi</p>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Kod Örnekleri</TabsTrigger>
          <TabsTrigger value="authentication">Kimlik Doğrulama</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm">{endpoint.endpoint}</code>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(endpoint.endpoint)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Parametreler:</h4>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <pre className="text-sm">
                      {JSON.stringify(endpoint.parameters, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Örnek Yanıt:</h4>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            
            {Object.entries(codeExamples).map(([language, code]) => (
              <TabsContent key={language} value={language}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{language.toUpperCase()} Örneği</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(code)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Kopyala
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key Kimlik Doğrulaması</CardTitle>
              <CardDescription>
                Tüm API istekleri için Bearer token gereklidir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Header Formatı:</h4>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Rate Limiting:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Ücretsiz: 100 istek/gün</li>
                  <li>Premium: 10,000 istek/gün</li>
                  <li>Enterprise: Sınırsız</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Hata Kodları:</h4>
                <div className="bg-muted/50 p-3 rounded-lg space-y-1 text-sm">
                  <div><code>401</code> - Geçersiz API Key</div>
                  <div><code>429</code> - Rate limit aşıldı</div>
                  <div><code>400</code> - Geçersiz istek formatı</div>
                  <div><code>500</code> - Sunucu hatası</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}