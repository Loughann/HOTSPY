"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Lock, Star, Download, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WhatsappSpyPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [verificationsLeft, setVerificationsLeft] = useState(27)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentDate, setCurrentDate] = useState("")
  const router = useRouter()

  const successMessages = [
    "@Carlos_silva recuperou 47 fotos íntimas excluídas do Instagram dela.",
    "@Rafael_santos encontrou 23 nudes apagadas do WhatsApp.",
    "@Bruno_costa descobriu 31 fotos sensuais deletadas do Tinder.",
    "@Diego_oliveira recuperou álbum completo de fotos +18 excluído.",
    "@Lucas_ferreira encontrou 19 fotos pelada apagadas do Snapchat.",
    "@Thiago_martins recuperou conversas íntimas com fotos deletadas.",
    "@André_silva descobriu 42 fotos íntimas excluídas da galeria.",
    "@Felipe_rocha encontrou backup oculto com 67 fotos sensuais.",
    "@Gustavo_lima recuperou fotos íntimas apagadas do iPhone dela.",
    "@Rodrigo_santos descobriu 28 nudes deletadas do OnlyFans.",
  ]

  const getRandomInterval = () => {
    return Math.floor(Math.random() * 3000) + 2500
  }

  const getRandomVerificationInterval = () => {
    return Math.floor(Math.random() * 13000) + 5000
  }

  useEffect(() => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, "0")
    const month = String(today.getMonth() + 1).padStart(2, "0")
    setCurrentDate(`${day}/${month}`)
  }, [])

  useEffect(() => {
    const scheduleNextChange = () => {
      const randomTime = getRandomInterval()
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % successMessages.length)
        scheduleNextChange()
      }, randomTime)
    }

    scheduleNextChange()
    return () => {}
  }, [])

  useEffect(() => {
    const scheduleVerificationDecrease = () => {
      if (verificationsLeft > 0) {
        const randomTime = getRandomVerificationInterval()
        setTimeout(() => {
          setVerificationsLeft((prev) => Math.max(0, prev - 1))
          scheduleVerificationDecrease()
        }, randomTime)
      }
    }

    scheduleVerificationDecrease()
    return () => {}
  }, [verificationsLeft])

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const limitedNumbers = numbers.slice(0, 11)

    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handleExposeTruth = () => {
    if (!phoneNumber || phoneNumber.length < 14) {
      alert("Por favor, insira um número de telefone válido")
      return
    }

    setIsLoading(true)
    setVerificationsLeft((prev) => Math.max(0, prev - 1))

    setTimeout(() => {
      setIsLoading(false)
      // Navigate to analysis page with phone number
      router.push(`/whatsapp-spy-page/analysis?phone=${encodeURIComponent(phoneNumber)}`)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="text-white py-3 px-4 text-center md:text-base bg-[rgba(255,0,0,1)] text-base font-bold animate-pulse-scarcity">
        Você GANHOU 1 consulta 100% gratuita válida até dia {currentDate}
      </div>

      <div className="flex items-center justify-center p-4 tracking-normal min-h-[calc(100vh-60px)]">
        <div className="relative w-full max-w-md mx-auto p-6 md:p-8 rounded-xl border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.7)] overflow-hidden">
          {/* Binary background effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-red-300 text-xs font-mono"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.15 + 0.05,
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
                width={250}
                height={150}
                className="object-contain"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-8">
              DESCUBRA fotos íntimas +18 excluídas. Veja os nudes que ela tentou esconder para sempre.
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300">
              Nossa tecnologia avançada recupera fotos sensuais e nudes deletadas de qualquer celular Android ou iOS via
              Número de telefone. WhatsApp, Instagram, Tinder, Snapchat, Galeria de fotos - nenhuma foto íntima fica
              realmente apagada. Descubra o que ela escondeu de você.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(50%-0.375rem)]">
                <Download className="w-4 h-4" />
                NUDES +18
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(50%-0.375rem)]">
                <Smartphone className="w-4 h-4" />
                Android & iOS
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(70%-0.375rem)]">
                <Lock className="w-4 h-4" />
                100% Anônimo
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4.9 ? "fill-yellow-400" : "fill-gray-600"}`} />
              ))}
              <span className="text-white ml-2">4.9/5.0</span>
            </div>

            <p className="text-sm md:text-base text-gray-300">
              Mais de <strong className="text-red-500">12 mil homens</strong> já viram fotos íntimas +18 das gostosas
              somente através do telefone. <br />
              <span className="text-xs text-red-600">(+20.000 nudes recuperados hoje)</span>
            </p>

            {/* Separator */}
            <div className="w-full h-px bg-gray-700 my-8" />

            {/* Form Section */}
            <div className="space-y-6">
              <p className="text-sm md:text-base text-gray-300">
                Ela envia nudes para as amigas, ex-namorados e nem imagina que você vai ver tudo. Não deixe a
                curiosidade te consumir.
              </p>
              <h2 className="font-extrabold text-red-500 leading-tight animate-pulse-glow drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] text-4xl">
                VEJA OS NUDES AGORA!
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Veja todas as fotos íntimas que ela envia para outros homens, amigas e até que apaga pensando que sumiu
                para sempre. Tenha tudo em suas mãos 100% anônimo
              </p>

              {/* Phone Number Input */}
              <div className="text-left space-y-2">
                <h3 className="text-lg font-semibold text-center">Número de Telefone:</h3>
                <Input
                  type="tel"
                  placeholder="(11) 11111-1111"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  disabled={isLoading}
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus-visible:ring-red-500 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <Button
                onClick={handleExposeTruth}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-button"
                style={{
                  animation: "pulse-button 1.5s ease-in-out infinite",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Recuperando nudes...
                  </span>
                ) : (
                  "RECUPERAR NUDES EXCLUÍDOS"
                )}
              </Button>

              {/* Success Message */}
              <div className="bg-green-700 text-white p-3 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-xs">{successMessages[currentMessageIndex]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-button {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-scarcity {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-pulse-scarcity {
          animation: pulse-scarcity 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
