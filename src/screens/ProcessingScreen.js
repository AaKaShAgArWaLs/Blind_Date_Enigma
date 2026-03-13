import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { generateTeams } from '../utils/teamGenerator'

const INIT_LINES = [
  { text: 'Initializing Blind Date Algorithm...', delay: 0 },
  { text: 'Loading participants...', delay: 1200 },
  { text: 'Preparing matchmaking engine...', delay: 2400 },
  { text: 'Running compatibility analysis...', delay: 3600 },
  { text: 'Calibrating randomness matrix...', delay: 4800 },
]

const PROCESSING_LINES = [
  { text: 'Analyzing participants...', delay: 5800 },
  { text: 'Calculating coding chemistry...', delay: 7000 },
  { text: 'Generating random crews...', delay: 8200 },
  { text: 'Shuffling the deck of fate...', delay: 9400 },
  { text: 'Sealing your destiny...', delay: 10400 },
]

const ALL_LINES = [...INIT_LINES, ...PROCESSING_LINES]
const DONE_DELAY = 11600

function useTypingLines(lines) {
  const [visibleLines, setVisibleLines] = useState([])
  const timers = useRef([])

  useEffect(() => {
    timers.current = lines.map(({ text, delay }) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, text]), delay)
    )
    return () => timers.current.forEach(clearTimeout)
  }, [lines])

  return visibleLines
}

export default function ProcessingScreen({ onDone, participants }) {
  const visibleLines = useTypingLines(ALL_LINES)
  const [phase, setPhase] = useState('init') // init | processing | done
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('processing'), 5600)
    const t2 = setTimeout(() => setProgress(100), 10000)
    const t3 = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true
        const teams = generateTeams(participants && participants.length > 0 ? participants : [])
        onDone(teams)
      }
    }, DONE_DELAY)

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.8, 98))
    }, 100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearInterval(interval)
    }
  }, [onDone, participants])

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
        <span className="font-cinzel text-xs tracking-[0.4em] text-soft-gold uppercase">
          {phase === 'init' ? 'System Initialization' : 'Matchmaking Engine'}
        </span>
        <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 3, 3, 0.85)',
          border: '1px solid rgba(244,197,66,0.3)',
          boxShadow: '0 0 40px rgba(139,0,0,0.4), 0 0 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-yellow-900/30"
          style={{ background: 'rgba(139,0,0,0.2)' }}
        >
          <div className="w-3 h-3 rounded-full bg-red-600" />
          <div className="w-3 h-3 rounded-full bg-yellow-600" />
          <div className="w-3 h-3 rounded-full bg-green-700" />
          <span className="ml-3 font-mono text-xs text-gray-500">blind_date_engine.exe</span>
        </div>

        {/* Terminal body */}
        <div className="p-6 min-h-72 font-mono text-sm space-y-2">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className="text-green-500 shrink-0">›</span>
              <span className={i >= INIT_LINES.length ? 'text-soft-gold' : 'text-gray-300'}>
                {line}
              </span>
              {i === visibleLines.length - 1 && (
                <span className="ml-1 text-gold animate-pulse">▌</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 w-full max-w-2xl"
      >
        <div className="flex justify-between mb-2">
          <span className="font-mono text-xs text-gray-500">PROGRESS</span>
          <span className="font-mono text-xs text-soft-gold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-900 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #8B0000, #F4C542)',
              boxShadow: '0 0 8px rgba(244,197,66,0.6)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
