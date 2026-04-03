import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const menuItems = [
  { icon: "LayoutDashboard", label: "Главная", path: "/dashboard" },
  { icon: "CreditCard", label: "Карты и счета", path: "/cards" },
  { icon: "SendHorizontal", label: "Переводы", path: "/transfers" },
  { icon: "Receipt", label: "Платежи", path: "/payments" },
  { icon: "TrendingUp", label: "Инвестиции", path: "/investments" },
  { icon: "PiggyBank", label: "Вклады", path: "/deposits" },
  { icon: "ShieldCheck", label: "Страхование", path: "/insurance" },
  { icon: "History", label: "История", path: "/history" },
  { icon: "Settings", label: "Настройки", path: "/settings" },
]

const notifications = [
  { text: "Перевод 25 000 ₽ от Петрова А.В.", time: "5 мин назад", read: false },
  { text: "Платёж ЖКХ выполнен: 4 200 ₽", time: "2 часа назад", read: false },
  { text: "Новое предложение по вкладу 16.5%", time: "Вчера", read: true },
]

interface Props {
  children: React.ReactNode
  active: string
}

export function DashboardLayout({ children, active }: Props) {
  const navigate = useNavigate()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifList, setNotifList] = useState(notifications)

  const unreadCount = notifList.filter((n) => !n.read).length

  const markAllRead = () => setNotifList((prev) => prev.map((n) => ({ ...n, read: true })))

  const searchRoutes = menuItems.filter((m) =>
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#1a1a1a] flex flex-col p-4 hidden md:flex">
        <Link to="/" className="flex items-center gap-2 px-3 py-3 mb-6">
          <SberLogo />
          <span className="text-lg font-bold text-white">СберБанк<sup className="text-xs font-normal text-green-500">Онлайн</sup></span>
        </Link>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active === item.label
                  ? "bg-green-500/15 text-green-400 font-medium"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <Icon name={item.icon} fallback="Circle" size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#1a1a1a] pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#141414]">
            <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              АП
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Алексей Петров</p>
              <p className="text-xs text-gray-500">Премиум клиент</p>
            </div>
            <Link to="/" title="Выйти">
              <Icon name="LogOut" size={16} className="text-gray-500 hover:text-white cursor-pointer" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] sticky top-0 bg-[#0a0a0a] z-10">
          <div>
            <h1 className="text-xl font-bold text-white">Добрый день, Алексей!</h1>
            <p className="text-sm text-gray-400">{new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => { setShowSearch(!showSearch); setShowNotifs(false) }}
                className="p-2 rounded-xl bg-[#141414] border border-[#262626] text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Search" size={18} />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-12 w-72 bg-[#141414] border border-[#262626] rounded-2xl p-4 shadow-xl z-20">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по разделам..."
                    autoFocus
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-green-600"
                  />
                  {searchQuery && (
                    <div className="mt-3 space-y-1">
                      {searchRoutes.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-2">Ничего не найдено</p>
                      ) : searchRoutes.map((r) => (
                        <Link
                          key={r.path}
                          to={r.path}
                          onClick={() => setShowSearch(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#1a1a1a] transition-colors"
                        >
                          <Icon name={r.icon} fallback="Circle" size={16} className="text-green-400" />
                          <span className="text-sm text-white">{r.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs(!showNotifs); setShowSearch(false) }}
                className="relative p-2 rounded-xl bg-[#141414] border border-[#262626] text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Bell" size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-[#141414] border border-[#262626] rounded-2xl shadow-xl z-20 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
                    <span className="text-sm font-semibold text-white">Уведомления</span>
                    <button onClick={markAllRead} className="text-xs text-green-500 hover:text-green-400">Прочитать все</button>
                  </div>
                  {notifList.map((n, i) => (
                    <div
                      key={i}
                      onClick={() => setNotifList((prev) => prev.map((x, xi) => xi === i ? { ...x, read: true } : x))}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-[#1f1f1f] last:border-b-0 cursor-pointer hover:bg-[#1a1a1a] transition-colors ${!n.read ? "bg-green-500/5" : ""}`}
                    >
                      <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-green-400" : "bg-transparent"}`} />
                      <div>
                        <p className="text-sm text-white">{n.text}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Click outside overlay */}
        {(showNotifs || showSearch) && (
          <div className="fixed inset-0 z-10" onClick={() => { setShowNotifs(false); setShowSearch(false) }} />
        )}

        {children}
      </main>
    </div>
  )
}

function SberLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#21A038" />
      <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 8.5C20.142 8.5 23.5 11.858 23.5 16C23.5 20.142 20.142 23.5 16 23.5C11.858 23.5 8.5 20.142 8.5 16C8.5 11.858 11.858 8.5 16 8.5ZM16 11C13.239 11 11 13.239 11 16C11 18.761 13.239 21 16 21C18.761 21 21 18.761 21 16H18.5C18.5 17.381 17.381 18.5 16 18.5C14.619 18.5 13.5 17.381 13.5 16C13.5 14.619 14.619 13.5 16 13.5V11Z" fill="white" />
    </svg>
  )
}
