import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Eye, 
  Activity, 
  Heart,
  Target,
  Award,
  Calendar,
  BarChart3
} from "lucide-react";

interface HealthStatsProps {
  stats: {
    sessionsCompleted: number;
    exercisesCompleted: number;
    breaksTaken: number;
    hoursWorked: number;
  };
}

const weeklyData = [
  { day: "Pazartesi", posture: 78, exercises: 8, breaks: 6 },
  { day: "Salı", posture: 82, exercises: 12, breaks: 8 },
  { day: "Çarşamba", posture: 75, exercises: 6, breaks: 4 },
  { day: "Perşembe", posture: 88, exercises: 15, breaks: 10 },
  { day: "Cuma", posture: 85, exercises: 12, breaks: 8 },
  { day: "Cumartesi", posture: 91, exercises: 18, breaks: 12 },
  { day: "Pazar", posture: 89, exercises: 10, breaks: 7 }
];

const achievements = [
  {
    id: "streak-7",
    title: "7 Günlük Seri",
    description: "7 gün üst üste duruş takibi",
    icon: "🔥",
    earned: true,
    date: "2024-01-20"
  },
  {
    id: "posture-master",
    title: "Duruş Ustası",
    description: "85% üzerinde duruş skoru",
    icon: "🏆",
    earned: true,
    date: "2024-01-18"
  },
  {
    id: "eye-champion",
    title: "Göz Egzersizi Şampiyonu",
    description: "50 göz egzersizi tamamla",
    icon: "👁️",
    earned: false,
    progress: 38
  },
  {
    id: "break-master",
    title: "Mola Ustası",
    description: "100 mola tamamla",
    icon: "☕",
    earned: false,
    progress: 67
  }
];

export const HealthStats = ({ stats }: HealthStatsProps) => {
  const today = new Date().toLocaleDateString('tr-TR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const todayData = weeklyData[weeklyData.length - 1];
  
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-primary" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="h-4 w-4" />;
  };

  const getHealthScore = () => {
    const postureWeight = 0.4;
    const exerciseWeight = 0.3;
    const breakWeight = 0.3;
    
    const postureScore = todayData.posture;
    const exerciseScore = Math.min(100, (stats.exercisesCompleted / 15) * 100);
    const breakScore = Math.min(100, (stats.breaksTaken / 10) * 100);
    
    return Math.round(
      postureScore * postureWeight + 
      exerciseScore * exerciseWeight + 
      breakScore * breakWeight
    );
  };

  const healthScore = getHealthScore();

  return (
    <div className="space-y-6">
      {/* Genel Bakış */}
      <Card className="bg-gradient-wellness text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Sağlık Skoru - {today}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold">
              {healthScore}%
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {healthScore >= 90 ? "Mükemmel" : 
               healthScore >= 75 ? "Çok İyi" :
               healthScore >= 60 ? "İyi" : "Geliştirilmeli"}
            </Badge>
            <p className="text-sm opacity-90">
              Bugünkü genel sağlık performansınız
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Günlük İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Duruş Skoru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{todayData.posture}%</span>
                {getTrendIcon(todayData.posture, weeklyData[weeklyData.length - 2]?.posture || 0)}
              </div>
              <Progress value={todayData.posture} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Göz Egzersizleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.exercisesCompleted}</span>
                {getTrendIcon(stats.exercisesCompleted, weeklyData[weeklyData.length - 2]?.exercises || 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Hedef: 15/gün
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Molalar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.breaksTaken}</span>
                {getTrendIcon(stats.breaksTaken, weeklyData[weeklyData.length - 2]?.breaks || 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Hedef: 10/gün
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Çalışma Saati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.hoursWorked}h</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">
                Verimli çalışma
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Haftalık Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Haftalık Trend
          </CardTitle>
          <CardDescription>
            Son 7 günün performans analizi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium w-20">
                    {day.day}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Duruş:</span>
                    <Progress value={day.posture} className="w-16 h-2" />
                    <span className="text-xs font-bold w-8">{day.posture}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{day.exercises}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{day.breaks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Başarımlar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Başarımlar
          </CardTitle>
          <CardDescription>
            Sağlık hedeflerinizdeki ilerleme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned 
                    ? "border-primary bg-primary/10" 
                    : "border-muted bg-muted/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      {achievement.earned && (
                        <Badge variant="default" className="text-xs">
                          Kazanıldı
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {!achievement.earned && achievement.progress && (
                      <div className="space-y-1">
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          %{achievement.progress} tamamlandı
                        </p>
                      </div>
                    )}
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString('tr-TR')} tarihinde kazanıldı
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Öneriler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Kişiselleştirilmiş Öneriler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthScore < 80 && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Öneri:</strong> Duruş skorunuzu iyileştirmek için daha sık hatırlatmalar açın.
                </p>
              </div>
            )}
            {stats.exercisesCompleted < 10 && (
              <div className="p-3 bg-energy/10 border border-energy/20 rounded-lg">
                <p className="text-sm">
                  <strong>👁️ Göz Sağlığı:</strong> Günde en az 15 göz egzersizi yapın. Şu an {stats.exercisesCompleted} egzersiz yaptınız.
                </p>
              </div>
            )}
            {stats.breaksTaken < 8 && (
              <div className="p-3 bg-calm/10 border border-calm/20 rounded-lg">
                <p className="text-sm">
                  <strong>⏰ Mola Zamanı:</strong> Daha sık mola verin. Hedef günde 10 mola, şu an {stats.breaksTaken} mola verdiniz.
                </p>
              </div>
            )}
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm">
                <strong>🎯 Bugünkü Hedef:</strong> {15 - stats.exercisesCompleted > 0 ? `${15 - stats.exercisesCompleted} göz egzersizi daha yapın` : "Tüm hedefleri tamamladınız! Tebrikler!"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};