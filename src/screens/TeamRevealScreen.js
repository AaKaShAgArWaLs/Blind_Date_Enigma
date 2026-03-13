import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TeamCard from '../components/TeamCard'

const TEAMS_PER_PAGE = 10

export default function TeamRevealScreen({ teams, onReset }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(teams.length / TEAMS_PER_PAGE)

  const start = page * TEAMS_PER_PAGE
  const currentTeams = teams.slice(start, start + TEAMS_PER_PAGE)

  const goto = (p) => {
    if (p >= 0 && p < totalPages) setPage(p)
  }

  return (
    <motion.div
       key="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex-none pt-20 pb-4 px-8 text-center relative">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-1">
            <span className="text-2xl heartbeat">💘</span>
            <h2 className="font-cinzel font-black text-[clamp(1.5rem,4vw,2.8rem)] text-gold glow-text tracking-wider">
              YOUR CODING CREWS
            </h2>
            <span className="text-2xl heartbeat">💘</span>
          </div>
          <p className="font-inter text-sm text-gray-400 tracking-widest">
            {teams.length} teams · {teams.reduce((s, t) => s + t.members.length, 0)} participants matched
          </p>
        </motion.div>
      </div>

      {/* Teams grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-2"
          >
            {currentTeams.map((team, i) => (
              <TeamCard
                key={start + i}
                team={team}
                index={start + i}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex-none px-8 py-4 border-t"
        style={{ borderColor: 'rgba(244,197,66,0.15)', background: 'rgba(10,3,3,0.6)' }}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goto(page - 1)}
            disabled={page === 0}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-cinzel text-sm tracking-widest uppercase
              glass-card gold-border text-soft-gold disabled:opacity-30 disabled:cursor-not-allowed
              hover:gold-border-glow transition-all duration-300"
          >
            ← Previous
          </motion.button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2 }}
                onClick={() => goto(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? 24 : 8,
                  height: 8,
                  background: i === page
                    ? 'linear-gradient(90deg, #F4C542, #FFD166)'
                    : 'rgba(244,197,66,0.3)',
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goto(page + 1)}
            disabled={page === totalPages - 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-cinzel text-sm tracking-widest uppercase
              glass-card gold-border text-soft-gold disabled:opacity-30 disabled:cursor-not-allowed
              hover:gold-border-glow transition-all duration-300"
          >
            Next →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
