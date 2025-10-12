import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, User, Briefcase, Code, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PortfolioData {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  skills: string;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Experience", icon: Briefcase },
  { id: 3, title: "Skills & Projects", icon: Code },
  { id: 4, title: "Contact", icon: Mail },
];

export const Builder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<PortfolioData>({
    fullName: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    skills: "",
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
  });

  const updateField = (field: keyof PortfolioData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { name: "", description: "", technologies: "", link: "" }],
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData({ ...data, projects: newProjects });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [...data.experience, { company: "", role: "", duration: "", description: "" }],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setData({ ...data, experience: newExperience });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGenerate();
    }
  };

  const handleGenerate = () => {
    if (!data.fullName || !data.title) {
      toast.error("Please fill in at least your name and title");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      localStorage.setItem("portfolioData", JSON.stringify(data));
      navigate("/preview");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            AI Portfolio Builder
          </h1>
          <p className="text-muted-foreground text-lg">Create your stunning portfolio in minutes</p>
        </div>

        <div className="flex justify-between mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-2 transition-all ${
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline font-medium">{step.title}</span>
              </div>
            );
          })}
        </div>

        <Card className="p-8 shadow-xl backdrop-blur-sm bg-card/80">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <User className="text-primary" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={data.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    placeholder="Full Stack Developer"
                    value={data.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    value={data.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="text-primary" />
                Work Experience
              </h2>
              {data.experience.map((exp, index) => (
                <Card key={index} className="p-4 space-y-4 bg-secondary/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        placeholder="Your Role"
                        value={exp.role}
                        onChange={(e) => updateExperience(index, "role", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      placeholder="Jan 2020 - Present"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, "duration", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="What did you do?"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full">
                + Add Experience
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code className="text-primary" />
                Skills & Projects
              </h2>
              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  placeholder="React, TypeScript, Node.js, Python..."
                  value={data.skills}
                  onChange={(e) => updateField("skills", e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <Label>Projects</Label>
                {data.projects.map((project, index) => (
                  <Card key={index} className="p-4 space-y-4 bg-secondary/50">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        placeholder="My Awesome Project"
                        value={project.name}
                        onChange={(e) => updateProject(index, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="What does it do?"
                        value={project.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Technologies</Label>
                        <Input
                          placeholder="React, Node.js"
                          value={project.technologies}
                          onChange={(e) => updateProject(index, "technologies", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Link</Label>
                        <Input
                          placeholder="https://..."
                          value={project.link}
                          onChange={(e) => updateProject(index, "link", e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                <Button onClick={addProject} variant="outline" className="w-full">
                  + Add Project
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Mail className="text-primary" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/username"
                    value={data.linkedin}
                    onChange={(e) => updateField("linkedin", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="github.com/username"
                    value={data.github}
                    onChange={(e) => updateField("github", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={isGenerating} className="gap-2">
              {isGenerating ? (
                <>
                  <Sparkles className="animate-spin" />
                  Generating...
                </>
              ) : currentStep === 4 ? (
                <>
                  Generate Portfolio
                  <Sparkles />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
