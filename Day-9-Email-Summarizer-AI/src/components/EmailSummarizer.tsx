import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Mail, Sparkles, Copy, Check, Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

interface SummaryResult {
  summary: string
  keyPoints: string[]
  emailLength: number
  summaryLength: number
  compressionRate: number
}

export function EmailSummarizer() {
  const [subject, setSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!emailBody.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter email content to summarize',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-email`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          emailBody,
          summaryLength,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to summarize email')
      }

      const data = await response.json()

      setResult({
        summary: data.summary,
        keyPoints: data.keyPoints,
        emailLength: emailBody.length,
        summaryLength: data.summary.length,
        compressionRate: Math.round((1 - data.summary.length / emailBody.length) * 100),
      })

      await supabase.from('email_summaries').insert({
        email_subject: subject,
        email_body: emailBody,
        summary: data.summary,
        summary_length: summaryLength,
        key_points: data.keyPoints,
      })

      toast({
        title: 'Success',
        description: 'Email summarized successfully',
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Failed to summarize email. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: 'Copied',
        description: 'Summary copied to clipboard',
      })
    }
  }

  const handleDownload = () => {
    if (result) {
      const content = `Subject: ${subject}\n\nSummary:\n${result.summary}\n\nKey Points:\n${result.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `email-summary-${Date.now()}.txt`
      a.click()
      URL.revokeObjectURL(url)
      toast({
        title: 'Downloaded',
        description: 'Summary downloaded successfully',
      })
    }
  }

  const handleReset = () => {
    setSubject('')
    setEmailBody('')
    setResult(null)
    setSummaryLength('medium')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Input
          </CardTitle>
          <CardDescription>Paste your email content below to get a concise summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-body">Email Body</Label>
            <Textarea
              id="email-body"
              placeholder="Paste your long email here..."
              className="min-h-[300px] resize-none"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
            <div className="text-xs text-muted-foreground">
              Characters: {emailBody.length}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary-length">Summary Length</Label>
            <Select value={summaryLength} onValueChange={(value: any) => setSummaryLength(value)}>
              <SelectTrigger id="summary-length">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (2-3 sentences)</SelectItem>
                <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
                <SelectItem value="detailed">Detailed (Multiple paragraphs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSummarize} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Summarize Email
                </>
              )}
            </Button>
            {result && (
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Summary Result
          </CardTitle>
          <CardDescription>AI-generated summary and key points</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Summary</Label>
                  <div className="flex gap-2">
                    <Button onClick={handleCopy} variant="ghost" size="sm">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleDownload} variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                  {result.summary}
                </div>
              </div>

              {result.keyPoints.length > 0 && (
                <div className="space-y-2">
                  <Label>Key Points</Label>
                  <ul className="space-y-2">
                    {result.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Original</div>
                  <div className="text-lg font-semibold">{result.emailLength}</div>
                  <div className="text-xs text-muted-foreground">characters</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Summary</div>
                  <div className="text-lg font-semibold">{result.summaryLength}</div>
                  <div className="text-xs text-muted-foreground">characters</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Compression</div>
                  <div className="text-lg font-semibold text-green-600">{result.compressionRate}%</div>
                  <div className="text-xs text-muted-foreground">reduced</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center text-center text-muted-foreground">
              <div className="space-y-2">
                <Sparkles className="mx-auto h-12 w-12 opacity-20" />
                <p>Your summary will appear here</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
