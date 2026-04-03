import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/DashboardLayout"
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

const quickActions = [
  { icon: "SendHorizontal", label: "Перевод", path: "/transfers" },
  { icon: "Receipt", label: "Платёж", path: "/payments" },
  { icon: "QrCode", label: "QR-оплата", path: "/payments" },
  { icon: "CreditCard", label: "Пополнить", path: "/cards" },
  { icon: "Phone", label: "Мобильный", path: "/payments" },
  { icon: "Home", label: "ЖКХ", path: "/payments" },
  { icon: "ShoppingBag", label: "Покупки", path: "/payments" },
  { icon: "MoreHorizontal", label: "Ещё", path: "/history" },
]

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState(0)
  const navigate = useNavigate()

  return (
    <DashboardLayout active="Главная">
      <div className="p-6 space-y-6">
        {/* Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Мои карты и счета</h2>
            <Link to="/cards" className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1">
              Все счета <Icon name="ChevronRight" size={14} />
            </Link>
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

            <Link to="/cards" className="flex-shrink-0 w-64 rounded-2xl border-2 border-dashed border-[#2a2a2a] p-5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-green-400 hover:border-green-800 transition-colors cursor-pointer">
              <Icon name="Plus" size={24} />
              <span className="text-sm">Добавить карту</span>
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-base font-semibold text-white mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#141414] border border-[#262626] hover:border-green-800 hover:bg-green-500/5 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Icon name={action.icon} fallback="Circle" size={18} className="text-green-400" />
                </div>
                <span className="text-xs text-gray-400">{action.label}</span>
              </Link>
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
              <Link to="/investments">
                <Button className="w-full mt-4 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-800 rounded-xl">
                  Открыть портфель
                </Button>
              </Link>
            </div>
          </div>

          {/* Transactions */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Последние операции</h2>
              <Link to="/history" className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1">
                История <Icon name="ChevronRight" size={14} />
              </Link>
            </div>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
              {transactions.map((tx, i) => (
                <Link
                  to="/history"
                  key={i}
                  className={`flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors ${i < transactions.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}
                >
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
