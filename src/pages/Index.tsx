import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { PartnersSection } from "@/components/PartnersSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { Link } from "react-router-dom"

export default function Index() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <footer className="py-10 px-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} СберБанк Онлайн. Лицензия ЦБ РФ № 1481. Все права защищены.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) }} className="hover:text-white transition-colors cursor-pointer">
              Возможности
            </a>
            <Link to="/settings" className="hover:text-white transition-colors">Настройки</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Личный кабинет</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
