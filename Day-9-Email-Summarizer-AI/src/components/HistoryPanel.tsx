import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase, EmailSummary } from '@/lib/supabase'
import { Clock, Trash2, Eye, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HistoryPanelProps {
  onSelectSummary?: (summary: EmailSummary) => void
}

export function HistoryPanel({ onSelectSummary }: HistoryPanelProps) {
  const [summaries, setSummaries] = useState<EmailSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('email_summaries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setSummaries(data || [])
    } catch (error) {
      console.error('Error loading history:', error)
      toast({
        title: 'Error',
        description: 'Failed to load history',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('email_summaries').delete().eq('id', id)
      if (error) throw error
      setSummaries(summaries.filter((s) => s.id !== id))
      toast({
        title: 'Deleted',
        description: 'Summary deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete summary',
        variant: 'destructive',
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const handleView = (summary: EmailSummary) => {
    setSelectedId(summary.id)
    onSelectSummary?.(summary)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Summaries
        </CardTitle>
        <CardDescription>View and manage your previous email summaries</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading history...
          </div>
        ) : summaries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <FileText className="mb-2 h-12 w-12 opacity-20" />
            <p>No summaries yet</p>
            <p className="text-xs">Your summarized emails will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className={`group rounded-lg border p-3 transition-colors hover:bg-accent ${
                  selectedId === summary.id ? 'border-primary bg-accent' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="font-medium text-sm line-clamp-1">
                      {summary.email_subject || 'No Subject'}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {summary.summary}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(summary.created_at)}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                        {summary.summary_length}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleView(summary)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(summary.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
