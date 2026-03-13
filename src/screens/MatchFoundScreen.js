import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const CONFETTI_COLORS = ['#F4C542', '#FFD166', '#FF6B6B', '#FF4444', '#FFF', '#FFB347']
const NUM_CONFETTI = 80

function Confetti() {
  const pieces = useRef(
    Array.from({ length: NUM_CONFETTI }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 200,
    }))
  ).current

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p) => (
        <motion.div
           key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            opacity: 0.85,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift],
            rotate: [0, p.rotation + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default function MatchFoundScreen({ teams, onReveal }) {
  const teamCount = teams.length

  return (
    <motion.div
      key="matchfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      <Confetti />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(244,197,66,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10 w-full max-w-lg rounded-xl p-5 text-left"
          style={{
            background: 'rgba(160, 0, 28, 0.25)',
            border: '1px solid rgba(255, 100, 100, 0.5)',
            boxShadow: '0 0 20px rgba(160, 0, 28, 0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5" role="img" aria-label="warning">⚠️</span>
            <div>
              <p className="font-cinzel font-bold text-red-400 tracking-widest text-sm mb-1">WARNING</p>
              <p className="font-inter text-gray-300 text-sm leading-relaxed">
                Your coding crew has been selected.{' '}
                <span className="text-soft-gold font-semibold">You cannot change your match.</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.7, type: 'spring', damping: 12 }}
          className="mb-6"
        >
          <div className="text-[clamp(3rem,10vw,7rem)] heartbeat">💘</div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-cinzel font-black text-[clamp(2rem,6vw,4.5rem)] text-gold glow-text mb-4 leading-tight"
        >
          MATCHES FOUND
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-playfair italic text-[clamp(1.1rem,3vw,1.8rem)] text-soft-gold mb-4"
        >
          {teamCount} Coding Crews Successfully Created
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1, type: 'spring' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReveal}
          className="relative px-14 py-5 rounded-xl font-cinzel font-bold text-lg tracking-[0.3em] uppercase overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #8B0000 0%, #A0001C 60%, #6B0000 100%)',
            border: '2px solid rgba(244,197,66,0.9)',
            boxShadow: '0 0 40px rgba(244,197,66,0.4), 0 0 80px rgba(139,0,0,0.5)',
            color: '#F4C542',
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Reveal Your Teams
          </span>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, rgba(244,197,66,0.2) 0%, transparent 60%)' }}
          />
        </motion.button>
      </div>
    </motion.div>
  )
}
