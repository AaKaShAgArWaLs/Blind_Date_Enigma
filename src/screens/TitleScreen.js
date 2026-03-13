import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CSVUploader from '../components/CSVUploader'
import { SAMPLE_PARTICIPANTS } from '../utils/teamGenerator'

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}))

export default function TitleScreen({ onStart }) {
  const [participants, setParticipants] = useState([])
  const [showUploader, setShowUploader] = useState(false)

  const handleParsed = (names) => {
    setParticipants(names)
    setShowUploader(false)
  }

  const handleStart = () => {
    onStart(participants.length > 0 ? participants : SAMPLE_PARTICIPANTS)
  }

  return (
    <motion.div
       key="title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Star field */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-yellow-200 opacity-40"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity }}
        />
      ))}

      {/* Left curtain decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-20 curtain-texture opacity-80"
        style={{ boxShadow: '10px 0 40px rgba(0,0,0,0.6)' }}
      />
      {/* Right curtain decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-20 curtain-texture opacity-80"
        style={{ boxShadow: '-10px 0 40px rgba(0,0,0,0.6)', transform: 'scaleX(-1)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-4xl">
        {/* Event badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center gap-3 px-6 py-2 rounded-full glass-card gold-border"
        >
          <span className="text-red-400 text-xs" role="img" aria-label="dot">●</span>
          <span className="font-cinzel text-xs tracking-[0.4em] text-soft-gold uppercase">Tech Challenge · 2026</span>
          <span className="text-red-400 text-xs" role="img" aria-label="dot">●</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-4"
        >
          <h1 className="font-cinzel font-black text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-gold glow-text">
            BLIND
          </h1>
          <h1 className="font-cinzel font-black text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-gold glow-text">
            DATE
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-2"
        >
          <div className="flex items-center gap-4 justify-center mb-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400 opacity-60" />
            <span className="font-cinzel text-sm tracking-[0.5em] text-soft-gold uppercase">Matchmaking System</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400 opacity-60" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-playfair italic text-[clamp(1rem,2.5vw,1.5rem)] text-gray-300 mb-12 tracking-wide"
        >
          "Who's gonna be your tech partner?"
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowUploader((v) => !v)}
            className="px-8 py-3 rounded-xl font-cinzel text-sm tracking-[0.2em] uppercase
              glass-card gold-border text-soft-gold hover:gold-border-glow transition-all duration-300"
          >
            {showUploader ? '✕ Cancel' : '📂 Upload CSV'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="relative px-12 py-4 rounded-xl font-cinzel font-bold text-base tracking-[0.3em] uppercase overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #8B0000 0%, #A0001C 50%, #6B0000 100%)',
              border: '2px solid rgba(244,197,66,0.8)',
              boxShadow: '0 0 30px rgba(244,197,66,0.3), 0 0 60px rgba(139,0,0,0.4)',
              color: '#F4C542',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="heartbeat" role="img" aria-label="heart">💘</span>
              Start Matchmaking
              <span className="heartbeat" role="img" aria-label="heart">💘</span>
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(244,197,66,0.15) 0%, transparent 60%)' }}
            />
          </motion.button>
        </motion.div>

        {/* CSV Uploader panel */}
        {showUploader && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 w-full max-w-md"
          >
            <CSVUploader onParsed={handleParsed} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
