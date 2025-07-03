"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Ensure React is imported explicitly to avoid JSX parsing issues
import * as React from "react";

// Define the component with React.FC for TypeScript type safety
const LoadingPage: React.FC = () => {
  const [phase, setPhase] = useState<number>(0);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoEnded) {
      // Text animation phases during video
      const timer1 = setTimeout(() => setPhase(1), 1000);
      const timer2 = setTimeout(() => setPhase(2), 2000);
      const timer3 = setTimeout(() => setPhase(3), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [videoEnded]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-emerald-900 flex flex-col items-center justify-center relative overflow-hidden">
      {!videoEnded ? (
        <>
          {/* Background subtle animation */}
          <motion.div
            className="absolute inset-0 bg-green-500/10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Full-screen Video with 3D Border */}
          <motion.div
            className="relative w-full h-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-[-10px] bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg -z-10 shadow-2xl" />
            <div className="absolute inset-[-6px] bg-gray-900 rounded-lg -z-10" />
            <video
              ref={videoRef}
              src="/greenthicks-video.mp4"
              autoPlay
              muted={false}
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover rounded-lg shadow-xl border border-green-400/50"
            />
          </motion.div>

          {/* Logo and Brand Overlay */}
          <motion.div
            className="absolute top-4 left-4 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-green-400/30">
              <motion.div
                className="absolute inset-0 bg-green-400/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src="/greenthicks-logo.png"
                alt="Greenthicks Logo"
                className="relative w-12 h-12 object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-white tracking-wider">GREENTHICKS</h1>
              <p className="text-green-300 text-xs font-light">ORGANIC REVOLUTION</p>
            </div>
          </motion.div>

          {/* Animated Text Overlay */}
          <div className="absolute bottom-12 left-0 right-0 text-center space-y-2">
            <motion.h2
              className="text-lg md:text-xl text-white font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              Greenthicks now live on
            </motion.h2>
            <motion.h1
              className="text-2xl md:text-4xl font-bold text-green-400 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              greenthicks.live
            </motion.h1>
            <motion.p
              className="text-md md:text-lg text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              open and order now
            </motion.p>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md border border-green-400/50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-green-400 font-semibold text-sm">LIVE</span>
            </div>
          </div>
        </>
      ) : (
        // Next Page After Video Ends
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background subtle animation */}
          <motion.div
            className="absolute inset-0 bg-green-500/10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo and Brand */}
          <motion.div
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-green-400/30 mb-4">
              <motion.div
                className="absolute inset-0 bg-green-400/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src="/greenthicks-logo.png"
                alt="Greenthicks Logo"
                className="relative w-14 h-14 object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">GREENTHICKS</h1>
            <p className="text-green-300 text-sm md:text-base font-light">ORGANIC REVOLUTION</p>
          </motion.div>

          {/* Animated Text */}
          <div className="text-center space-y-2">
            <motion.h2
              className="text-xl md:text-2xl text-white font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Greenthicks now live on
            </motion.h2>
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-green-400 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              greenthicks.live
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              open and order now
            </motion.p>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-8 w-64 h-1 bg-gray-800/50 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Status Indicator */}
          <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md border border-green-400/50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-green-400 font-semibold text-sm">LIVE</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingPage;