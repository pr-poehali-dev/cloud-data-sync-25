import { useState } from "react"
import { ArrowUpRight, Building2, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { Link } from "react-router-dom"

const cardTypes = ["СберКарта Premium", "СберКарта Standard", "Дебетовая карта", "Кредитная карта"]

export function PaymentRolesCard() {
  const [cardType, setCardType] = useState("СберКарта Premium")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setDropdownOpen(false)
  }

  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
        <Icon name="ShieldCheck" size={20} className="text-green-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Безопасность и роли</h3>
      <p className="mb-4 text-sm text-gray-400">Настройте лимиты, двухфакторную защиту и права доступа для каждого члена семьи</p>

      <Link to="/settings" className="mb-6 inline-flex items-center text-sm text-green-500 hover:text-green-400 transition-colors">
        Настройки безопасности <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>

      <div className="mt-auto space-y-4 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/professional-man-portrait.png" alt="Алексей Петров" />
              <AvatarFallback className="bg-gray-600 text-white">АП</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Алексей Петров</p>
              <p className="text-xs text-gray-500">Главный владелец</p>
            </div>
          </div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Активен</span>
        </div>

        <div className="relative">
          <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
            Тип карты <Icon name="Info" size={12} />
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5 hover:border-green-700 transition-colors"
          >
            <span className="text-sm text-white">{cardType}</span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] overflow-hidden z-10">
              {cardTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setCardType(type); setDropdownOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 text-sm hover:bg-[#2a2a2a] transition-colors ${cardType === type ? "text-green-400" : "text-white"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">Кешбэк до 10% · Без годового обслуживания</p>
        </div>

        <div className="border-t border-dashed border-[#333] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f0f0f] border border-[#262626]">
                <Building2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">ПАО «Сбербанк России»</p>
                <p className="text-xs text-gray-500">Счёт ••4521 · БИК 044525225</p>
              </div>
            </div>
            <Link to="/cards" className="text-sm text-green-500 hover:text-green-400">Изменить</Link>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className={`w-full text-white rounded-lg transition-all ${saved ? "bg-green-700" : "bg-[#21A038] hover:bg-[#1a8030]"}`}
        >
          {saved ? (
            <span className="flex items-center gap-2"><Icon name="Check" size={16} /> Сохранено!</span>
          ) : "Управлять доступом"}
        </Button>
      </div>
    </div>
  )
}
