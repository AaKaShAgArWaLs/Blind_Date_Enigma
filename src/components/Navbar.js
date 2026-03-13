import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ screen, onReset }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3"
      >
        <span className="text-2xl heartbeat inline-block">💘</span>
        <span className="font-cinzel text-sm font-semibold tracking-[0.3em] text-gold uppercase glow-text-sm">
          Blind Date
        </span>
      </motion.div>

      {/* Event Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full glass-card gold-border"
      >
        <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
        <span className="font-cinzel text-xs tracking-[0.25em] text-soft-gold uppercase">
          Tech Challenge · Live Event
        </span>
      </motion.div>

      {/* Reset button - only show when not on title */}
      <AnimatePresence>
        {screen !== 'TITLE' && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onReset}
            className="font-cinzel text-xs tracking-[0.2em] uppercase px-4 py-2 rounded glass-card gold-border text-soft-gold hover:text-gold hover:gold-border-glow transition-all duration-300"
          >
            ↺ Restart
          </motion.button>
        )}
        {screen === 'TITLE' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-24"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
