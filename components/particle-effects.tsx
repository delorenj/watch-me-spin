'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  isTaco: boolean
}

interface ParticleEffectsProps {
  isSpinning: boolean
  speed: number
}

export function ParticleEffects({ isSpinning, speed }: ParticleEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const colors = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']

  useEffect(() => {
    if (!isSpinning) {
      setParticles([])
      return
    }

    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2
      const distance = 150
      const newParticle: Particle = {
        id: Date.now(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isTaco: Math.random() > 0.7, // 30% chance of being a taco
      }

      setParticles(prev => [...prev.slice(-30), newParticle]) // Keep last 30 particles
    }, 100 / speed)

    return () => clearInterval(interval)
  }, [isSpinning, speed, colors])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              scale: particle.scale,
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              opacity: 0
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2 / speed,
              ease: "easeOut"
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {particle.isTaco ? (
              <div className="text-4xl">🌮</div>
            ) : (
              <div 
                className="w-6 h-6 rounded-full animate-rainbow"
                style={{ 
                  backgroundColor: particle.color,
                  filter: 'blur(2px)',
                  boxShadow: `0 0 10px ${particle.color}`
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

