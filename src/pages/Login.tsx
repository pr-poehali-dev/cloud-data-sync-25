import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export default function Login() {
  const [step, setStep] = useState<"phone" | "password">("phone")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleNext = () => {
    if (step === "phone" && phone.length >= 10) setStep("password")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="flex items-center px-8 py-4 border-b border-[#1a1a1a]">
        <Link to="/" className="flex items-center gap-2">
          <SberLogo />
          <span className="text-xl font-bold text-white">СберБанк<sup className="text-xs font-normal text-green-500">Онлайн</sup></span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20">
                <SberLogo size={36} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Добро пожаловать</h1>
              <p className="text-sm text-gray-400">Войдите в личный кабинет</p>
            </div>

            {step === "phone" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Номер телефона</label>
                  <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                    <span className="text-gray-400 mr-2">+7</span>
                    <input
                      type="tel"
                      placeholder="(999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none text-sm"
                      autoFocus
                    />
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold"
                >
                  Продолжить
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a2a2a]" />
                  </div>
                  <div className="relative flex justify-center text-xs text-gray-500">
                    <span className="bg-[#141414] px-3">или войти через</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] py-2.5 text-sm text-gray-300 hover:bg-[#222] transition-colors">
                    <Icon name="Fingerprint" size={16} className="text-green-400" />
                    Биометрия
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] py-2.5 text-sm text-gray-300 hover:bg-[#222] transition-colors">
                    <Icon name="QrCode" size={16} className="text-green-400" />
                    QR-код
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setStep("phone")}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
                >
                  <Icon name="ArrowLeft" size={16} />
                  +7 {phone}
                </button>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">Пароль</label>
                  <div className="flex items-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-green-600 px-4 py-3 transition-colors">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none text-sm"
                      autoFocus
                    />
                    <button onClick={() => setShowPass(!showPass)} className="text-gray-500 hover:text-white ml-2">
                      <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-xs text-green-500 hover:text-green-400">Забыли пароль?</a>
                </div>

                <Link to="/dashboard">
                  <Button className="w-full bg-[#21A038] hover:bg-[#1a8030] text-white rounded-xl py-3 font-semibold">
                    Войти
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Нет аккаунта?{" "}
            <a href="#" className="text-green-500 hover:text-green-400">Открыть счёт</a>
          </p>

          <p className="mt-4 text-center text-xs text-gray-600">
            Ваши данные защищены по стандарту PCI DSS
          </p>
        </div>
      </div>
    </div>
  )
}

function SberLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#21A038" />
      <path
        d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 8.5C20.142 8.5 23.5 11.858 23.5 16C23.5 20.142 20.142 23.5 16 23.5C11.858 23.5 8.5 20.142 8.5 16C8.5 11.858 11.858 8.5 16 8.5ZM16 11C13.239 11 11 13.239 11 16C11 18.761 13.239 21 16 21C18.761 21 21 18.761 21 16H18.5C18.5 17.381 17.381 18.5 16 18.5C14.619 18.5 13.5 17.381 13.5 16C13.5 14.619 14.619 13.5 16 13.5V11Z"
        fill="white"
      />
    </svg>
  )
}
