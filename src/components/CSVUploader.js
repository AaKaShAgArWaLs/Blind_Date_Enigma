import React, { useCallback } from 'react'
import { motion } from 'framer-motion'

export default function CSVUploader({ onParsed }) {
  const handleFile = useCallback((file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      if (!text) return
      
      // Basic CSV parsing: split by newlines, then split by commas
      // We want to extract all names, regardless of columns
      const lines = text.split(/\r?\n/)
      const names = lines
        .map(line => line.split(','))
        .flat()
        .map(n => n.trim().replace(/^"|"$/g, '')) // Remove quotes if any
        .filter(n => n.length > 0 && n.toLowerCase() !== 'name') // Basic header filter
      
      onParsed(names)
    }
    reader.readAsText(file)
  }, [onParsed])

  const handleChange = (e) => {
    handleFile(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer
          glass-card gold-border hover:gold-border-glow transition-all duration-300 group"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-4xl"
        >
          📂
        </motion.div>
        <div className="text-center">
          <p className="font-cinzel text-sm tracking-widest text-gold mb-1">Upload Participants CSV</p>
          <p className="text-xs text-gray-400 font-inter">Drag & drop or click to browse</p>
          <p className="text-xs text-gray-500 mt-1">One name per row · Any column</p>
        </div>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </motion.div>
  )
}
