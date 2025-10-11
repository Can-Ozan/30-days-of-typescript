import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { BarChart, TrendingUp, FileText, Zap } from 'lucide-react'

export function StatsPanel() {
  const [stats, setStats] = useState({
    totalSummaries: 0,
    todaySummaries: 0,
    avgCompressionRate: 0,
    totalCharactersSaved: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const { data, error } = await supabase.from('email_summaries').select('email_body, summary')

      if (error) throw error

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const todayData = data?.filter((item: any) => {
        const createdAt = new Date(item.created_at)
        return createdAt >= today
      })

      let totalSaved = 0
      let totalCompression = 0

      data?.forEach((item: any) => {
        const saved = item.email_body.length - item.summary.length
        totalSaved += saved
        totalCompression += (saved / item.email_body.length) * 100
      })

      setStats({
        totalSummaries: data?.length || 0,
        todaySummaries: todayData?.length || 0,
        avgCompressionRate: data?.length ? Math.round(totalCompression / data.length) : 0,
        totalCharactersSaved: totalSaved,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Summaries</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSummaries}</div>
          <p className="text-xs text-muted-foreground">All time summaries</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todaySummaries}</div>
          <p className="text-xs text-muted-foreground">Summaries today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Compression</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgCompressionRate}%</div>
          <p className="text-xs text-muted-foreground">Average reduction</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Characters Saved</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.totalCharactersSaved)}</div>
          <p className="text-xs text-muted-foreground">Total saved</p>
        </CardContent>
      </Card>
    </div>
  )
}
