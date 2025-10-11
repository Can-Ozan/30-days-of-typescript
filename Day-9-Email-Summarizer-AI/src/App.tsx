import { EmailSummarizer } from '@/components/EmailSummarizer'
import { HistoryPanel } from '@/components/HistoryPanel'
import { StatsPanel } from '@/components/StatsPanel'
import { Toaster } from '@/components/ui/toaster'
import { Mail, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-primary p-3">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Email Summarizer AI</h1>
          <p className="text-lg text-muted-foreground">
            Transform long emails into concise summaries with AI-powered intelligence
          </p>
        </header>

        <Tabs defaultValue="summarizer" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="summarizer">Summarizer</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="summarizer" className="space-y-6">
            <StatsPanel />
            <EmailSummarizer />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <HistoryPanel />
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Powered by OpenAI GPT-4 • Built with React & Supabase</p>
        </footer>
      </div>
      <Toaster />
    </div>
  )
}

export default App
