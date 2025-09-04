import { Header } from "@/components/header"
import { ApiDocumentation } from "@/components/api-documentation"

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <ApiDocumentation />
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 DokümanAI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default ApiDocs