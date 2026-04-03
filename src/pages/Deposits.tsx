import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const deposits = [
  {
    name: "Вклад «Лучший»",
    balance: "500 000 ₽",
    rate: "16.5%",
    period: "12 мес.",
    endDate: "01.04.2025",
    income: "+82 500 ₽",
    color: "from-[#1a8030] to-[#21A038]",
  },
  {
    name: "Накопительный счёт",
    balance: "850 000 ₽",
    rate: "13.0%",
    period: "Бессрочно",
    endDate: "—",
    income: "+110 500 ₽",
    color: "from-[#1a2a50] to-[#2040a0]",
  },
]

const offers = [
  { name: "Вклад «Лучший»", rate: "16.5%", period: "12 мес.", minAmount: "10 000 ₽", tag: "Популярный" },
  { name: "Вклад «Надёжный»", rate: "14.0%", period: "6 мес.", minAmount: "50 000 ₽", tag: null },
  { name: "Вклад «Доходный»", rate: "12.5%", period: "3 мес.", minAmount: "1 000 ₽", tag: "Без ограничений" },
]

export default function Deposits() {
  const [openOffer, setOpenOffer] = useState<typeof offers[0] | null>(null)
  const [amount, setAmount] = useState("")
  const [success, setSuccess] = useState(false)

  const handleOpen = () => {
    if (!amount) return
    setSuccess(true)
  }

  return (
    <DashboardLayout active="Вклады">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Вклады и накопительные счета</h1>

        {success ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Вклад открыт!</h2>
            <p className="text-gray-400 mb-1">{openOffer?.name}</p>
            <p className="text-gray-500 text-sm mb-8">Сумма: {Number(amount).toLocaleString("ru")} ₽ · Ставка: {openOffer?.rate}</p>
            <Button onClick={() => { setSuccess(false); setOpenOffer(null); setAmount("") }} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              К вкладам
            </Button>
          </div>
        ) : openOffer ? (
          <div className="space-y-4">
            <button onClick={() => setOpenOffer(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-5">
              <h2 className="text-xl font-bold text-white">{openOffer.name}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-2xl font-bold text-green-400">{openOffer.rate}</p>
                  <p className="text-xs text-gray-400 mt-1">Ставка</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-2xl font-bold text-white">{openOffer.period}</p>
                  <p className="text-xs text-gray-400 mt-1">Срок</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-2xl font-bold text-white">{openOffer.minAmount}</p>
                  <p className="text-xs text-gray-400 mt-1">Минимум</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Сумма вклада</label>
                <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">₽</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="flex-1 bg-transparent text-white outline-none text-sm"
                  />
                </div>
                {amount && (
                  <p className="text-xs text-green-400 mt-2">
                    Доход за {openOffer.period}: +{Math.round(Number(amount) * parseFloat(openOffer.rate) / 100).toLocaleString("ru")} ₽
                  </p>
                )}
              </div>
              <Button onClick={handleOpen} disabled={!amount} className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold disabled:opacity-40">
                Открыть вклад
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* My deposits */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Мои вклады</p>
              <div className="space-y-3">
                {deposits.map((d, i) => (
                  <div key={i} className={`rounded-2xl bg-gradient-to-r ${d.color} p-5`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-white/70">{d.name}</p>
                        <p className="text-2xl font-bold text-white mt-1">{d.balance}</p>
                      </div>
                      <span className="text-2xl font-bold text-white/80">{d.rate}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-white/70">
                      <span>Срок: {d.period} {d.endDate !== "—" ? `· до ${d.endDate}` : ""}</span>
                      <span className="text-green-300">{d.income}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Открыть новый вклад</p>
              <div className="space-y-3">
                {offers.map((offer, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl bg-[#141414] border border-[#262626] p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Icon name="PiggyBank" size={22} className="text-green-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{offer.name}</p>
                          {offer.tag && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{offer.tag}</span>}
                        </div>
                        <p className="text-xs text-gray-500">{offer.period} · от {offer.minAmount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-green-400">{offer.rate}</p>
                      <Button onClick={() => setOpenOffer(offer)} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl text-sm">
                        Открыть
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
