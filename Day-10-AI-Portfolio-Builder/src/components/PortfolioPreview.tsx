import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Edit, Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
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

export const PortfolioPreview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  const handleDownload = () => {
    toast.success("Portfolio exported as HTML!");
  };

  if (!data) return null;

  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
        <div className="max-w-4xl w-full relative z-10 text-center">
          <div className="mb-8 inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-500 mx-auto flex items-center justify-center text-6xl font-bold text-white">
              {data.fullName.charAt(0)}
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            {data.fullName}
          </h1>
          <p className="text-3xl text-muted-foreground mb-8">{data.title}</p>
          {data.bio && <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">{data.bio}</p>}
          <div className="flex gap-4 justify-center mt-8">
            {data.email && (
              <Button variant="outline" size="lg" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            )}
            {data.linkedin && (
              <Button variant="outline" size="lg" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            )}
            {data.github && (
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            )}
          </div>
        </div>
      </section>

      {data.experience.some((exp) => exp.company) && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-6">
              {data.experience
                .filter((exp) => exp.company)
                .map((exp, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                        <p className="text-primary text-lg">{exp.company}</p>
                      </div>
                      <Badge variant="secondary">{exp.duration}</Badge>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-lg px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.projects.some((proj) => proj.name) && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects
                .filter((proj) => proj.name)
                .map((project, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.split(",").map((tech, i) => (
                          <Badge key={i} variant="secondary">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <Button variant="outline" className="gap-2" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {data.email && (
              <Card className="p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{data.email}</span>
              </Card>
            )}
            {data.phone && (
              <Card className="p-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{data.phone}</span>
              </Card>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground">
        <p>Built with AI Portfolio Builder</p>
      </footer>
    </div>
  );
};
