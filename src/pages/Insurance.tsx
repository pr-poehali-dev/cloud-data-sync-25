import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const myPolicies = [
  { name: "КАСКО «Стандарт»", type: "Авто", valid: "до 15.03.2025", amount: "1 200 000 ₽", status: "Активен" },
  { name: "Страхование жизни", type: "Жизнь", valid: "до 01.01.2026", amount: "5 000 000 ₽", status: "Активен" },
]

const offers = [
  { icon: "Car", name: "ОСАГО", desc: "Обязательное страхование автомобиля", price: "от 3 500 ₽/год" },
  { icon: "Home", name: "Страхование жилья", desc: "Квартира, дача, загородный дом", price: "от 1 800 ₽/год" },
  { icon: "Heart", name: "Страхование жизни", desc: "Для вас и вашей семьи", price: "от 5 000 ₽/год" },
  { icon: "Plane", name: "Страхование путешественников", desc: "Медицина и багаж за рубежом", price: "от 800 ₽/поездка" },
]

export default function Insurance() {
  const [selected, setSelected] = useState<typeof offers[0] | null>(null)
  const [success, setSuccess] = useState(false)

  return (
    <DashboardLayout active="Страхование">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Страхование</h1>

        {success && selected ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h2>
            <p className="text-gray-400 mb-1">{selected.name}</p>
            <p className="text-gray-500 text-sm mb-8">Наш менеджер свяжется с вами в течение 30 минут</p>
            <Button onClick={() => { setSuccess(false); setSelected(null) }} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              К страхованию
            </Button>
          </div>
        ) : selected ? (
          <div className="space-y-4">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-5">
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
              <p className="text-gray-400">{selected.desc}</p>
              <div className="rounded-xl bg-green-500/10 border border-green-800 p-4">
                <p className="text-sm text-gray-400">Стоимость</p>
                <p className="text-2xl font-bold text-green-400">{selected.price}</p>
              </div>
              <div className="space-y-3">
                {["Быстрое оформление онлайн", "Выплаты без задержек", "Поддержка 24/7"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <Icon name="Check" size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setSuccess(true)} className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold">
                Оформить полис
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {myPolicies.length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-3">Мои полисы</p>
                <div className="space-y-3">
                  {myPolicies.map((p, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-[#141414] border border-[#262626] p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <Icon name="Shield" size={22} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.valid} · {p.amount}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-400 mb-3">Доступные продукты</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offers.map((offer, i) => (
                  <button key={i} onClick={() => setSelected(offer)} className="flex items-center gap-4 p-4 rounded-2xl bg-[#141414] border border-[#262626] hover:border-green-800 hover:bg-green-500/5 transition-colors text-left">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={offer.icon} fallback="Shield" size={22} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{offer.name}</p>
                      <p className="text-xs text-gray-500">{offer.desc}</p>
                      <p className="text-xs text-green-400 mt-1">{offer.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
