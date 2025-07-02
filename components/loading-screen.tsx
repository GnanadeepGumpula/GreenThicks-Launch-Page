"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface LoadingScreenProps {
  onStart: () => void
}

export default function LoadingScreen({ onStart }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowButton(true)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full opacity-30"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-6 sm:mb-8 lg:mb-12"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <img
            src="/greenthicks-logo.png"
            alt="Greenthicks Logo"
            className="relative w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Company name */}
      <motion.h1
        className="text-2xl sm:text-4xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 mb-2 sm:mb-4 lg:mb-8 tracking-wider text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        GREENTHICKS
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-sm sm:text-lg lg:text-3xl text-green-300 font-light tracking-wide mb-6 sm:mb-8 lg:mb-12 text-center px-4 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        FRESH FROM FARM TO TABLE
      </motion.p>

      {/* Progress bar */}
      <motion.div
        className="w-full max-w-xs sm:max-w-sm lg:max-w-lg h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden mb-2 sm:mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      <motion.p
        className="text-green-400 font-mono text-xs sm:text-sm lg:text-lg mb-6 sm:mb-8 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        {progress < 100 ? `Loading... ${progress}%` : "Ready to Launch!"}
      </motion.p>

      {/* Start button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <Button
              onClick={onStart}
              className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-8 text-sm sm:text-lg lg:text-2xl rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400"
            >
              <span className="relative z-10">BEGIN GRAND LAUNCH</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl sm:rounded-2xl blur opacity-50 animate-pulse"></div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
