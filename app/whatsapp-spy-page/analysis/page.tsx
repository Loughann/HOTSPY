"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Smartphone, Wifi, Lock, Eye, Download, Shield, Zap, Search } from "lucide-react"
import Image from "next/image"

export default function AnalysisPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const analysisSteps = [
    { icon: Wifi, text: "Conectando ao dispositivo...", duration: 3500 },
    { icon: Shield, text: "Contornando segurança...", duration: 4000 },
    { icon: Lock, text: "Desbloqueando acesso íntimo...", duration: 3800 },
    { icon: Search, text: "Escaneando nudes do WhatsApp...", duration: 4200 },
    { icon: Eye, text: "Analisando fotos íntimas do Instagram...", duration: 4500 },
    { icon: Zap, text: "Verificando conteúdo +18 do Tinder...", duration: 4100 },
    { icon: Download, text: "Recuperando nudes excluídos...", duration: 5000 },
    { icon: Smartphone, text: "Finalizando acesso às fotos íntimas...", duration: 3000 },
  ]

  useEffect(() => {
    const phone = searchParams.get("phone")
    if (phone) {
      setPhoneNumber(decodeURIComponent(phone))
    }
  }, [searchParams])

  useEffect(() => {
    let stepTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const runAnalysis = () => {
      if (currentStep < analysisSteps.length) {
        const step = analysisSteps[currentStep]

        // Progress animation for current step
        const progressIncrement = (100 / step.duration) * 50
        progressTimer = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + progressIncrement
            if (newProgress >= (currentStep + 1) * (100 / analysisSteps.length)) {
              clearInterval(progressTimer)
              return (currentStep + 1) * (100 / analysisSteps.length)
            }
            return newProgress
          })
        }, 50)

        // Move to next step
        stepTimer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
        }, step.duration)
      } else {
        // Analysis complete, redirect to results
        setShowSuccessMessage(true)
        setTimeout(() => {
          router.push(`/whatsapp-spy-page/results?phone=${encodeURIComponent(phoneNumber)}`)
        }, 3000)
      }
    }

    runAnalysis()

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressTimer)
    }
  }, [currentStep, router, phoneNumber])

  const getCurrentStepIcon = () => {
    if (currentStep < analysisSteps.length) {
      const IconComponent = analysisSteps[currentStep].icon
      return <IconComponent className="w-8 h-8 text-red-500 animate-pulse" />
    }
    return <Smartphone className="w-8 h-8 text-green-500" />
  }

  const getCurrentStepText = () => {
    if (currentStep < analysisSteps.length) {
      return analysisSteps[currentStep].text
    }
    return "Análise concluída!"
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto p-8 rounded-xl border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.7)] overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-red-300 text-xs font-mono animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.15 + 0.05,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? "0" : "1"}
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center space-y-8">
          <div className="flex items-center justify-center">
            <Image
              src="/images/hotspy-logo.png"
              alt="Hot Spy Logo"
              width={200}
              height={120}
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-red-500 tracking-wider">DESCOBRINDO NUDES...</h1>

          {/* Target Phone */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Alvo identificado:</p>
            <p className="text-red-500 font-mono text-lg font-bold">{phoneNumber}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-red-400 font-mono text-sm">{Math.round(progress)}% Concluído</p>
          </div>

          {/* Current Step */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-center gap-4 mb-4">
              {getCurrentStepIcon()}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
            <p className="text-white font-semibold text-lg">{getCurrentStepText()}</p>
          </div>

          <div className="space-y-3 text-left">
            {analysisSteps.map((step, index) => {
              const IconComponent = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-900/30 border border-green-700"
                      : isCurrent
                        ? "bg-red-900/30 border border-red-700"
                        : "bg-gray-800/30 border border-gray-700"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isCompleted ? "text-green-500" : isCurrent ? "text-red-500 animate-pulse" : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isCompleted
                        ? "text-green-400 line-through"
                        : isCurrent
                          ? "text-red-400 font-semibold"
                          : "text-gray-400"
                    }`}
                  >
                    {step.text}
                  </span>
                  {isCompleted && (
                    <div className="ml-auto w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Warning */}
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
            <p className="text-red-400 text-xs">
              ⚠️ Recuperação 100% anônima e segura. Ela nunca saberá que você viu os nudes.
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-500">
              <div className="bg-gray-900 border border-red-600 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(220,38,38,0.8)] animate-in zoom-in duration-700">
                <div className="text-6xl mb-4 animate-bounce">🔥</div>
                <h2 className="text-2xl font-bold text-red-500 mb-2">Você achou o que procurava</h2>
                <p className="text-gray-300 text-sm">Redirecionando para os resultados...</p>
              </div>
            </div>
          )}

          {currentStep >= analysisSteps.length && !showSuccessMessage && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <p className="text-green-400 text-sm font-semibold">
                ✅ Nudes recuperados! Redirecionando para visualizar as fotos íntimas...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
