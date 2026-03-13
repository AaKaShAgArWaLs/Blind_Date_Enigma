import React from 'react'
import { motion } from 'framer-motion'

export default function TeamCard({ team, index, delay = 0 }) {
  const teamNum = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="relative rounded-xl overflow-hidden group"
    >
      {/* Card background */}
      <div className="glass-card gold-border rounded-xl p-5 h-full transition-all duration-300 group-hover:gold-border-glow">
        {/* Inner glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(244,197,66,0.08) 0%, transparent 70%)' }}
        />

        {/* Team Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs tracking-[0.3em] text-soft-gold opacity-70">TEAM</span>
            <span className="font-cinzel text-lg font-bold text-gold glow-text-sm">{teamNum}</span>
          </div>
          <span className="text-lg heartbeat">❤️</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(244,197,66,0.5), transparent)' }} />

        {/* Members */}
        <div className="flex flex-wrap gap-1.5">
          {team.members.map((member, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1 + i * 0.08 }}
              className="px-2.5 py-1 rounded-full text-xs font-medium tracking-wide"
              style={{
                background: 'rgba(244,197,66,0.12)',
                border: '1px solid rgba(244,197,66,0.3)',
                color: '#FFD166',
              }}
            >
              {member}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
