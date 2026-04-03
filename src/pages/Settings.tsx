import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Icon from "@/components/ui/icon"

export default function Settings() {
  const [name, setName] = useState("Алексей Петров")
  const [email, setEmail] = useState("alexey.petrov@mail.ru")
  const [phone, setPhone] = useState("+7 (916) 234-56-78")
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false })
  const [security, setSecurity] = useState({ twoFactor: true, biometry: false })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <DashboardLayout active="Настройки">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Настройки профиля</h1>

        <div className="space-y-5">
          {/* Profile */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="User" size={18} className="text-green-400" /> Личные данные
            </h2>
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Имя и фамилия</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Телефон</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-green-600 px-4 py-3 text-white outline-none text-sm transition-colors" />
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Bell" size={18} className="text-green-400" /> Уведомления
            </h2>
            {([
              { key: "push", label: "Push-уведомления", desc: "О платежах и переводах в реальном времени" },
              { key: "email", label: "Email-уведомления", desc: "Выписки и важные сообщения" },
              { key: "sms", label: "SMS-уведомления", desc: "Коды подтверждения и оповещения" },
            ] as const).map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, [item.key]: v }))}
                  className="data-[state=checked]:bg-[#21A038]"
                />
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="ShieldCheck" size={18} className="text-green-400" /> Безопасность
            </h2>
            {([
              { key: "twoFactor", label: "Двухфакторная аутентификация", desc: "Подтверждение входа по SMS" },
              { key: "biometry", label: "Вход по биометрии", desc: "Face ID / отпечаток пальца" },
            ] as const).map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <Switch
                  checked={security[item.key]}
                  onCheckedChange={(v) => setSecurity((prev) => ({ ...prev, [item.key]: v }))}
                  className="data-[state=checked]:bg-[#21A038]"
                />
              </div>
            ))}
            <button className="flex items-center gap-2 text-sm text-green-500 hover:text-green-400 transition-colors">
              <Icon name="Key" size={16} /> Изменить пароль
            </button>
          </div>

          {/* Theme */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Palette" size={18} className="text-green-400" /> Оформление
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Тёмная", value: "dark", preview: "bg-[#0a0a0a]" },
                { label: "Светлая", value: "light", preview: "bg-white" },
                { label: "Авто", value: "auto", preview: "bg-gradient-to-r from-[#0a0a0a] to-white" },
              ].map((theme) => (
                <button key={theme.value} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors ${theme.value === "dark" ? "border-green-500 bg-green-500/5" : "border-[#262626] hover:border-green-800"}`}>
                  <div className={`h-10 w-full rounded-lg border border-white/10 ${theme.preview}`} />
                  <span className="text-xs text-gray-400">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className={`flex-1 rounded-xl py-3 font-semibold transition-all ${saved ? "bg-green-700 text-white" : "bg-[#21A038] hover:bg-[#1a8030] text-white"}`}>
              {saved ? (
                <span className="flex items-center gap-2"><Icon name="Check" size={16} /> Сохранено!</span>
              ) : "Сохранить изменения"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
