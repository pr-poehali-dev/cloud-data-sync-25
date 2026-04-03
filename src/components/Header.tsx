import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#1f1f1f]">
      <div className="flex items-center gap-2">
        <SberLogo />
        <span className="text-xl font-bold text-white tracking-tight">
          СберБанк<sup className="text-xs font-normal text-green-500">Онлайн</sup>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Карты и счета
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
          Платежи <ChevronDown className="h-4 w-4" />
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Вклады
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Кредиты
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Инвестиции
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button
            variant="outline"
            className="rounded-full border-green-600 text-green-400 hover:bg-green-500/10 hover:text-green-300 bg-transparent"
          >
            Войти
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button className="rounded-full bg-[#21A038] hover:bg-[#1a8030] text-white">
            Личный кабинет
          </Button>
        </Link>
      </div>
    </header>
  )
}

function SberLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#21A038" />
      <path
        d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 8.5C20.142 8.5 23.5 11.858 23.5 16C23.5 20.142 20.142 23.5 16 23.5C11.858 23.5 8.5 20.142 8.5 16C8.5 11.858 11.858 8.5 16 8.5ZM16 11C13.239 11 11 13.239 11 16C11 18.761 13.239 21 16 21C18.761 21 21 18.761 21 16H18.5C18.5 17.381 17.381 18.5 16 18.5C14.619 18.5 13.5 17.381 13.5 16C13.5 14.619 14.619 13.5 16 13.5V11Z"
        fill="white"
      />
    </svg>
  )
}
