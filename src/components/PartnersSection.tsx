import Icon from "@/components/ui/icon"

const services = [
  { name: "СберПрайм", icon: "Crown" },
  { name: "СберИнвест", icon: "TrendingUp" },
  { name: "СберСтрахование", icon: "Shield" },
  { name: "СберПей", icon: "CreditCard" },
  { name: "СберАвто", icon: "Car" },
  { name: "СберЗдоровье", icon: "Heart" },
  { name: "СберТech", icon: "Cpu" },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8 border-y border-[#1a1a1a]">
      {services.map((service) => (
        <div key={service.name} className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors cursor-pointer">
          <Icon name={service.icon} fallback="Circle" size={16} />
          <span className="text-sm font-medium">{service.name}</span>
        </div>
      ))}
    </section>
  )
}
