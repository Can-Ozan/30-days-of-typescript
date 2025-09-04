import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Bot,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Özellikler", href: "#features", type: "scroll" },
    { label: "Dashboard", href: "#dashboard", type: "scroll" },
    { label: "Pro", href: "/pro", type: "link" },
    { label: "Hakkımızda", href: "/about", type: "link" },
    { label: "İletişim", href: "/contact", type: "link" }
  ];

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AI Finance
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              item.type === "scroll" ? (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-smooth group-hover:w-full" />
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-smooth group-hover:w-full" />
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login"
              className="px-4 py-2 text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              Giriş Yap
            </Link>
            <Link 
              to="/register"
              className="px-4 py-2 gradient-hero text-white rounded-lg hover:shadow-glow transition-smooth font-medium"
            >
              Kayıt Ol
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                item.type === "scroll" ? (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href.replace('#', ''))}
                    className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-smooth font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-smooth font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              <div className="pt-4 space-y-2 border-t border-border/20">
                <Link 
                  to="/login"
                  className="block w-full py-2 text-muted-foreground hover:text-primary transition-smooth font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link 
                  to="/register"
                  className="block w-full py-2 gradient-hero text-white rounded-lg hover:shadow-glow transition-smooth font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;