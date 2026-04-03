import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const cards = [
  { name: "СберКарта Premium", number: "•••• •••• •••• 4521", balance: "248 500,00 ₽", type: "VISA", color: "from-[#1a8030] to-[#21A038]" },
  { name: "Накопительный счёт", number: "Счёт 40817 810 0 •••• 1234", balance: "1 350 000,00 ₽", type: "SAVINGS", color: "from-[#1a2a50] to-[#2040a0]" },
  { name: "СберКарта Credit", number: "•••• •••• •••• 8832", balance: "-45 200,00 ₽", type: "MasterCard", color: "from-[#3d1a00] to-[#7a3500]" },
]

const transactions = [
  { icon: "ShoppingCart", name: "Пятёрочка", category: "Продукты", date: "Сегодня, 12:34", amount: "-1 850 ₽", positive: false },
  { icon: "Zap", name: "ЖКХ Мосэнерго", category: "Коммуналка", date: "Сегодня, 10:00", amount: "-4 200 ₽", positive: false },
  { icon: "ArrowDownLeft", name: "Петров А.В.", category: "Входящий перевод", date: "Вчера, 18:45", amount: "+25 000 ₽", positive: true },
  { icon: "Coffee", name: "Starbucks", category: "Кафе", date: "Вчера, 09:12", amount: "-480 ₽", positive: false },
  { icon: "Car", name: "АЗС Лукойл", category: "Транспорт", date: "03.04.2024", amount: "-3 200 ₽", positive: false },
  { icon: "TrendingUp", name: "Дивиденды СберИнвест", category: "Инвестиции", date: "02.04.2024", amount: "+12 750 ₽", positive: true },
]

const menuItems = [
  { icon: "LayoutDashboard", label: "Главная", active: true },
  { icon: "CreditCard", label: "Карты и счета" },
  { icon: "SendHorizontal", label: "Переводы" },
  { icon: "Receipt", label: "Платежи" },
  { icon: "TrendingUp", label: "Инвестиции" },
  { icon: "PiggyBank", label: "Вклады" },
  { icon: "ShieldCheck", label: "Страхование" },
  { icon: "Settings", label: "Настройки" },
]

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState(0)
  const [activeMenu, setActiveMenu] = useState("Главная")

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#1a1a1a] flex flex-col p-4 hidden md:flex">
        <Link to="/" className="flex items-center gap-2 px-3 py-3 mb-6">
          <SberLogo />
          <span className="text-lg font-bold text-white">СберБанк<sup className="text-xs font-normal text-green-500">Онлайн</sup></span>
        </Link>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeMenu === item.label
                  ? "bg-green-500/15 text-green-400 font-medium"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <Icon name={item.icon} fallback="Circle" size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-[#1a1a1a] pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#141414]">
            <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold text-white">
              АП
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Алексей Петров</p>
              <p className="text-xs text-gray-500">Премиум клиент</p>
            </div>
            <Link to="/">
              <Icon name="LogOut" size={16} className="text-gray-500 hover:text-white cursor-pointer" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]">
          <div>
            <h1 className="text-xl font-bold text-white">Добрый день, Алексей!</h1>
            <p className="text-sm text-gray-400">Пятница, 5 апреля 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl bg-[#141414] border border-[#262626] text-gray-400 hover:text-white">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
            </button>
            <button className="p-2 rounded-xl bg-[#141414] border border-[#262626] text-gray-400 hover:text-white">
              <Icon name="Search" size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Мои карты и счета</h2>
              <button className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1">
                Все счета <Icon name="ChevronRight" size={14} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {cards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className={`flex-shrink-0 w-64 rounded-2xl bg-gradient-to-br ${card.color} p-5 cursor-pointer transition-all ${
                    activeCard === i ? "ring-2 ring-green-500 ring-offset-2 ring-offset-[#0a0a0a]" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <p className="text-xs text-white/70">{card.name}</p>
                    <span className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded-full">{card.type}</span>
                  </div>
                  <p className="text-lg font-bold text-white mb-1">{card.balance}</p>
                  <p className="text-xs text-white/60">{card.number}</p>
                </div>
              ))}

              <button className="flex-shrink-0 w-64 rounded-2xl border-2 border-dashed border-[#2a2a2a] p-5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-green-400 hover:border-green-800 transition-colors cursor-pointer">
                <Icon name="Plus" size={24} />
                <span className="text-sm">Добавить карту</span>
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-base font-semibold text-white mb-4">Быстрые действия</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {[
                { icon: "SendHorizontal", label: "Перевод" },
                { icon: "Receipt", label: "Платёж" },
                { icon: "QrCode", label: "QR-оплата" },
                { icon: "CreditCard", label: "Пополнить" },
                { icon: "Phone", label: "Мобильный" },
                { icon: "Home", label: "ЖКХ" },
                { icon: "ShoppingBag", label: "Покупки" },
                { icon: "MoreHorizontal", label: "Ещё" },
              ].map((action) => (
                <button key={action.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#141414] border border-[#262626] hover:border-green-800 hover:bg-green-500/5 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Icon name={action.icon} fallback="Circle" size={18} className="text-green-400" />
                  </div>
                  <span className="text-xs text-gray-400">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats + Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-white">Финансы за апрель</h2>
              <div className="rounded-2xl bg-[#141414] border border-[#262626] p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Доходы</span>
                    <span className="text-sm font-semibold text-green-400">+37 750 ₽</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Расходы</span>
                    <span className="text-sm font-semibold text-red-400">-9 730 ₽</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Накопления</span>
                    <span className="text-sm font-semibold text-blue-400">+28 020 ₽</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "48%" }} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#141414] border border-[#262626] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Icon name="TrendingUp" size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Инвестиционный портфель</p>
                    <p className="text-xs text-gray-500">СберИнвест</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">842 350 ₽</p>
                <p className="text-sm text-green-400 mt-1">+12.4% за месяц</p>
                <Button className="w-full mt-4 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-800 rounded-xl">
                  Открыть портфель
                </Button>
              </div>
            </div>

            {/* Transactions */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Последние операции</h2>
                <button className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1">
                  История <Icon name="ChevronRight" size={14} />
                </button>
              </div>
              <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                {transactions.map((tx, i) => (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors ${i < transactions.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}>
                    <div className="h-10 w-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <Icon name={tx.icon} fallback="Circle" size={18} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{tx.name}</p>
                      <p className="text-xs text-gray-500">{tx.category} · {tx.date}</p>
                    </div>
                    <span className={`text-sm font-semibold flex-shrink-0 ${tx.positive ? "text-green-400" : "text-white"}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SberLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#21A038" />
      <path
        d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 8.5C20.142 8.5 23.5 11.858 23.5 16C23.5 20.142 20.142 23.5 16 23.5C11.858 23.5 8.5 20.142 8.5 16C8.5 11.858 11.858 8.5 16 8.5ZM16 11C13.239 11 11 13.239 11 16C11 18.761 13.239 21 16 21C18.761 21 21 18.761 21 16H18.5C18.5 17.381 17.381 18.5 16 18.5C14.619 18.5 13.5 17.381 13.5 16C13.5 14.619 14.619 13.5 16 13.5V11Z"
        fill="white"
      />
    </svg>
  )
}
