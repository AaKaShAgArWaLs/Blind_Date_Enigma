import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CurtainTransition({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex">
          {/* Left curtain */}
          <motion.div
            className="w-1/2 h-full curtain-texture"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
            }}
          />
          {/* Right curtain */}
          <motion.div
            className="w-1/2 h-full curtain-texture"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 20px), linear-gradient(180deg, #6B0000 0%, #8B0000 30%, #A0001C 60%, #8B0000 100%)',
            }}
          />
          {/* Center glow when closed */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <span className="font-cinzel text-5xl text-gold glow-text heartbeat">💘</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
