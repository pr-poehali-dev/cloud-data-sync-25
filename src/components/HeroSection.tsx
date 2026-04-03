import { ArrowUpRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-14 pb-10 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] py-2 text-sm px-3 border border-[#2a2a2a]">
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">НОВИНКА</span>
        <span className="text-gray-300">СберПрайм — привилегии для каждого клиента</span>
        <ArrowUpRight className="h-4 w-4 text-gray-400" />
      </div>

      <h1 className="mb-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-tight">
        Ваш банк всегда{" "}
        <span className="text-[#21A038]">рядом</span>
      </h1>

      <p className="mb-8 max-w-xl text-gray-400 text-lg">
        Управляйте счетами, переводами, вкладами и кредитами в одном личном кабинете. Безопасно, быстро, удобно.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <Link to="/login">
          <Button className="rounded-full bg-[#21A038] px-8 py-3 hover:bg-[#1a8030] text-white text-base font-semibold">
            Войти в личный кабинет <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" className="rounded-full border-gray-700 bg-transparent text-white hover:bg-gray-800 px-8 py-3 text-base">
          <Icon name="Play" size={16} className="mr-2 fill-green-500 text-green-500" /> Узнать возможности
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Icon name="ShieldCheck" size={16} className="text-green-500" />
          <span>Защита вкладов до 1,4 млн ₽</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-green-500" />
          <span>Переводы за 5 секунд</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-green-500" />
          <span>Поддержка 24/7</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Smartphone" size={16} className="text-green-500" />
          <span>Мобильный банк</span>
        </div>
      </div>
    </section>
  )
}
