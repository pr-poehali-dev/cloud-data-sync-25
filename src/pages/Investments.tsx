import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const portfolio = [
  { name: "Сбербанк", ticker: "SBER", price: "312.45 ₽", change: "+2.3%", positive: true, count: 100, total: "31 245 ₽" },
  { name: "Газпром", ticker: "GAZP", price: "168.20 ₽", change: "-0.8%", positive: false, count: 200, total: "33 640 ₽" },
  { name: "Лукойл", ticker: "LKOH", price: "7 245.00 ₽", change: "+1.1%", positive: true, count: 10, total: "72 450 ₽" },
  { name: "Яндекс", ticker: "YNDX", price: "4 120.00 ₽", change: "+4.2%", positive: true, count: 15, total: "61 800 ₽" },
]

const topStocks = [
  { name: "Норникель", ticker: "GMKN", price: "15 640 ₽", change: "+3.1%", positive: true },
  { name: "Роснефть", ticker: "ROSN", price: "574.10 ₽", change: "+0.9%", positive: true },
  { name: "МТС", ticker: "MTSS", price: "242.80 ₽", change: "-0.4%", positive: false },
]

export default function Investments() {
  const [selected, setSelected] = useState<typeof topStocks[0] | null>(null)
  const [buyAmount, setBuyAmount] = useState("")
  const [success, setSuccess] = useState(false)
  const [tab, setTab] = useState<"portfolio" | "market">("portfolio")

  return (
    <DashboardLayout active="Инвестиции">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Инвестиции</h1>

        {success && selected ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Куплено!</h2>
            <p className="text-gray-400 mb-1">{selected.name} ({selected.ticker})</p>
            <p className="text-gray-500 text-sm mb-8">На сумму: {buyAmount} ₽</p>
            <Button onClick={() => { setSuccess(false); setSelected(null); setBuyAmount("") }} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              К инвестициям
            </Button>
          </div>
        ) : selected ? (
          <div className="space-y-4">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                  <p className="text-sm text-gray-400">{selected.ticker} · МосБиржа</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{selected.price}</p>
                  <p className={`text-sm font-medium ${selected.positive ? "text-green-400" : "text-red-400"}`}>{selected.change}</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a1a1a] p-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Открытие</span><span className="text-white">312.00 ₽</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Максимум</span><span className="text-white">318.50 ₽</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Минимум</span><span className="text-white">308.20 ₽</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Объём торгов</span><span className="text-white">1.2 млрд ₽</span></div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Сумма покупки</label>
                <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">₽</span>
                  <input type="number" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} placeholder="Введите сумму" className="flex-1 bg-transparent text-white outline-none text-sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setSuccess(true)} disabled={!buyAmount} className="flex-1 bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl disabled:opacity-40">
                  Купить
                </Button>
                <Button variant="outline" className="flex-1 border-red-800 text-red-400 hover:bg-red-500/10 rounded-xl">
                  Продать
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Total */}
            <div className="rounded-2xl bg-gradient-to-r from-[#1a2a50] to-[#21A038] p-5">
              <p className="text-sm text-white/70">Стоимость портфеля</p>
              <p className="text-4xl font-bold text-white mt-1">199 135 ₽</p>
              <p className="text-sm text-green-300 mt-1">+12.4% за месяц · +24 720 ₽</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 rounded-xl bg-[#141414] border border-[#262626] p-1">
              {(["portfolio", "market"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-[#21A038] text-white" : "text-gray-400 hover:text-white"}`}>
                  {t === "portfolio" ? "Мой портфель" : "Рынок"}
                </button>
              ))}
            </div>

            {tab === "portfolio" ? (
              <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                {portfolio.map((stock, i) => (
                  <button key={i} onClick={() => setSelected(stock)} className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors text-left ${i < portfolio.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}>
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">{stock.ticker.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{stock.name}</p>
                      <p className="text-xs text-gray-500">{stock.count} шт. · {stock.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{stock.total}</p>
                      <p className={`text-xs ${stock.positive ? "text-green-400" : "text-red-400"}`}>{stock.change}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                {topStocks.map((stock, i) => (
                  <button key={i} onClick={() => setSelected(stock)} className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors text-left ${i < topStocks.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}>
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">{stock.ticker.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{stock.name}</p>
                      <p className="text-xs text-gray-500">{stock.ticker} · МосБиржа</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{stock.price}</p>
                      <p className={`text-xs ${stock.positive ? "text-green-400" : "text-red-400"}`}>{stock.change}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
