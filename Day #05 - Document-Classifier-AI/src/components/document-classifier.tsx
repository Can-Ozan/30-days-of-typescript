import { useState, useCallback } from "react"
import { Upload, FileText, Sparkles, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface ClassificationResult {
  label: string
  confidence: number
  category: string
  explanation?: {
    keywords: string[]
    highlightedText?: string
    reasoning: string
  }
  language?: string
  riskLevel: 'low' | 'medium' | 'high'
}

interface DocumentClassifierProps {
  isPremium?: boolean
}

export function DocumentClassifier({ isPremium = false }: DocumentClassifierProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const { toast } = useToast()

  const categories = isPremium 
    ? ['Invoice', 'Contract', 'Resume', 'Report', 'Legal', 'Medical', 'Technical', 'Financial', 'Marketing', 'Academic']
    : ['Invoice', 'Contract', 'Resume', 'Report', 'Medical']

  const supportedLanguages = {
    'tr': 'Türkçe',
    'en': 'English',
    'de': 'Deutsch',
    'fr': 'Français',
    'es': 'Español',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'ar': 'العربية',
    'zh': '中文'
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const detectLanguage = (text: string): string => {
    const commonWords = {
      'tr': ['ve', 'bir', 'bu', 'ile', 'için', 'olan', 'çok', 'daha', 'şu', 'kadar'],
      'en': ['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that'],
      'de': ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich'],
      'fr': ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir'],
      'es': ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se'],
      'it': ['il', 'di', 'e', 'la', 'a', 'che', 'per', 'un', 'in', 'con'],
      'pt': ['o', 'de', 'e', 'a', 'do', 'que', 'em', 'um', 'para', 'com'],
      'ru': ['и', 'в', 'не', 'на', 'я', 'быть', 'с', 'а', 'как', 'его'],
      'ar': ['في', 'من', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'التي', 'التي', 'كان'],
      'zh': ['的', '是', '在', '我', '有', '和', '就', '不', '人', '都']
    }
    
    const lowerText = text.toLowerCase()
    let maxScore = 0
    let detectedLang = 'en'
    
    Object.entries(commonWords).forEach(([lang, words]) => {
      let score = 0
      words.forEach(word => {
        if (lowerText.includes(word)) score++
      })
      if (score > maxScore) {
        maxScore = score
        detectedLang = lang
      }
    })
    
    return detectedLang
  }

  const generateExplanation = (content: string, classification: string): {
    keywords: string[],
    highlightedText: string,
    reasoning: string
  } => {
    const words = content.toLowerCase().split(/\s+/)
    const keywordsByCategory = {
      'invoice': ['fatura', 'invoice', 'amount', 'total', 'miktar', 'tutar', 'payment', 'ödeme', 'bill', 'receipt'],
      'contract': ['sözleşme', 'contract', 'agreement', 'terms', 'şartlar', 'imza', 'signature', 'clauses'],
      'resume': ['özgeçmiş', 'resume', 'cv', 'experience', 'deneyim', 'education', 'eğitim', 'skills', 'curriculum'],
      'report': ['rapor', 'report', 'analysis', 'analiz', 'summary', 'özet', 'conclusion', 'sonuç', 'findings'],
      'medical': ['sağlık', 'health', 'medical', 'tıbbi', 'hasta', 'patient', 'doktor', 'doctor', 'diagnosis', 'teşhis', 'tedavi', 'treatment', 'clinic', 'klinik', 'hospital', 'hastane', 'blood', 'kan', 'test', 'examination', 'muayene', 'prescription', 'reçete', 'medicine', 'ilaç'],
      'legal': ['yasal', 'legal', 'court', 'mahkeme', 'law', 'hukuk', 'attorney', 'avukat', 'lawsuit', 'dava']
    }
    
    const category = classification.toLowerCase().split('/')[0].toLowerCase()
    const relevantKeywords = keywordsByCategory[category] || []
    const foundKeywords = relevantKeywords.filter(kw => content.toLowerCase().includes(kw))
    
    let highlightedText = content
    foundKeywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi')
      highlightedText = highlightedText.replace(regex, '<mark class="bg-primary/20 px-1 rounded">$1</mark>')
    })
    
    const reasoning = `AI modeli bu belgeyi "${classification}" olarak sınıflandırdı çünkü: ${foundKeywords.join(', ')} gibi anahtar kelimeler tespit edildi.`
    
    return {
      keywords: foundKeywords,
      highlightedText,
      reasoning
    }
  }

  const generateDetailedReport = (file: File, results: ClassificationResult[]) => {
    const fileName = file.name
    const fileSize = (file.size / 1024).toFixed(1)
    const topResult = results[0]
    
    return {
      documentInfo: {
        name: fileName,
        size: `${fileSize} KB`,
        type: file.type || 'Unknown',
        uploadDate: new Date().toLocaleString('tr-TR'),
        language: supportedLanguages[detectedLanguage] || 'Unknown'
      },
      classification: {
        primaryCategory: topResult.label,
        confidence: `${(topResult.confidence * 100).toFixed(1)}%`,
        securityScore: isPremium ? Math.floor(Math.random() * 30) + 70 : 'Premium Gerekli',
        riskLevel: topResult.riskLevel,
        explanation: topResult.explanation
      },
      analysis: {
        contentType: topResult.category,
        language: supportedLanguages[detectedLanguage] || 'Auto-detected',
        pages: Math.floor(Math.random() * 10) + 1,
        wordCount: Math.floor(Math.random() * 1000) + 100,
        keyInsights: topResult.explanation?.keywords || []
      },
      recommendations: isPremium ? [
        'Güvenli klasörde saklanmalı',
        'Düzenli yedekleme önerilir',
        topResult.riskLevel === 'high' ? 'Manuel inceleme önerilir' : 'Hassas veri tespit edilmedi'
      ] : ['Premium ile daha fazla öneri']
    }
  }

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return

    const file = files[0]
    if (!file.type.includes('text') && !file.type.includes('pdf') && !file.type.includes('document')) {
      toast({
        title: "Desteklenmeyen dosya türü",
        description: "Lütfen metin, PDF veya Word dosyası yükleyin.",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setResults([])

    try {
      // Read file content
      let fileContent = ""
      
      if (file.type.includes('text') || file.name.endsWith('.txt')) {
        fileContent = await file.text()
      } else if (file.type.includes('pdf')) {
        // Enhanced PDF content simulation based on file name and size
        const fileName = file.name.toLowerCase()
        let simulatedContent = `PDF Belgesi: ${file.name}\n`
        
        // Simulate PDF content based on filename patterns
        if (fileName.includes('sağlık') || fileName.includes('health') || fileName.includes('medical') || fileName.includes('tıbbi')) {
          simulatedContent += `Sağlık Raporu\nHasta Bilgileri\nTahlil Sonuçları\nDoktor Görüşü\nTedavi Önerileri\nKan değerleri normal\nVitamin seviyeleri\nTanı ve tedavi planı\nMuayene notları\nReçete bilgileri`
        } else if (fileName.includes('fatura') || fileName.includes('invoice')) {
          simulatedContent += `Fatura No: 2024-001\nTutar: 1,250.00 TL\nÖdeme Tarihi\nVergi Oranı\nToplam Tutar`
        } else if (fileName.includes('sözleşme') || fileName.includes('contract')) {
          simulatedContent += `Sözleşme Maddeleri\nTarafların Yükümlülükleri\nİmza Alanı\nŞartlar ve Koşullar`
        } else if (fileName.includes('cv') || fileName.includes('resume') || fileName.includes('özgeçmiş')) {
          simulatedContent += `Kişisel Bilgiler\nİş Deneyimi\nEğitim Geçmişi\nBeceriler\nReferanslar`
        } else {
          simulatedContent += `Genel PDF içeriği\nMetin analizi\nBelge yapısı\nSayfa bilgileri`
        }
        
        fileContent = simulatedContent
      } else {
        // For other files, simulate content extraction
        fileContent = `Dosya analizi: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
      }

      console.log('Dosya içeriği okundu:', fileContent.substring(0, 200))
      console.log('Dosya adı:', file.name.toLowerCase())
      console.log('Dosya tipi:', file.type)

      // Detect language first
      const language = detectLanguage(fileContent)
      setDetectedLanguage(language)
      
      // Simulate AI processing with realistic progress
      const steps = [
        'Dosya okunuyor...', 
        'Dil tespiti yapılıyor...', 
        'İçerik analiz ediliyor...', 
        isPremium ? 'AI modeli çalışıyor...' : 'Temel sınıflandırma...', 
        isPremium ? 'Açıklanabilir AI hesaplanıyor...' : 'Sonuçlar hazırlanıyor...',
        'Detaylı rapor oluşturuluyor...'
      ]
      
      for (let i = 0; i <= 100; i += Math.floor(100 / steps.length)) {
        setProgress(Math.min(i, 100))
        if (i < 100) {
          const stepIndex = Math.floor(i / (100 / steps.length))
          if (stepIndex < steps.length) {
            console.log(steps[stepIndex])
          }
        }
        await new Promise(resolve => setTimeout(resolve, isPremium ? 400 : 250))
      }

      // Enhanced classification based on file content and name
      const fileName = file.name.toLowerCase()
      const content = fileContent.toLowerCase()
      
      let mockResults: ClassificationResult[] = []
      let documentType = ""
      
      // Enhanced smart classification with priority order
      if (fileName.includes('sağlık') || fileName.includes('health') || fileName.includes('medical') || fileName.includes('tıbbi') ||
          content.includes('sağlık') || content.includes('health') || content.includes('medical') || content.includes('hasta') ||
          content.includes('patient') || content.includes('doktor') || content.includes('doctor') || content.includes('teşhis') ||
          content.includes('diagnosis') || content.includes('tedavi') || content.includes('treatment') || content.includes('kan') ||
          content.includes('blood') || content.includes('tahlil') || content.includes('test') || content.includes('muayene') ||
          content.includes('examination') || content.includes('klinik') || content.includes('clinic') || content.includes('hastane') ||
          content.includes('hospital') || content.includes('reçete') || content.includes('prescription') || content.includes('ilaç')) {
        documentType = "Bu bir sağlık/tıbbi belgesidir. Hasta bilgileri ve tıbbi veriler içerir."
        const explanation = isPremium ? generateExplanation(fileContent, "Medical/Sağlık") : undefined
        mockResults = [
          { 
            label: "Medical/Sağlık Raporu", 
            confidence: 0.94, 
            category: "Medical",
            explanation,
            language,
            riskLevel: 'medium'
          },
          { 
            label: "Health Report", 
            confidence: 0.87, 
            category: "Medical",
            language,
            riskLevel: 'medium'
          },
          { 
            label: "Lab Results", 
            confidence: 0.79, 
            category: "Medical",
            language,
            riskLevel: 'low'
          }
        ]
      } else if (fileName.includes('invoice') || fileName.includes('fatura') || 
          content.includes('invoice') || content.includes('fatura') || content.includes('total') || content.includes('amount') ||
          content.includes('facture') || content.includes('rechnung') || content.includes('fattura')) {
        documentType = "Bu bir fatura belgesidir. Mali kayıt amaçlı önemli bir dokümandır."
        const explanation = isPremium ? generateExplanation(fileContent, "Invoice/Fatura") : undefined
        mockResults = [
          { 
            label: "Invoice/Fatura", 
            confidence: 0.92, 
            category: "Financial",
            explanation,
            language,
            riskLevel: 'low'
          },
          { 
            label: "Receipt", 
            confidence: 0.78, 
            category: "Financial",
            language,
            riskLevel: 'low'
          },
          { 
            label: "Purchase Order", 
            confidence: 0.65, 
            category: "Business",
            language,
            riskLevel: 'low'
          }
        ]
      } else if (fileName.includes('contract') || fileName.includes('sözleşme') || 
                 content.includes('contract') || content.includes('agreement') || content.includes('terms') ||
                 content.includes('contrat') || content.includes('vertrag') || content.includes('contratto')) {
        documentType = "Bu bir sözleşme belgesidir. Yasal yükümlülükler içeren önemli bir dokümandır."
        const explanation = isPremium ? generateExplanation(fileContent, "Contract/Sözleşme") : undefined
        mockResults = [
          { 
            label: "Contract/Sözleşme", 
            confidence: 0.89, 
            category: "Legal",
            explanation,
            language,
            riskLevel: 'medium'
          },
          { 
            label: "Agreement", 
            confidence: 0.76, 
            category: "Legal",
            language,
            riskLevel: 'medium'
          },
          { 
            label: "Terms of Service", 
            confidence: 0.62, 
            category: "Legal",
            language,
            riskLevel: 'low'
          }
        ]
      } else if (fileName.includes('cv') || fileName.includes('resume') || fileName.includes('özgeçmiş') ||
                 content.includes('experience') || content.includes('education') || content.includes('skills') ||
                 content.includes('curriculum') || content.includes('lebenslauf')) {
        documentType = "Bu bir özgeçmiş belgesidir. Kişisel ve mesleki bilgileri içerir."
        const explanation = isPremium ? generateExplanation(fileContent, "Resume/CV") : undefined
        mockResults = [
          { 
            label: "Resume/CV", 
            confidence: 0.88, 
            category: "HR",
            explanation,
            language,
            riskLevel: 'low'
          },
          { 
            label: "Job Application", 
            confidence: 0.74, 
            category: "HR",
            language,
            riskLevel: 'low'
          },
          { 
            label: "Portfolio", 
            confidence: 0.58, 
            category: "Personal",
            language,
            riskLevel: 'low'
          }
        ]
      } else if (fileName.includes('report') || fileName.includes('rapor') ||
                 content.includes('analysis') || content.includes('summary') || content.includes('conclusion') ||
                 content.includes('rapport') || content.includes('bericht') || content.includes('relazione')) {
        documentType = "Bu bir rapor belgesidir. Analiz ve değerlendirme içerir."
        const explanation = isPremium ? generateExplanation(fileContent, "Report/Rapor") : undefined
        mockResults = [
          { 
            label: "Report/Rapor", 
            confidence: 0.85, 
            category: "Business",
            explanation,
            language,
            riskLevel: 'low'
          },
          { 
            label: "Analysis", 
            confidence: 0.72, 
            category: "Research",
            language,
            riskLevel: 'low'
          },
          { 
            label: "Study", 
            confidence: 0.64, 
            category: "Academic",
            language,
            riskLevel: 'low'
          }
        ]
      } else {
        documentType = "Bu genel bir metin belgesidir. İçerik analizi için daha fazla veri gerekli."
        // Enhanced unknown document detection
        console.log('Belge sınıflandırılamadı. İçerik analizi:', content.substring(0, 200))
        const explanation = isPremium ? generateExplanation(fileContent, "General Document") : undefined
        mockResults = [
          { 
            label: "General Document", 
            confidence: 0.65, 
            category: "General",
            explanation,
            language,
            riskLevel: 'medium'
          },
          { 
            label: "Text File", 
            confidence: 0.58, 
            category: "General",
            language,
            riskLevel: 'low'
          },
          { 
            label: "Unclassified", 
            confidence: 0.35, 
            category: "Other",
            language,
            riskLevel: 'high'
          }
        ]
      }

      // Filter results based on premium status
      const finalResults = mockResults.slice(0, isPremium ? 4 : 3)
      const detailedReport = generateDetailedReport(file, finalResults)
      
      setResults(finalResults)
      
      // Show detailed toast with document identification
      toast({
        title: "✨ Analiz Tamamlandı!",
        description: `${documentType} Dil: ${supportedLanguages[language]}. ${finalResults.length} kategori belirlendi.`
      })
      
      // Log detailed report for premium users
      if (isPremium) {
        console.log('📊 Detaylı Rapor:', detailedReport)
      }
      
      console.log('Sınıflandırma tamamlandı:', finalResults)
      
    } catch (error) {
      console.error('Dosya işleme hatası:', error)
      toast({
        title: "❌ Hata oluştu",
        description: "Dosya işlenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card 
        className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 ${
          dragActive 
            ? 'border-primary bg-ai-gradient-subtle' 
            : 'border-border hover:border-primary/50'
        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-ai-gradient rounded-2xl flex items-center justify-center animate-pulse-glow">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Belgeyi Yükleyin</h3>
            <p className="text-muted-foreground">
              Dosyayı buraya sürükleyin veya tıklayarak seçin
            </p>
          </div>
          
          <Button 
            onClick={() => document.getElementById('file-input')?.click()}
            className="bg-ai-gradient hover:opacity-90 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Dosya Seç
          </Button>
          
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileInput}
          />
          
          {!isPremium && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-premium-gold" />
                Premium ile daha fazla kategori ve gelişmiş analiz
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Progress */}
      {isProcessing && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary animate-spin" />
              <span className="font-medium">Belge analiz ediliyor...</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Sınıflandırma Sonuçları</h3>
            </div>
            
            <div className="space-y-4">
              {detectedLanguage && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">
                    Tespit edilen dil: {supportedLanguages[detectedLanguage]}
                  </span>
                </div>
              )}
              
              <div className="grid gap-3">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg backdrop-blur-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-ai-gradient text-white">
                          {result.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {result.category}
                        </span>
                        <Badge 
                          variant={result.riskLevel === 'low' ? 'default' : result.riskLevel === 'medium' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {result.riskLevel === 'low' ? 'Düşük Risk' : result.riskLevel === 'medium' ? 'Orta Risk' : 'Yüksek Risk'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            %{(result.confidence * 100).toFixed(1)} güven
                          </div>
                          {result.confidence < 0.7 && (
                            <div className="text-xs text-warning">
                              Manuel inceleme önerilir
                            </div>
                          )}
                        </div>
                        <div className="w-20">
                          <Progress 
                            value={result.confidence * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isPremium && result.explanation && (
                      <div className="mt-3 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowExplanation(!showExplanation)}
                          className="text-xs"
                        >
                          {showExplanation ? 'Açıklamayı Gizle' : 'Açıklama Göster'} 
                          <Sparkles className="w-3 h-3 ml-1" />
                        </Button>
                        
                        {showExplanation && (
                          <div className="space-y-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <div className="text-xs text-muted-foreground">
                              <strong>Anahtar Kelimeler:</strong> {result.explanation.keywords.join(', ')}
                            </div>
                            <div className="text-xs">
                              {result.explanation.reasoning}
                            </div>
                            {result.explanation.highlightedText && (
                              <div 
                                className="text-xs p-2 bg-background rounded border max-h-20 overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: result.explanation.highlightedText.substring(0, 200) + '...' }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {!isPremium && (
              <div className="mt-4 p-4 bg-premium-gradient rounded-lg text-white text-center">
                <Crown className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">Premium ile daha detaylı analiz</p>
                <p className="text-sm opacity-90">6 ek kategori ve güvenlik analizi</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}