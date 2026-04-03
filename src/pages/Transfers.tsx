import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentContacts = [
  { name: "Мария Иванова", phone: "+7 (916) 234-56-78", initials: "МИ", color: "bg-pink-700" },
  { name: "Дмитрий Козлов", phone: "+7 (926) 987-65-43", initials: "ДК", color: "bg-amber-700" },
  { name: "Елена Смирнова", phone: "+7 (905) 111-22-33", initials: "ЕС", color: "bg-teal-700" },
  { name: "Андрей Волков", phone: "+7 (999) 555-44-33", initials: "АВ", color: "bg-purple-700" },
]

type Step = "form" | "confirm" | "success"

export default function Transfers() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [comment, setComment] = useState("")
  const [step, setStep] = useState<Step>("form")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [transferType, setTransferType] = useState<"phone" | "card" | "account">("phone")

  const handleSelectContact = (contact: typeof recentContacts[0]) => {
    setSelectedContact(contact.name)
    setRecipient(contact.phone)
  }

  const handleSubmit = () => {
    if (!recipient || !amount) return
    setStep("confirm")
  }

  const handleConfirm = () => {
    setStep("success")
  }

  const handleReset = () => {
    setRecipient("")
    setAmount("")
    setComment("")
    setSelectedContact(null)
    setStep("form")
  }

  return (
    <DashboardLayout active="Переводы">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Переводы</h1>

        {step === "success" ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Перевод выполнен!</h2>
            <p className="text-gray-400 mb-2">{amount} ₽ отправлено</p>
            <p className="text-gray-500 text-sm mb-8">Получатель: {recipient}</p>
            <Button onClick={handleReset} className="bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl px-8">
              Новый перевод
            </Button>
          </div>
        ) : step === "confirm" ? (
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Подтвердите перевод</h2>
            <div className="space-y-3 rounded-xl bg-[#1a1a1a] p-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Получатель</span>
                <span className="text-white text-sm font-medium">{selectedContact || recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Реквизит</span>
                <span className="text-white text-sm">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Сумма</span>
                <span className="text-green-400 text-lg font-bold">{Number(amount).toLocaleString("ru")} ₽</span>
              </div>
              {comment && (
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Комментарий</span>
                  <span className="text-white text-sm">{comment}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Комиссия</span>
                <span className="text-green-400 text-sm">Бесплатно</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setStep("form")} variant="outline" className="flex-1 border-[#333] text-white hover:bg-[#1a1a1a] rounded-xl">
                Изменить
              </Button>
              <Button onClick={handleConfirm} className="flex-1 bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl">
                Подтвердить
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Type selector */}
            <div className="flex gap-2 rounded-xl bg-[#141414] border border-[#262626] p-1">
              {(["phone", "card", "account"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTransferType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    transferType === t ? "bg-[#21A038] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t === "phone" ? "По телефону" : t === "card" ? "По карте" : "По счёту"}
                </button>
              ))}
            </div>

            {/* Recent contacts */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Недавние получатели</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {recentContacts.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleSelectContact(c)}
                    className={`flex flex-col items-center gap-1.5 flex-shrink-0 p-3 rounded-xl border transition-colors ${
                      selectedContact === c.name
                        ? "border-green-500 bg-green-500/10"
                        : "border-[#262626] bg-[#141414] hover:border-green-800"
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`${c.color} text-white text-xs`}>{c.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-white whitespace-nowrap">{c.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  {transferType === "phone" ? "Номер телефона" : transferType === "card" ? "Номер карты" : "Номер счёта"}
                </label>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={transferType === "phone" ? "+7 (___) ___-__-__" : transferType === "card" ? "0000 0000 0000 0000" : "40817 810 0..."}
                  className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Сумма перевода</label>
                <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                  <span className="text-gray-400 mr-2 text-sm">₽</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="flex-1 bg-transparent text-white outline-none text-sm"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[500, 1000, 5000, 10000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAmount(String(v))}
                      className="text-xs text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full hover:bg-green-500/20 transition-colors"
                    >
                      {v.toLocaleString("ru")} ₽
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Комментарий (необязательно)</label>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="За что перевод..."
                  className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!recipient || !amount}
                className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Перевести
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
