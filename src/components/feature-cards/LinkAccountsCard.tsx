import { useState } from "react"
import { ArrowUpRight, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { Link } from "react-router-dom"

const initialAccounts = [
  { name: "Алексей Петров", info: "Карта •••• 4521", balance: "+25 000 ₽", image: "/professional-man-portrait.png", positive: true },
  { name: "Мария Иванова", info: "Карта •••• 8832", balance: "-3 400 ₽", image: "/professional-woman-portrait.png", positive: false },
  { name: "Елена Смирнова", info: "Вклад «Сберегательный»", balance: "+120 000 ₽", initials: "ЕС", color: "bg-green-700", positive: true },
  { name: "Дмитрий Козлов", info: "Карта •••• 1190", balance: "+8 750 ₽", initials: "ДК", color: "bg-emerald-700", positive: true },
]

export function LinkAccountsCard() {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newInfo, setNewInfo] = useState("")

  const handleAdd = () => {
    if (!newName) return
    setAccounts([...accounts, {
      name: newName,
      info: newInfo || "Новый счёт",
      balance: "0 ₽",
      initials: newName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      color: "bg-gray-600",
      positive: true,
    }])
    setNewName("")
    setNewInfo("")
    setShowForm(false)
  }

  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
        <Icon name="LayoutGrid" size={20} className="text-green-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Все счета в одном месте</h3>
      <p className="mb-4 text-sm text-gray-400">Карты, вклады, кредиты и накопительные счета — полная картина ваших финансов</p>

      <Link to="/cards" className="mb-6 inline-flex items-center text-sm text-green-500 hover:text-green-400 transition-colors">
        Управление счетами <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>

      <div className="mt-auto space-y-2 rounded-xl bg-[#1a1a1a] border border-[#262626] p-3">
        {accounts.slice(0, 4).map((account, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] px-3 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                {account.image ? (
                  <AvatarImage src={account.image} alt={account.name} />
                ) : null}
                <AvatarFallback className={`${account.color || "bg-gray-600"} text-white text-xs`}>
                  {account.initials ||
                    account.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{account.name}</p>
                <p className="text-xs text-gray-500">{account.info}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${account.positive ? "text-green-400" : "text-red-400"}`}>
              {account.balance}
            </span>
          </div>
        ))}

        {showForm ? (
          <div className="mt-2 space-y-2 rounded-lg bg-[#0f0f0f] p-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Имя владельца"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none"
            />
            <input
              value={newInfo}
              onChange={(e) => setNewInfo(e.target.value)}
              placeholder="Тип счёта (напр. Карта •••• 0000)"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleAdd} size="sm" className="flex-1 bg-[#21A038] hover:bg-[#1a8030] text-white text-xs">Добавить</Button>
              <Button onClick={() => setShowForm(false)} size="sm" variant="ghost" className="flex-1 text-gray-400 hover:text-white text-xs">Отмена</Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setShowForm(true)}
            className="w-full justify-center text-gray-500 hover:text-white hover:bg-[#1f1f1f] mt-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Добавить счёт
          </Button>
        )}
      </div>
    </div>
  )
}
