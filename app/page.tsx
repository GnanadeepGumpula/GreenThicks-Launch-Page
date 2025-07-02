"use client"

import { useEffect, useState } from "react"
import LaunchExperience from "@/components/launch-experience"
import WelcomeScreen from "@/components/welcome-screen"
import LoadingScreen from "@/components/loading-screen"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"loading" | "welcome" | "animation" | "redirecting">("loading")

  useEffect(() => {
    // Auto-advance from loading to welcome
    const timer = setTimeout(() => {
      setCurrentScreen("welcome")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "Enter") && currentScreen === "welcome") {
        setCurrentScreen("animation")

        // After animation completes, redirect to the actual website
        setTimeout(() => {
          setCurrentScreen("redirecting")
          setTimeout(() => {
            window.location.href = "https://greenthicks.live"
          }, 2000)
        }, 15000) // Extended animation duration
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentScreen])

  const handleStartPresentation = () => {
    setCurrentScreen("welcome")
  }

  const handleTouchStart = () => {
    if (currentScreen === "welcome") {
      setCurrentScreen("animation")
      setTimeout(() => {
        setCurrentScreen("redirecting")
        setTimeout(() => {
          window.location.href = "https://greenthicks.live"
        }, 2000)
      }, 15000)
    }
  }

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {currentScreen === "loading" && <LoadingScreen key="loading" onStart={handleStartPresentation} />}

        {currentScreen === "welcome" && <WelcomeScreen key="welcome" onTouchStart={handleTouchStart} />}

        {currentScreen === "animation" && <LaunchExperience key="animation" />}

        {currentScreen === "redirecting" && (
          <div
            key="redirecting"
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 z-50 p-4"
          >
            <div className="text-center w-full max-w-md">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8">
                <div className="absolute inset-0 border-4 sm:border-8 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-emerald-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
                <img
                  src="/greenthicks-logo.png"
                  alt="Greenthicks Logo"
                  className="absolute inset-2 sm:inset-4 w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <p className="text-xl sm:text-2xl lg:text-4xl text-white font-bold mb-2 px-4">
                LAUNCHING GREENTHICKS.LIVE
              </p>
              <p className="text-green-300 text-sm sm:text-lg lg:text-xl px-4">Connecting to your organic future...</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
