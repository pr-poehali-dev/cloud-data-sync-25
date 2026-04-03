import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const myCredits = [
  {
    name: "Потребительский кредит",
    debt: "245 800 ₽",
    monthly: "12 450 ₽",
    rate: "18.9%",
    nextDate: "15 апреля",
    paid: 62,
  },
]

const creditOffers = [
  { name: "Кредит наличными", rate: "от 16.9%", max: "до 5 000 000 ₽", period: "до 5 лет", tag: "Быстрое решение" },
  { name: "Ипотека", rate: "от 10.9%", max: "до 100 000 000 ₽", period: "до 30 лет", tag: "Господдержка" },
  { name: "Автокредит", rate: "от 14.9%", max: "до 10 000 000 ₽", period: "до 7 лет", tag: null },
  { name: "Кредитная карта", rate: "от 11.9%", max: "до 1 000 000 ₽", period: "льготный период 120 дней", tag: "Популярная" },
]

export default function Credits() {
  const [selected, setSelected] = useState<typeof creditOffers[0] | null>(null)
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("12")
  const [success, setSuccess] = useState(false)

  const rate = selected ? parseFloat(selected.rate.replace("от ", "")) / 100 / 12 : 0
  const months = parseInt(period)
  const n = Number(amount)
  const monthly = n && rate ? Math.round((n * rate) / (1 - Math.pow(1 + rate, -months))) : 0

  return (
    <DashboardLayout active="Кредиты">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Кредиты</h1>

        {success ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h2>
            <p className="text-gray-400 mb-1">{selected?.name}</p>
            <p className="text-gray-500 text-sm mb-2">Сумма: {Number(amount).toLocaleString("ru")} ₽ · Срок: {period} мес.</p>
            <p className="text-gray-500 text-sm mb-8">Решение придёт на номер телефона в течение 2 минут</p>
            <Button onClick={() => { setSuccess(false); setSelected(null); setAmount(""); setPeriod("12") }} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              К кредитам
            </Button>
          </div>
        ) : selected ? (
          <div className="space-y-4">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-5">
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-xl font-bold text-green-400">{selected.rate}</p>
                  <p className="text-xs text-gray-400 mt-1">Ставка</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-sm font-bold text-white">{selected.max}</p>
                  <p className="text-xs text-gray-400 mt-1">Максимум</p>
                </div>
                <div className="rounded-xl bg-[#1a1a1a] p-4 text-center">
                  <p className="text-sm font-bold text-white">{selected.period}</p>
                  <p className="text-xs text-gray-400 mt-1">Срок</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Сумма кредита</label>
                <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">₽</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Введите сумму" className="flex-1 bg-transparent text-white outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Срок: {period} месяцев</label>
                <input type="range" min="3" max="60" step="3" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full accent-green-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3 мес.</span><span>60 мес.</span>
                </div>
              </div>
              {monthly > 0 && (
                <div className="rounded-xl bg-green-500/10 border border-green-800 p-4">
                  <p className="text-sm text-gray-400">Ежемесячный платёж</p>
                  <p className="text-3xl font-bold text-green-400">{monthly.toLocaleString("ru")} ₽</p>
                  <p className="text-xs text-gray-500 mt-1">Итого выплат: {(monthly * months).toLocaleString("ru")} ₽</p>
                </div>
              )}
              <Button onClick={() => setSuccess(true)} disabled={!amount} className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold disabled:opacity-40">
                Подать заявку
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {myCredits.length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-3">Мои кредиты</p>
                {myCredits.map((c, i) => (
                  <div key={i} className="rounded-2xl bg-[#141414] border border-[#262626] p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-400">{c.name}</p>
                        <p className="text-2xl font-bold text-white">{c.debt}</p>
                        <p className="text-xs text-gray-500 mt-1">Ставка: {c.rate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Следующий платёж</p>
                        <p className="text-lg font-bold text-white">{c.monthly}</p>
                        <p className="text-xs text-gray-500">{c.nextDate}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Выплачено {c.paid}%</span>
                        <span>Осталось {100 - c.paid}%</span>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${c.paid}%` }} />
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl">
                      Внести платёж
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <p className="text-sm text-gray-400 mb-3">Доступные кредиты</p>
              <div className="space-y-3">
                {creditOffers.map((offer, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl bg-[#141414] border border-[#262626] p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Icon name="Landmark" size={22} className="text-green-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{offer.name}</p>
                          {offer.tag && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{offer.tag}</span>}
                        </div>
                        <p className="text-xs text-gray-500">{offer.max} · {offer.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-white">{offer.rate}</p>
                      <Button onClick={() => setSelected(offer)} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl text-sm">
                        Оформить
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
