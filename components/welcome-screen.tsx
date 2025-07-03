"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Star, Truck, Award, Users } from "lucide-react";

interface WelcomeScreenProps {
  onTouchStart: () => void;
}

export default function WelcomeScreen({ onTouchStart }: WelcomeScreenProps) {
  const [loaded, setLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
      });
    };

    setLoaded(true);
    updateWindowSize(); // Initial size
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
      onClick={onTouchStart}
    >
      {/* Enhanced background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * windowSize.width,
                Math.random() * windowSize.width,
                Math.random() * windowSize.width,
              ],
              y: [
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
              ],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {i % 4 === 0 ? (
              <Leaf className="text-green-400" size={12 + Math.random() * 16} />
            ) : i % 4 === 1 ? (
              <Sparkles className="text-emerald-300" size={10 + Math.random() * 14} />
            ) : i % 4 === 2 ? (
              <Star className="text-green-300" size={8 + Math.random() * 12} />
            ) : (
              <Truck className="text-teal-400" size={8 + Math.random() * 14} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Scrollable content container */}
      <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            className="relative w-full max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 100 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Company Logo Section */}
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

              <div className="relative flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-12">
                <motion.div
                  className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-56 lg:h-56 mb-4 sm:mb-6 lg:mb-8"
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 2, type: "spring", bounce: 0.3, delay: 0.5 }}
                >
                  {/* Outer rotating rings */}
                  <motion.div
                    className="absolute inset-0 border-2 sm:border-4 lg:border-8 border-green-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-1 sm:inset-2 lg:inset-4 border-1 sm:border-2 lg:border-4 border-emerald-300 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  {/* Logo */}
                  <div className="absolute inset-2 sm:inset-4 lg:inset-8 rounded-full overflow-hidden shadow-2xl">
                    <img src="/greenthicks-logo.png" alt="Greenthicks Logo" className="w-full h-full object-cover" />
                  </div>

                  {/* Floating orbital elements */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 sm:w-2 sm:h-2 lg:w-4 lg:h-4 bg-green-400 rounded-full shadow-lg"
                      style={{
                        left: "calc(50% - 2px)",
                        top: "calc(50% - 2px)",
                        transformOrigin: "2px 0px",
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        delay: i * 0.3,
                      }}
                      transform={`rotate(${i * 45}deg) translateY(-${40 + i * 4}px)`}
                    />
                  ))}
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 mb-1 sm:mb-2 lg:mb-4 tracking-wider leading-tight"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1, type: "spring", bounce: 0.2 }}
                >
                  GREENTHICKS
                </motion.h1>

                <motion.p
                  className="text-sm sm:text-lg lg:text-4xl text-green-300 font-light tracking-wide px-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  FRESH FROM FARM TO TABLE
                </motion.p>
              </div>
            </div>

            {/* Welcome Message */}
            <motion.div
              className="relative bg-black/50 backdrop-blur-2xl border border-green-400/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-16 shadow-2xl mx-2 sm:mx-4"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, type: "spring", bounce: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl sm:rounded-3xl"></div>

              <motion.h2
                className="relative text-lg sm:text-3xl lg:text-6xl font-bold text-white mb-4 sm:mb-8 lg:mb-12 leading-tight px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                WELCOME TO THE FUTURE OF
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  ORGANIC FARMING
                </span>
              </motion.h2>

              <motion.div
                className="relative space-y-3 sm:space-y-4 lg:space-y-8 text-xs sm:text-base lg:text-2xl text-gray-200 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
              >
                <p className="text-sm sm:text-xl lg:text-3xl text-green-300 font-semibold mb-3 sm:mb-4 lg:mb-8 px-2">
                  🎉 Honorable Agriculture Minister & Distinguished Guests 🎉
                </p>

                <p className="text-xs sm:text-sm lg:text-xl px-2 sm:px-4">
                  Today marks a revolutionary moment in sustainable agriculture as we unveil GreenThicks - your gateway
                  to the freshest, most nutritious organic vegetables delivered directly from our certified organic
                  farms.
                </p>

                <p className="text-xs sm:text-sm lg:text-xl px-2 sm:px-4">
                  We are pioneering a new era of farm-to-table excellence, supporting local farmers, and bringing you
                  produce that's grown with love for the earth and care for your health.
                </p>

                {/* Stats section */}
                <motion.div
                  className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 mt-4 sm:mt-6 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-green-400/30"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.8 }}
                >
                  <div className="text-center px-2">
                    <Award className="w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-green-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-sm sm:text-2xl lg:text-4xl font-bold text-green-400">100%</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300">ORGANIC</div>
                  </div>
                  <div className="text-center px-2">
                    <Truck className="w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-emerald-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-sm sm:text-2xl lg:text-4xl font-bold text-emerald-400">With In 24Hrs</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300">DELIVERY</div>
                  </div>
                  <div className="text-center px-2">
                    <Users className="w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-teal-400 mx-auto mb-1 sm:mb-2" />
                    <div className="text-sm sm:text-2xl lg:text-4xl font-bold text-teal-400">FRESH</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300">GUARANTEE</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced ambient lighting effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 lg:w-[800px] lg:h-[800px] bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </motion.div>
  );
}