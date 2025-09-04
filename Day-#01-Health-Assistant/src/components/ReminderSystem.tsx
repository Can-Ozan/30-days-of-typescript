import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bell, 
  Eye, 
  Clock, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Timer,
  Coffee,
  Activity,
  Plus,
  Edit
} from "lucide-react";

interface Reminder {
  id: string;
  type: "eye" | "posture" | "break" | "stretch";
  title: string;
  message: string;
  timeLeft: number;
  totalTime: number;
  priority: "low" | "medium" | "high";
}

export const ReminderSystem = () => {
  const [activeReminders, setActiveReminders] = useState<Reminder[]>([]);
  const [userReminders, setUserReminders] = useState<any[]>([]);
  const [newReminderDialog, setNewReminderDialog] = useState(false);
  const [editReminderDialog, setEditReminderDialog] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [reminderForm, setReminderForm] = useState({
    title: "",
    message: "",
    type: "custom",
    interval: 30,
    priority: "medium"
  });
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReminders(prev => 
        prev.map(reminder => ({
          ...reminder,
          timeLeft: Math.max(0, reminder.timeLeft - 1)
        })).filter(reminder => reminder.timeLeft > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Kullanıcı hatırlatıcılarını yükle
  useEffect(() => {
    loadUserReminders();
  }, []);

  const loadUserReminders = () => {
    // localStorage'dan kullanıcı hatırlatıcıları yükle
    const saved = localStorage.getItem('user_reminders');
    if (saved) {
      setUserReminders(JSON.parse(saved));
    }
  };

  const saveUserReminders = (reminders: any[]) => {
    localStorage.setItem('user_reminders', JSON.stringify(reminders));
    setUserReminders(reminders);
  };

  const addReminder = () => {
    if (!reminderForm.title || !reminderForm.message) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    const newReminder = {
      id: Date.now().toString(),
      ...reminderForm,
      createdAt: new Date()
    };

    const updatedReminders = [...userReminders, newReminder];
    saveUserReminders(updatedReminders);

    setReminderForm({
      title: "",
      message: "",
      type: "custom",
      interval: 30,
      priority: "medium"
    });
    
    setNewReminderDialog(false);
    
    toast({
      title: "Başarılı",
      description: "Hatırlatıcı başarıyla eklendi."
    });
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = userReminders.filter(r => r.id !== id);
    saveUserReminders(updatedReminders);
    
    toast({
      title: "Başarılı",
      description: "Hatırlatıcı silindi."
    });
  };

  const editReminder = (reminder: any) => {
    setSelectedReminder(reminder);
    setReminderForm({
      title: reminder.title,
      message: reminder.message,
      type: reminder.type,
      interval: reminder.interval,
      priority: reminder.priority
    });
    setEditReminderDialog(true);
  };

  const updateReminder = () => {
    if (!reminderForm.title || !reminderForm.message) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    const updatedReminders = userReminders.map(r => 
      r.id === selectedReminder.id 
        ? { ...r, ...reminderForm }
        : r
    );
    
    saveUserReminders(updatedReminders);
    setEditReminderDialog(false);
    setSelectedReminder(null);
    
    toast({
      title: "Başarılı",
      description: "Hatırlatıcı güncellendi."
    });
  };

  const dismissReminder = (id: string) => {
    setActiveReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const completeReminder = (id: string) => {
    // Hatırlatıcıyı tamamla ve istatistikleri güncelle
    const reminder = activeReminders.find(r => r.id === id);
    if (reminder) {
      // Burada tamamlanan aktivite türüne göre istatistik güncelleme yapılabilir
      dismissReminder(id);
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "eye": return Eye;
      case "posture": return Activity;
      case "break": return Coffee;
      case "stretch": return RotateCcw;
      default: return Bell;
    }
  };

  const getReminderColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-destructive bg-destructive/10";
      case "medium": return "border-warning bg-warning/10";
      case "low": return "border-primary bg-primary/10";
      default: return "border-muted bg-muted/10";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return { variant: "destructive" as const, text: "Acil" };
      case "medium": return { variant: "secondary" as const, text: "Orta" };
      case "low": return { variant: "outline" as const, text: "Düşük" };
      default: return { variant: "outline" as const, text: "Normal" };
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Aktif Hatırlatıcılar */}
      {activeReminders.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Aktif Hatırlatıcılar
          </h4>
          {activeReminders.map((reminder) => {
            const Icon = getReminderIcon(reminder.type);
            const progress = ((reminder.totalTime - reminder.timeLeft) / reminder.totalTime) * 100;
            
            return (
              <div
                key={reminder.id}
                className={`p-4 rounded-lg border-2 transition-all animate-pulse-wellness ${getReminderColor(reminder.priority)}`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{reminder.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge {...getPriorityBadge(reminder.priority)}>
                        {getPriorityBadge(reminder.priority).text}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => dismissReminder(reminder.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-muted-foreground">
                    {reminder.message}
                  </p>

                  {/* Progress and Time */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Kalan süre</span>
                      <span className="font-bold">{formatTime(reminder.timeLeft)}</span>
                    </div>
                    <Progress value={100 - progress} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => completeReminder(reminder.id)}
                    >
                      <CheckCircle className="h-3 w-3" />
                      Tamamla
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dismissReminder(reminder.id)}
                    >
                      Ertele
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Kullanıcı Hatırlatıcıları */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Hatırlatıcılarım
          </h4>
          <Dialog open={newReminderDialog} onOpenChange={setNewReminderDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Ekle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Hatırlatıcı</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={reminderForm.title}
                    onChange={(e) => setReminderForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Hatırlatıcı başlığı"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    value={reminderForm.message}
                    onChange={(e) => setReminderForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Hatırlatıcı mesajı"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interval">Aralık (dakika)</Label>
                    <Input
                      id="interval"
                      type="number"
                      value={reminderForm.interval}
                      onChange={(e) => setReminderForm(prev => ({ ...prev, interval: parseInt(e.target.value) || 30 }))}
                      min="1"
                      max="480"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Öncelik</Label>
                    <Select value={reminderForm.priority} onValueChange={(value) => setReminderForm(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Düşük</SelectItem>
                        <SelectItem value="medium">Orta</SelectItem>
                        <SelectItem value="high">Yüksek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewReminderDialog(false)}>İptal</Button>
                <Button onClick={addReminder}>Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-2">
          {userReminders.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Henüz hatırlatıcı eklememişsiniz
                </p>
                <Button variant="outline" size="sm" onClick={() => setNewReminderDialog(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  İlk hatırlatıcınızı ekleyin
                </Button>
              </CardContent>
            </Card>
          ) : (
            userReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{reminder.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {reminder.interval}dk
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{reminder.message}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editReminder(reminder)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Düzenleme Dialog */}
      <Dialog open={editReminderDialog} onOpenChange={setEditReminderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hatırlatıcıyı Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Başlık</Label>
              <Input
                id="edit-title"
                value={reminderForm.title}
                onChange={(e) => setReminderForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Hatırlatıcı başlığı"
              />
            </div>
            <div>
              <Label htmlFor="edit-message">Mesaj</Label>
              <Textarea
                id="edit-message"
                value={reminderForm.message}
                onChange={(e) => setReminderForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Hatırlatıcı mesajı"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-interval">Aralık (dakika)</Label>
                <Input
                  id="edit-interval"
                  type="number"
                  value={reminderForm.interval}
                  onChange={(e) => setReminderForm(prev => ({ ...prev, interval: parseInt(e.target.value) || 30 }))}
                  min="1"
                  max="480"
                />
              </div>
              <div>
                <Label htmlFor="edit-priority">Öncelik</Label>
                <Select value={reminderForm.priority} onValueChange={(value) => setReminderForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditReminderDialog(false)}>İptal</Button>
            <Button onClick={updateReminder}>Güncelle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hızlı Eylemler */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Hızlı Eylemler</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="wellness" size="sm" className="h-12 flex-col gap-1">
            <Eye className="h-4 w-4" />
            <span className="text-xs">Göz Molası</span>
          </Button>
          <Button variant="energy" size="sm" className="h-12 flex-col gap-1">
            <RotateCcw className="h-4 w-4" />
            <span className="text-xs">Esneme</span>
          </Button>
          <Button variant="calm" size="sm" className="h-12 flex-col gap-1">
            <Coffee className="h-4 w-4" />
            <span className="text-xs">Kısa Mola</span>
          </Button>
          <Button variant="outline" size="sm" className="h-12 flex-col gap-1">
            <Activity className="h-4 w-4" />
            <span className="text-xs">Duruş Check</span>
          </Button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">Bugün Tamamlanan</p>
          </div>
          <div>
            <div className="text-lg font-bold text-energy">3</div>
            <p className="text-xs text-muted-foreground">Aktif Hatırlatıcı</p>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">89%</div>
            <p className="text-xs text-muted-foreground">Tamamlama Oranı</p>
          </div>
        </div>
      </div>
    </div>
  );
};