import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TitleScreen from './screens/TitleScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import MatchFoundScreen from './screens/MatchFoundScreen'
import TeamRevealScreen from './screens/TeamRevealScreen'
import Navbar from './components/Navbar'
import CurtainTransition from './components/CurtainTransition'

const SCREENS = {
  TITLE: 'TITLE',
  PROCESSING: 'PROCESSING',
  MATCH_FOUND: 'MATCH_FOUND',
  TEAM_REVEAL: 'TEAM_REVEAL',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.TITLE)
  const [teams, setTeams] = useState([])
  const [participants, setParticipants] = useState([])
  const [showCurtain, setShowCurtain] = useState(false)

  const transitionTo = (nextScreen) => {
    setShowCurtain(true)
    setTimeout(() => {
      setScreen(nextScreen)
      setTimeout(() => setShowCurtain(false), 800)
    }, 900)
  }

  const handleStartMatchmaking = (loadedParticipants) => {
    setParticipants(loadedParticipants)
    transitionTo(SCREENS.PROCESSING)
  }

  const handleProcessingDone = (generatedTeams) => {
    setTeams(generatedTeams)
    transitionTo(SCREENS.MATCH_FOUND)
  }

  const handleRevealTeams = () => {
    transitionTo(SCREENS.TEAM_REVEAL)
  }

  const handleReset = () => {
    setTeams([])
    setParticipants([])
    transitionTo(SCREENS.TITLE)
  }

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden stage-bg scanlines">
      {/* Ambient corner glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-900 opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-900 opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-900 opacity-10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-900 opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <Navbar screen={screen} onReset={handleReset} />

      <CurtainTransition visible={showCurtain} />

      <AnimatePresence mode="wait">
        {screen === SCREENS.TITLE && (
          <TitleScreen key="title" onStart={handleStartMatchmaking} />
        )}
        {screen === SCREENS.PROCESSING && (
          <ProcessingScreen key="processing" participants={participants} onDone={handleProcessingDone} />
        )}
        {screen === SCREENS.MATCH_FOUND && (
          <MatchFoundScreen key="matchfound" teams={teams} onReveal={handleRevealTeams} />
        )}
        {screen === SCREENS.TEAM_REVEAL && (
          <TeamRevealScreen key="reveal" teams={teams} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  )
}
