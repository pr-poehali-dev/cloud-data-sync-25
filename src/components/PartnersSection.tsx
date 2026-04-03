import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const services = [
  { name: "СберПрайм", icon: "Crown", path: "/dashboard" },
  { name: "СберИнвест", icon: "TrendingUp", path: "/investments" },
  { name: "СберСтрахование", icon: "Shield", path: "/insurance" },
  { name: "СберПей", icon: "CreditCard", path: "/payments" },
  { name: "СберАвто", icon: "Car", path: "/payments" },
  { name: "СберЗдоровье", icon: "Heart", path: "/insurance" },
  { name: "СберТech", icon: "Cpu", path: "/dashboard" },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8 border-y border-[#1a1a1a]">
      {services.map((service) => (
        <Link
          key={service.name}
          to={service.path}
          className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
        >
          <Icon name={service.icon} fallback="Circle" size={16} />
          <span className="text-sm font-medium">{service.name}</span>
        </Link>
      ))}
    </section>
  )
}
