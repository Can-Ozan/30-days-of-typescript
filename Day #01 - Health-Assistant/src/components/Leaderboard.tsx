import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { 
  Trophy, 
  Medal, 
  Star, 
  Target, 
  Flame,
  Calendar,
  Eye,
  Activity,
  Crown,
  Award,
  Zap
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  points: number;
  earned_at?: string;
  progress?: number;
}

interface UserStats {
  totalPoints: number;
  rank: number;
  achievements: Achievement[];
  currentStreak: number;
  totalSessions: number;
  totalExercises: number;
  totalHours: number;
}

interface LeaderboardProps {
  user: User | null;
}

const Leaderboard = ({ user }: LeaderboardProps) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserStats();
      loadLeaderboard();
    }
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    try {
      // Kullanıcının başarılarını yükle
      const { data: userAchievements, error: achievementsError } = await supabase
        .from('user_achievements')
        .select(`
          achievement_id,
          earned_at,
          achievements (*)
        `)
        .eq('user_id', user.id);

      if (achievementsError) throw achievementsError;

      // Tüm başarıları yükle
      const { data: allAchievements, error: allAchievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: false });

      if (allAchievementsError) throw allAchievementsError;

      // Kullanıcı aktivitelerini yükle
      const { data: activities, error: activitiesError } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;

      // İstatistikleri hesapla
      const totalSessions = activities?.filter(a => a.activity_type === 'posture_session').length || 0;
      const totalExercises = activities?.filter(a => a.activity_type === 'eye_exercise').length || 0;
      const totalHours = Math.round((activities?.reduce((sum, a) => sum + (a.duration || 0), 0) || 0) / 3600);

      // Streak hesapla (basit versiyon)
      const currentStreak = calculateStreak(activities || []);

      // Başarılar ve ilerleme
      const earnedAchievements = userAchievements?.map(ua => ua.achievements) || [];
      const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + (achievement?.points || 0), 0);

      // Tüm başarıları progress ile birlikte işle
      const achievementsWithProgress = allAchievements?.map(achievement => {
        const earned = earnedAchievements.find(ea => ea?.id === achievement.id);
        let progress = 0;

        if (!earned) {
          // İlerlemeyi hesapla
          switch (achievement.requirement_type) {
            case 'sessions_count':
              progress = Math.min(100, (totalSessions / achievement.requirement_value) * 100);
              break;
            case 'exercises_count':
              progress = Math.min(100, (totalExercises / achievement.requirement_value) * 100);
              break;
            case 'total_hours':
              progress = Math.min(100, (totalHours / achievement.requirement_value) * 100);
              break;
            case 'streak_days':
              progress = Math.min(100, (currentStreak / achievement.requirement_value) * 100);
              break;
          }
        } else {
          progress = 100;
        }

        return {
          ...achievement,
          earned_at: earned ? userAchievements?.find(ua => ua.achievement_id === achievement.id)?.earned_at : undefined,
          progress
        };
      }) || [];

      setUserStats({
        totalPoints,
        rank: 1, // Bu gerçek liderlik tablosundan hesaplanacak
        achievements: achievementsWithProgress,
        currentStreak,
        totalSessions,
        totalExercises,
        totalHours
      });

    } catch (error) {
      console.error('Kullanıcı istatistikleri yüklenirken hata:', error);
    }
  };

  const loadLeaderboard = async () => {
    try {
      // Basit liderlik tablosu - sadece profilleri al
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .limit(10);

      if (error) throw error;

      // Her kullanıcı için başarılarını ayrı ayrı al
      const leaderboardData = [];
      if (profiles) {
        for (const profile of profiles) {
          const { data: userAchievements } = await supabase
            .from('user_achievements')
            .select(`
              achievements (points)
            `)
            .eq('user_id', profile.user_id);

          const totalPoints = userAchievements?.reduce((sum: number, ua: any) => 
            sum + (ua.achievements?.points || 0), 0) || 0;
          
          leaderboardData.push({
            user_id: profile.user_id,
            full_name: profile.full_name || 'Anonim Kullanıcı',
            avatar_url: profile.avatar_url,
            totalPoints
          });
        }
      }

      leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);

      setTopUsers(leaderboardData);
    } catch (error) {
      console.error('Liderlik tablosu yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (activities: any[]) => {
    if (!activities.length) return 0;
    
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    // Son 30 günü kontrol et
    for (let i = 0; i < 30; i++) {
      const dayStr = currentDate.toDateString();
      const hasActivity = activities.some(activity => 
        new Date(activity.created_at).toDateString() === dayStr
      );
      
      if (hasActivity) {
        streak++;
      } else if (i > 0) {
        break; // Streak bozuldu
      }
      
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getAchievementIcon = (iconText: string) => {
    const iconMap: { [key: string]: any } = {
      '🎯': Target,
      '📅': Calendar,
      '👁️': Eye,
      '🏆': Trophy,
      '⭐': Star,
    };
    
    const IconComponent = iconMap[iconText] || Star;
    return <IconComponent className="h-6 w-6" />;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Yükleniyor...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Kullanıcı Özet Kartı */}
      <Card className="bg-gradient-wellness text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Sıralama & Başarılar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats?.totalPoints || 0}</div>
              <div className="text-sm opacity-90">Toplam Puan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Flame className="h-5 w-5" />
                {userStats?.currentStreak || 0}
              </div>
              <div className="text-sm opacity-90">Günlük Seri</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats?.totalSessions || 0}</div>
              <div className="text-sm opacity-90">Toplam Seans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats?.totalExercises || 0}</div>
              <div className="text-sm opacity-90">Egzersiz</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Başarılar</TabsTrigger>
          <TabsTrigger value="leaderboard">Liderlik Tablosu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {userStats?.achievements?.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned_at ? "border-primary bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${achievement.earned_at ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        {achievement.earned_at && (
                          <Badge variant="default" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Kazanıldı
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {achievement.points} puan
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {!achievement.earned_at && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>İlerleme</span>
                            <span>{Math.round(achievement.progress || 0)}%</span>
                          </div>
                          <Progress value={achievement.progress || 0} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                En İyi 10 Kullanıcı
              </CardTitle>
              <CardDescription>
                Toplam puana göre sıralama
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={user.user_id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 min-w-[60px]">
                      {getRankIcon(index + 1)}
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{user.full_name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{user.totalPoints}</div>
                      <div className="text-xs text-muted-foreground">puan</div>
                    </div>
                  </div>
                ))}
                
                {topUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz liderlik tablosunda kimse yok.</p>
                    <p className="text-sm">İlk siz olun!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;