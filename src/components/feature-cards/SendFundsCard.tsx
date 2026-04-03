import { useState } from "react"
import { Building2, ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { Link } from "react-router-dom"

export function SendFundsCard() {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [autoPayment, setAutoPayment] = useState(false)
  const [sent, setSent] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleSend = () => {
    if (!amount || !recipient) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setAmount("")
      setRecipient("")
    }, 2500)
  }

  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
        <Icon name="SendHorizontal" size={20} className="text-green-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Переводы и платежи</h3>
      <p className="mb-4 text-sm text-gray-400">Переводите деньги по номеру телефона, карте или счёту мгновенно и без комиссий</p>

      <Link to="/transfers" className="mb-6 inline-flex items-center text-sm text-green-500 hover:text-green-400 transition-colors">
        Все способы перевода <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>

      <div className="mt-auto space-y-4 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
              <Icon name="CheckCircle2" size={24} className="text-green-400" />
            </div>
            <p className="text-white font-medium">Перевод выполнен!</p>
            <p className="text-sm text-gray-400 mt-1">{amount} ₽ → {recipient}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-white">Основной счёт</p>
                  <p className="text-xs text-gray-500">Доступно: 248 500 ₽</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                Введите сумму <Icon name="Info" size={12} />
              </label>
              <div className="flex items-center rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
                <span className="text-gray-500 mr-2">₽</span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                Получатель <span className="text-green-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  placeholder="Номер телефона, карты или счёта..."
                  value={recipient}
                  onChange={(e) => { setRecipient(e.target.value); setCharCount(e.target.value.length) }}
                  maxLength={200}
                  className="w-full rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none resize-none h-16"
                />
                <span className="absolute bottom-2 right-2 text-xs text-gray-600">{charCount}/200</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Switch
                  checked={autoPayment}
                  onCheckedChange={setAutoPayment}
                  className="data-[state=checked]:bg-[#21A038]"
                />
                <span className="text-sm text-gray-400">Автоплатёж</span>
              </div>
              <span className="text-xs text-gray-500">Без комиссии</span>
            </div>

            <Button
              onClick={handleSend}
              disabled={!amount || !recipient}
              className="w-full bg-[#21A038] text-white hover:bg-[#1a8030] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Перевести
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
