import { ArrowUpRight, Building2, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function PaymentRolesCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
        <Icon name="ShieldCheck" size={20} className="text-green-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Безопасность и роли</h3>
      <p className="mb-4 text-sm text-gray-400">Настройте лимиты, двухфакторную защиту и права доступа для каждого члена семьи</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-green-500 hover:text-green-400 transition-colors">
        Настройки безопасности <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

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

        <div>
          <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
            Тип карты <Icon name="Info" size={12} />
          </label>
          <div className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
            <span className="text-sm text-white">СберКарта Premium</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
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
            <button className="text-sm text-green-500 hover:text-green-400">Изменить</button>
          </div>
        </div>

        <Button className="w-full bg-[#21A038] text-white hover:bg-[#1a8030]">Управлять доступом</Button>
      </div>
    </div>
  )
}
