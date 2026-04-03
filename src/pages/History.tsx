import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import Icon from "@/components/ui/icon"

const allTransactions = [
  { icon: "ShoppingCart", name: "Пятёрочка", category: "Продукты", date: "05.04.2024", time: "12:34", amount: -1850, card: "•••• 4521" },
  { icon: "Zap", name: "Мосэнерго", category: "Коммуналка", date: "05.04.2024", time: "10:00", amount: -4200, card: "•••• 4521" },
  { icon: "ArrowDownLeft", name: "Петров А.В.", category: "Входящий перевод", date: "04.04.2024", time: "18:45", amount: 25000, card: "•••• 4521" },
  { icon: "Coffee", name: "Starbucks", category: "Кафе", date: "04.04.2024", time: "09:12", amount: -480, card: "•••• 8832" },
  { icon: "Car", name: "АЗС Лукойл", category: "Транспорт", date: "03.04.2024", time: "15:30", amount: -3200, card: "•••• 4521" },
  { icon: "TrendingUp", name: "Дивиденды СберИнвест", category: "Инвестиции", date: "02.04.2024", time: "00:00", amount: 12750, card: "•••• 4521" },
  { icon: "ShoppingBag", name: "Wildberries", category: "Покупки", date: "01.04.2024", time: "21:05", amount: -6340, card: "•••• 8832" },
  { icon: "Utensils", name: "Burger King", category: "Кафе", date: "01.04.2024", time: "13:20", amount: -890, card: "•••• 4521" },
  { icon: "Phone", name: "МТС", category: "Связь", date: "31.03.2024", time: "10:00", amount: -600, card: "•••• 4521" },
  { icon: "ArrowDownLeft", name: "Иванова М.С.", category: "Входящий перевод", date: "30.03.2024", time: "17:33", amount: 8000, card: "•••• 4521" },
]

const categories = ["Все", "Входящие", "Исходящие", "Продукты", "Кафе", "Транспорт", "Коммуналка", "Инвестиции"]

export default function History() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Все")
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = allTransactions.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      category === "Все" ||
      (category === "Входящие" && t.amount > 0) ||
      (category === "Исходящие" && t.amount < 0) ||
      t.category === category
    return matchSearch && matchCategory
  })

  return (
    <DashboardLayout active="История">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">История операций</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по операциям..."
            className="w-full rounded-xl bg-[#141414] border border-[#262626] focus:border-green-600 pl-10 pr-4 py-3 text-white outline-none text-sm transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${
                category === cat ? "bg-[#21A038] text-white" : "bg-[#141414] border border-[#262626] text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-3 text-center">
            <p className="text-xs text-gray-400">Операций</p>
            <p className="text-lg font-bold text-white">{filtered.length}</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-3 text-center">
            <p className="text-xs text-gray-400">Приход</p>
            <p className="text-lg font-bold text-green-400">+{filtered.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0).toLocaleString("ru")} ₽</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-3 text-center">
            <p className="text-xs text-gray-400">Расход</p>
            <p className="text-lg font-bold text-red-400">-{Math.abs(filtered.filter(t => t.amount < 0).reduce((a, b) => a + b.amount, 0)).toLocaleString("ru")} ₽</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-50" />
              <p>Операции не найдены</p>
            </div>
          ) : (
            filtered.map((tx, i) => (
              <div key={i}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors text-left ${i < filtered.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}
                >
                  <div className="h-10 w-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                    <Icon name={tx.icon} fallback="Circle" size={18} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{tx.name}</p>
                    <p className="text-xs text-gray-500">{tx.category} · {tx.date}</p>
                  </div>
                  <span className={`text-sm font-semibold flex-shrink-0 ${tx.amount > 0 ? "text-green-400" : "text-white"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("ru")} ₽
                  </span>
                </button>
                {expanded === i && (
                  <div className="px-4 pb-4 pt-0 bg-[#1a1a1a] border-b border-[#1f1f1f]">
                    <div className="rounded-xl bg-[#141414] p-4 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Дата и время</span><span className="text-white">{tx.date} в {tx.time}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Карта</span><span className="text-white">{tx.card}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Категория</span><span className="text-white">{tx.category}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Статус</span><span className="text-green-400">Выполнено</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
