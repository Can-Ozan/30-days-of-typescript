import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  RotateCcw, 
  Timer, 
  Play, 
  Pause, 
  SkipForward,
  CheckCircle,
  Activity,
  Zap,
  Heart
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  steps: string[];
  category: "eye" | "stretch" | "posture" | "breathing";
  difficulty: "easy" | "medium" | "hard";
  benefits: string[];
}

const exercises: Exercise[] = [
  {
    id: "eye-20-20-20",
    name: "20-20-20 Kuralı",
    description: "Göz yorgunluğunu azaltan klasik egzersiz",
    duration: 60,
    category: "eye",
    difficulty: "easy",
    steps: [
      "20 saniye boyunca 20 feet (6 metre) uzağa bakın",
      "Gözlerinizi yavaşça hareket ettirin",
      "Birkaç kez göz kırpın",
      "Normal bakışınıza dönün"
    ],
    benefits: ["Göz yorgunluğunu azaltır", "Odaklanma yeteneğini artırır", "Kuru göz sendromundan korur"]
  },
  {
    id: "neck-stretch",
    name: "Boyun Esneme",
    description: "Boyun ve omuz gerginliğini gidermek için",
    duration: 120,
    category: "stretch",
    difficulty: "easy",
    steps: [
      "Başınızı yavaşça sağa çevirin ve 15 saniye tutun",
      "Başınızı yavaşça sola çevirin ve 15 saniye tutun",
      "Başınızı öne doğru eğin ve 15 saniye tutun",
      "Başınızı arkaya doğru hafifçe çekin ve 15 saniye tutun"
    ],
    benefits: ["Boyun gerginliğini azaltır", "Kan dolaşımını artırır", "Başağrısını önler"]
  },
  {
    id: "shoulder-rolls",
    name: "Omuz Döndürme",
    description: "Omuz kaslarını rahatlatmak için",
    duration: 90,
    category: "stretch",
    difficulty: "easy",
    steps: [
      "Omuzlarınızı yavaşça öne doğru 5 kez döndürün",
      "Omuzlarınızı yavaşça arkaya doğru 5 kez döndürün",
      "Omuzlarınızı kaldırıp 5 saniye tutun",
      "Omuzlarınızı rahatça bırakın"
    ],
    benefits: ["Omuz gerginliğini azaltır", "Duruşu iyileştirir", "Üst vücut dolaşımını artırır"]
  },
  {
    id: "deep-breathing",
    name: "Derin Nefes Alma",
    description: "Stresi azaltan nefes egzersizi",
    duration: 180,
    category: "breathing",
    difficulty: "medium",
    steps: [
      "Rahat bir pozisyonda oturun",
      "4 saniye boyunca burnunuzdan nefes alın",
      "7 saniye nefesi tutun",
      "8 saniye boyunca ağzınızdan nefes verin",
      "Bu döngüyü 4 kez tekrarlayın"
    ],
    benefits: ["Stresi azaltır", "Konsantrasyonu artırır", "Kan basıncını düzenler"]
  },
  {
    id: "spinal-twist",
    name: "Omurga Döndürme",
    description: "Omurga esnekliğini artırma egzersizi",
    duration: 120,
    category: "posture",
    difficulty: "medium",
    steps: [
      "Sandalyede dik oturun",
      "Gövdenizi yavaşça sağa çevirin",
      "15 saniye bu pozisyonda kalın",
      "Merkeze dönün ve sola çevirin",
      "15 saniye bu pozisyonda kalın"
    ],
    benefits: ["Omurga esnekliğini artırır", "Bel ağrısını azaltır", "Sindirim sistemini destekler"]
  }
];

export const ExerciseGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const categories = [
    { id: "all", name: "Tümü", icon: Activity },
    { id: "eye", name: "Göz", icon: Eye },
    { id: "stretch", name: "Esneme", icon: RotateCcw },
    { id: "posture", name: "Duruş", icon: Activity },
    { id: "breathing", name: "Nefes", icon: Heart }
  ];

  const filteredExercises = selectedCategory === "all" 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-primary";
      case "medium": return "bg-warning";
      case "hard": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "eye": return Eye;
      case "stretch": return RotateCcw;
      case "posture": return Activity;
      case "breathing": return Heart;
      default: return Activity;
    }
  };

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setTimeRemaining(exercise.duration);
    setIsPlaying(true);
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeRemaining(0);
  };

  const nextStep = () => {
    if (activeExercise && currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Egzersiz tamamlandı
      stopExercise();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {!activeExercise ? (
        <>
          {/* Kategori Seçimi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Egzersiz Rehberi
              </CardTitle>
              <CardDescription>
                Sağlıklı çalışma için özel tasarlanmış egzersizler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map(({ id, name, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={selectedCategory === id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Egzersiz Listesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExercises.map((exercise) => {
              const CategoryIcon = getCategoryIcon(exercise.category);
              return (
                <Card key={exercise.id} className="hover:shadow-wellness transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CategoryIcon className="h-5 w-5" />
                        {exercise.name}
                      </CardTitle>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty === "easy" ? "Kolay" : 
                         exercise.difficulty === "medium" ? "Orta" : "Zor"}
                      </Badge>
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {formatTime(exercise.duration)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        {exercise.steps.length} adım
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Faydaları:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {exercise.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="wellness"
                      className="w-full"
                      onClick={() => startExercise(exercise)}
                    >
                      <Play className="h-4 w-4" />
                      Egzersizi Başlat
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        /* Aktif Egzersiz */
        <div className="space-y-6">
          <Card className="bg-gradient-wellness text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                {activeExercise.name}
              </CardTitle>
              <CardDescription className="text-white/80">
                Adım {currentStep + 1} / {activeExercise.steps.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <Progress 
                  value={(currentStep / activeExercise.steps.length) * 100} 
                  className="bg-white/20"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mevcut Adım</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl">
                  {currentStep + 1}
                </div>
                <p className="text-lg font-medium">
                  {activeExercise.steps[currentStep]}
                </p>
                
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={stopExercise}
                  >
                    <Pause className="h-4 w-4" />
                    Durdur
                  </Button>
                  <Button
                    variant="energy"
                    onClick={nextStep}
                  >
                    {currentStep < activeExercise.steps.length - 1 ? (
                      <>
                        <SkipForward className="h-4 w-4" />
                        Sonraki Adım
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Tamamla
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tüm Adımlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activeExercise.steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      index === currentStep 
                        ? "border-primary bg-primary/10" 
                        : index < currentStep
                          ? "border-green-500 bg-green-500/10"
                          : "border-muted bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === currentStep 
                          ? "bg-primary text-primary-foreground" 
                          : index < currentStep
                            ? "bg-green-500 text-white"
                            : "bg-muted-foreground text-background"
                      }`}>
                        {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className={`text-sm ${index === currentStep ? "font-medium" : ""}`}>
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};