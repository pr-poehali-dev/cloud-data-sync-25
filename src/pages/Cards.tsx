import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const cards = [
  { name: "СберКарта Premium", number: "4276 3801 2345 4521", balance: "248 500,00 ₽", type: "VISA", color: "from-[#1a8030] to-[#21A038]", limit: 500000, spent: 251500 },
  { name: "Накопительный счёт", number: "40817 810 0 0001 1234", balance: "1 350 000,00 ₽", type: "SAVINGS", color: "from-[#1a2a50] to-[#2040a0]", limit: null, spent: 0 },
  { name: "СберКарта Credit", number: "5469 3801 8832 0012", balance: "-45 200,00 ₽", type: "MasterCard", color: "from-[#3d1a00] to-[#7a3500]", limit: 150000, spent: 45200 },
]

const operations = [
  { label: "Пополнить", icon: "ArrowDownLeft" },
  { label: "Перевести", icon: "SendHorizontal" },
  { label: "Реквизиты", icon: "FileText" },
  { label: "Заблокировать", icon: "Lock" },
]

export default function Cards() {
  const [selected, setSelected] = useState(0)
  const [showNumber, setShowNumber] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [toast, setToast] = useState("")

  const card = cards[selected]

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 2500)
  }

  const handleAction = (label: string) => {
    if (label === "Реквизиты") {
      setShowNumber(true)
    } else if (label === "Заблокировать") {
      setBlocked((b) => !b)
      showToast(blocked ? "Карта разблокирована" : "Карта заблокирована")
    } else {
      showToast(`${label}: открывается...`)
    }
  }

  return (
    <DashboardLayout active="Карты и счета">
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Карты и счета</h1>
          <Button className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl text-sm">
            <Icon name="Plus" size={16} className="mr-2" /> Добавить карту
          </Button>
        </div>

        {/* Cards list */}
        <div className="flex gap-4 overflow-x-auto pb-3 mb-6">
          {cards.map((c, i) => (
            <div
              key={i}
              onClick={() => { setSelected(i); setShowNumber(false) }}
              className={`flex-shrink-0 w-64 rounded-2xl bg-gradient-to-br ${c.color} p-5 cursor-pointer transition-all ${selected === i ? "ring-2 ring-green-500 ring-offset-2 ring-offset-[#0a0a0a]" : "opacity-70 hover:opacity-90"}`}
            >
              <div className="flex items-start justify-between mb-8">
                <p className="text-xs text-white/70">{c.name}</p>
                <span className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded-full">{c.type}</span>
              </div>
              <p className="text-lg font-bold text-white mb-1">{c.balance}</p>
              <p className="text-xs text-white/60">
                {showNumber && selected === i ? c.number : c.number.replace(/\d(?=\d{4})/g, "•").slice(0, 19)}
              </p>
            </div>
          ))}
        </div>

        {/* Card detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Operations */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Действия с картой</h2>
            <div className="grid grid-cols-2 gap-3">
              {operations.map((op) => (
                <button
                  key={op.label}
                  onClick={() => handleAction(op.label)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                    op.label === "Заблокировать" && blocked
                      ? "border-red-700 bg-red-500/10"
                      : "border-[#262626] bg-[#1a1a1a] hover:border-green-800 hover:bg-green-500/5"
                  }`}
                >
                  <Icon name={op.icon} fallback="Circle" size={20} className={op.label === "Заблокировать" && blocked ? "text-red-400" : "text-green-400"} />
                  <span className="text-xs text-gray-400">{op.label === "Заблокировать" && blocked ? "Разблокировать" : op.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white mb-4">Информация</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Баланс</span>
                <span className="text-white font-medium">{card.balance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Тип карты</span>
                <span className="text-white">{card.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Номер</span>
                <span className="text-white font-mono">{showNumber ? card.number : "•••• •••• •••• " + card.number.slice(-4)}</span>
              </div>
              {card.limit && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Лимит</span>
                    <span className="text-white">{card.limit.toLocaleString("ru")} ₽</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Использовано</span>
                      <span>{Math.round(card.spent / card.limit * 100)}%</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.round(card.spent / card.limit * 100)}%` }} />
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Статус</span>
                <span className={blocked ? "text-red-400" : "text-green-400"}>{blocked ? "Заблокирована" : "Активна"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-[#21A038] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
            <Icon name="Check" size={16} /> {toast}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
