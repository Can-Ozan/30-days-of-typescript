import { FileText, Crown, Settings, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import React from "react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

interface HeaderProps {
  isPremium?: boolean
  onUpgrade?: () => void
}

export function Header({ isPremium = false, onUpgrade }: HeaderProps) {
  const navigate = useNavigate()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-ai-gradient rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">DokümanAI</h1>
            <p className="text-xs text-muted-foreground">Akıllı Belge Sınıflandırıcı</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Menu className="w-4 h-4 mr-2" />
                  Menü
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Sparkles className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            DokümanAI
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            AI destekli belge sınıflandırma platformu
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/" title="Ana Sayfa">
                      Belge sınıflandırma aracına ulaşın
                    </ListItem>
                    <ListItem href="/premium" title="Premium Özellikler">
                      Gelişmiş AI özellikleri keşfedin
                    </ListItem>
                    <ListItem href="/api-docs" title="API Dokümantasyonu">
                      RESTful API entegrasyonu rehberi
                    </ListItem>
                    <ListItem href="/settings" title="Ayarlar">
                      Hesap ayarlarınızı yönetin
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Ayarlar
          </Button>
          
          {isPremium ? (
            <Badge className="bg-premium-gradient text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              className="border-premium-gold/50 text-premium-gold hover:bg-premium-gold/10"
              onClick={onUpgrade}
            >
              <Crown className="w-4 h-4 mr-2" />
              Premium
            </Button>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}