"use client"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Lock,
  Phone,
  BarChart2,
  Calendar,
  MapPin,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  CheckCircle2,
  Smartphone,
  Download,
  Trash2,
  ImageIcon,
  X,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || ""
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBackRedirect, setShowBackRedirect] = useState(false)
  const [showPhotosOffer, setShowPhotosOffer] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      setShowBackRedirect(true)
      return ""
    }

    const handlePopState = () => {
      setShowBackRedirect(true)
      window.history.pushState(null, "", window.location.href)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)
    window.history.pushState(null, "", window.location.href)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const getCarrier = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/\D/g, "")

    if (numbers.length < 11) return "Desconhecida"

    const firstDigit = numbers.charAt(2)
    const secondDigit = numbers.charAt(3)

    if (firstDigit === "9") {
      const prefix = secondDigit

      if (["6", "7", "8", "9"].includes(prefix)) {
        return "Vivo"
      }
      if (["1", "2", "3"].includes(prefix)) {
        return "Claro"
      }
      if (["4", "5"].includes(prefix)) {
        return "TIM"
      }
      if (prefix === "0") {
        return "Oi"
      }
    }

    return "Operadora Móvel"
  }

  const conversationSnippets = [
    { id: 1, title: "WhatsApp - 23 nudes recuperados" },
    { id: 2, title: "Instagram - 31 fotos íntimas recuperadas" },
    { id: 3, title: "Tinder - 19 fotos sensuais recuperadas" },
  ]

  const hiddenMedia = [{ id: 1, title: "Álbum Secreto de Nudes" }]

  const photoSources = [
    "/HOT1.jpg?height=200&width=300",
    "/HOT2.jpg?height=200&width=300",
    "/HOT3.jpg?height=200&width=300",
    "/HOT4.png?height=240&width=300",
  ]

  const backredirectPhotoSources = [
    "/BACK01.jpg?height=100&width=150",
    "/BACK02.jpg?height=100&width=150",
    "/BACK03.jpg?height=100&width=150",
    "/BACK04.jpg?height=100&width=150",
  ]

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const callHistory = [
    { id: 1, type: "incoming", time: "12 min 40s", status: "answered" },
    { id: 2, type: "outgoing", time: "08 min 23s", status: "answered" },
    { id: 3, type: "missed", time: "Não atendida", status: "missed" },
    { id: 4, type: "incoming", time: "05 min 09s", status: "answered" },
    { id: 5, type: "missed", time: "Não atendida", status: "missed" },
  ]

  const conversationPatterns = [
    { icon: ImageIcon, title: "Total de Nudes Recuperados", value: "127 fotos íntimas +18" },
    { icon: Smartphone, title: "Conteúdos de Vídeos Excluidos", value: "16 vídeos íntimos +18" },
    { icon: Download, title: "Plataformas Recuperadas", value: "WhatsApp, Instagram, Tinder, Galeria" },
    { icon: Calendar, title: "Período de Recuperação", value: "Últimos 6 meses" },
    { icon: Trash2, title: "Nudes 'Permanentemente' Excluídos", value: "89 fotos íntimas recuperadas" },
    { icon: MapPin, title: "Backup em Nuvem Analisados", value: "iCloud + Google Fotos" },
  ]

  const fullReportFeatures = [
    "Todos os 127 nudes recuperados em alta resolução",
    "Fotos íntimas excluídas das plataformas",
    "Backup completo da nuvem com conteúdo +18 excluido (iCloud, Google Fotos)",
    "Conversas íntimas apagadas recuperadas",
    "Histórico completo das chamas de vídeos íntimas +18",
    "Acesso vitalício - baixe quantas vezes quiser os nudes e vídeos",
  ]

  const closeBackRedirect = () => {
    setShowBackRedirect(false)
  }

  const handleNoThanksClick = () => {
    setShowBackRedirect(false)
    setShowPhotosOffer(true)
  }

  const closePhotosOffer = () => {
    setShowPhotosOffer(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 tracking-normal">
      <div className="relative w-full max-w-md mx-auto p-6 md:p-8 rounded-xl border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.7)] overflow-hidden">
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

        <div className="relative z-10 space-y-8">
          <div className="flex items-center justify-center">
            <Image
              src="/images/hotspy-logo.png"
              alt="Hot Spy Logo"
              width={200}
              height={120}
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500">RECUPERAÇÃO CONCLUÍDA</h1>

          <div className="text-left space-y-4">
            <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Número Analisado
            </h2>
            <div className="bg-gray-800 rounded-lg p-4 border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="text-lg font-semibold text-white">{phoneNumber || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gray-700 my-8" />

          <div className="text-left space-y-4">
            <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Nudes Recuperados (Excluídos)
            </h2>
            <div className="space-y-3">
              {conversationSnippets.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg p-2 border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)] cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={photoSources[index] || "/placeholder.svg"}
                    alt={`Foto recuperada ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover rounded blur-md hover:blur-sm transition-all duration-300"
                  />
                </div>
              ))}
              {hiddenMedia.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg p-2 border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)] cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={photoSources[3] || "/placeholder.svg"}
                    alt="Álbum secreto"
                    width={300}
                    height={240}
                    className="w-full h-40 object-cover rounded blur-md hover:blur-sm transition-all duration-300"
                  />
                  <div className="text-center mt-2">
                    <span className="text-lg font-semibold">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-1 justify-center">
              <Lock className="w-4 h-4" />
              Mais 47 nudes de plataformas, conversas e galeria foram recuperados.
            </p>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gray-700 my-8" />

          <div className="text-left space-y-4">
            <h2 className="text-xl font-bold text-red-500">Histórico de Compartilhamentos Íntimos</h2>
            <p className="text-sm text-gray-300">
              Detectamos um histórico com diversas chamadas de vídeos com conteúdo +18 recente.
            </p>
            <div className="space-y-3">
              {callHistory.map((call) => (
                <div
                  key={call.id}
                  className="bg-gray-800 rounded-lg p-3 flex items-center justify-between border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    {call.type === "incoming" && <PhoneIncoming className="w-4 h-4 text-red-500" />}
                    {call.type === "outgoing" && <PhoneCall className="w-4 h-4 text-red-500" />}
                    {call.type === "missed" && <PhoneMissed className="w-4 h-4 text-red-500" />}
                    <span className="text-gray-300 text-sm font-semibold blur-sm">Contato Anônimo</span>
                  </div>
                  <span className={`text-xs ${call.status === "missed" ? "text-red-500" : "text-red-500"}`}>
                    {call.time}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-1 justify-center">
              <Lock className="w-4 h-4" />
              Os conteúdos completo das chamadas de vídeo está disponível no relatório completo.
            </p>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gray-700 my-8" />

          <div className="text-left space-y-4">
            <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Análise de Recuperação de Dados
            </h2>
            <div className="space-y-3">
              {conversationPatterns.map((pattern, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-3 flex items-center gap-3 border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                >
                  <pattern.icon className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-400">{pattern.title}</p>
                    <p className="text-sm font-semibold text-white">{pattern.value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Risk Level Alert */}
            <div className="bg-green-700 text-white p-4 rounded-lg flex items-center gap-3 mt-6">
              <CheckCircle className="w-5 h-5" />
              <div>
                <p className="text-sm font-bold">Recuperação: 100% Bem-Sucedida</p>
                <p className="text-xs">
                  Todos os nudes excluídos foram recuperados com sucesso de múltiplas plataformas e backups.
                </p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gray-700 my-8" />

          <div className="text-center space-y-6">
            <p className="text-sm text-gray-300">
              Por apenas <strong className="text-red-500 text-lg">R$14,90</strong>, tenha acesso completo a todos os 127
              nudes e 16 vídeos recuperados de plataformas, fotos excluidas e chamadas de vídeos. Satisfaça sua vontade
              e veja de forma 100% anônimo todas fotos e vídeos sem que ninguém saiba!
            </p>
            <div className="space-y-3 text-left">
              {fullReportFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span className="text-xs">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-red-500 text-lg font-bold">
              127 Nudes e 16 Vídeos Te Esperando
            </div>
            <Button
              className="w-full hover:bg-red-700 text-white py-3 text-lg font-bold rounded-lg animate-pulse-custom bg-[rgba(255,0,0,1)]"
              onClick={() => window.open("https://pay.kirvano.com/e1644a7d-f2b0-4407-b9b5-2728f2fee93f", "_blank")}
            >
              BAIXAR TUDO AGORA MESMO
            </Button>
            <p className="text-xs text-gray-400">Pagamento único e seguro. Download imediato após confirmação.</p>
          </div>
        </div>

        {showBackRedirect && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full border border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)] relative">
              <button
                onClick={closeBackRedirect}
                className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              >
                
              </button>

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-[rgba(255,0,0,1)]">ESPERA! NÃO SAIA AINDA! 🔥</h2>

                <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden mb-4 border border-red-500 relative">
                  <iframe
                    src="https://player.vimeo.com/video/1115646473?autoplay=1&loop=1&muted=1&controls=0&background=1"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    className="absolute inset-0 w-full h-full object-cover blur-sm"
                    style={{ pointerEvents: "none" }}
                  ></iframe>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                <h3 className="text-lg font-bold text-white leading-tight">
                  OFERTA ESPECIAL: Vídeos íntimos SEM CENSURA com áudios picantes da maneira que você imagina por apenas
                  R$9,90!
                </h3>

                <p className="text-sm text-gray-300">
                  Não perca a chance de ver os 16 vídeos íntimos recuperados com áudios originais e sem qualquer
                  censura. Conteúdo que ela pensou que havia apagado para sempre!
                </p>

                <div className="space-y-2 text-left text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>16 vídeos íntimos sem censura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Áudios picantes originais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Qualidade HD mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Download imediato</span>
                  </div>
                </div>

                <Button
                  className="w-full hover:bg-red-700 text-white py-3 text-lg font-bold rounded-lg animate-pulse-custom bg-[rgba(255,0,0,1)]"
                  onClick={() => window.open("https://pay.kirvano.com/128af1d9-8955-457e-8185-b0c09108918c", "_blank")}
                >
                  QUERO OS VÍDEOS AGORA
                </Button>

                <button onClick={handleNoThanksClick} className="text-xs text-gray-500 hover:text-gray-400 underline">
                  Não, obrigado. Continuar sem os vídeos.
                </button>
              </div>
            </div>
          </div>
        )}

        {showPhotosOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full border border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)] relative">
              <button
                onClick={closePhotosOffer}
                className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              >
                
              </button>

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-[rgba(255,0,0,1)]">ÚLTIMA CHANCE! 🔥</h2>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-24 bg-gray-800 rounded-lg border border-red-500 overflow-hidden">
                      <Image
                        src={backredirectPhotoSources[i - 1] || "/placeholder.svg"}
                        alt={`Foto ${i}`}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover blur-md"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-white leading-tight">
                  TODAS AS 127 FOTOS ÍNTIMAS SEM CENSURA por apenas R$7,90!
                </h3>

                <p className="text-sm text-gray-300">
                  Acesso completo a todas as fotos íntimas recuperadas em alta resolução. Veja tudo que ela tentou
                  esconder de você sem qualquer censura!
                </p>

                <div className="space-y-2 text-left text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>127 fotos íntimas em alta resolução</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Nudes excluídos recuperados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Fotos de múltiplas plataformas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Download imediato e vitalício</span>
                  </div>
                </div>

                <Button
                  className="w-full hover:bg-red-700 text-white py-3 text-lg font-bold rounded-lg animate-pulse-custom bg-[rgba(255,0,0,1)]"
                  onClick={() => window.open("https://pay.kirvano.com/f0680f5a-b5c4-4a60-aff9-5e131e2b1e11", "_blank")}
                >
                  {"VER FOTOS PELADAS +18"}
                </Button>

                <button onClick={closePhotosOffer} className="text-xs text-gray-500 hover:text-gray-400 underline">
                  Não, obrigado. Continuar sem as fotos.
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-custom {
          animation: pulse-custom 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
