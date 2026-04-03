import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const categories = [
  { icon: "Home", label: "ЖКХ", color: "bg-blue-500/10 text-blue-400" },
  { icon: "Phone", label: "Связь", color: "bg-green-500/10 text-green-400" },
  { icon: "Wifi", label: "Интернет", color: "bg-purple-500/10 text-purple-400" },
  { icon: "Tv", label: "ТВ", color: "bg-orange-500/10 text-orange-400" },
  { icon: "Car", label: "Штрафы", color: "bg-red-500/10 text-red-400" },
  { icon: "GraduationCap", label: "Образование", color: "bg-cyan-500/10 text-cyan-400" },
  { icon: "ShoppingBag", label: "Интернет-магазины", color: "bg-pink-500/10 text-pink-400" },
  { icon: "MoreHorizontal", label: "Другое", color: "bg-gray-500/10 text-gray-400" },
]

const popularPayments = [
  { name: "Мосэнерго", category: "ЖКХ", account: "1234-5678-9012", amount: "4 200 ₽" },
  { name: "МТС", category: "Связь", account: "+7 (916) 234-56-78", amount: "600 ₽" },
  { name: "Ростелеком", category: "Интернет", account: "987654321", amount: "890 ₽" },
]

type PayStep = "list" | "form" | "success"

export default function Payments() {
  const [step, setStep] = useState<PayStep>("list")
  const [selected, setSelected] = useState<typeof popularPayments[0] | null>(null)
  const [amount, setAmount] = useState("")
  const [account, setAccount] = useState("")

  const handleSelectPayment = (p: typeof popularPayments[0]) => {
    setSelected(p)
    setAccount(p.account)
    setAmount(p.amount.replace(/[^0-9]/g, ""))
    setStep("form")
  }

  const handlePay = () => {
    setStep("success")
  }

  return (
    <DashboardLayout active="Платежи">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Платежи</h1>

        {step === "success" ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Платёж выполнен!</h2>
            <p className="text-gray-400 mb-2">{selected?.name}: {amount} ₽</p>
            <p className="text-gray-500 text-sm mb-8">Счёт: {account}</p>
            <Button onClick={() => { setStep("list"); setSelected(null); setAmount(""); setAccount("") }} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              Новый платёж
            </Button>
          </div>
        ) : step === "form" && selected ? (
          <div className="space-y-4">
            <button onClick={() => setStep("list")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">{selected.name}</h2>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Лицевой счёт / номер</label>
                <input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Сумма</label>
                <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">₽</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-white outline-none text-sm"
                  />
                </div>
              </div>
              <Button onClick={handlePay} disabled={!amount || !account} className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold disabled:opacity-40">
                Оплатить
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Категории</p>
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-green-800 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${cat.color.split(" ")[0]}`}>
                      <Icon name={cat.icon} fallback="Circle" size={18} className={cat.color.split(" ")[1]} />
                    </div>
                    <span className="text-xs text-gray-400">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Автоплатежи и избранное</p>
              <div className="rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden">
                {popularPayments.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPayment(p)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#1a1a1a] transition-colors text-left ${i < popularPayments.length - 1 ? "border-b border-[#1f1f1f]" : ""}`}
                  >
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Receipt" size={18} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category} · {p.account}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{p.amount}</p>
                      <p className="text-xs text-green-400">Автоплатёж</p>
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
