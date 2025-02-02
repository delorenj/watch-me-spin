'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

interface Planet {
  id: number
  emoji: string
  size: number
  duration: number
  position: { x: number; y: number }
  rotation: number
}

export function FlyingPlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    const planetEmojis = ['🌍', '🌎', '🌏', '🪐', '🌑', '🌕', '🌚', '🌝']
    const newPlanets: Planet[] = []

    const createPlanet = (index: number) => {
      const planet: Planet = {
        id: index,
        emoji: planetEmojis[index],
        size: Math.random() * 50 + 30,
        duration: Math.random() * 180 + 120,
        position: {
          x: Math.random() * containerSize.width,
          y: Math.random() * containerSize.height
        },
        rotation: Math.random() * 360
      }
      newPlanets.push(planet)
      setPlanets(prev => [...prev, planet])
    }

    const spawnInterval = setInterval(() => {
      if (newPlanets.length < planetEmojis.length) {
        createPlanet(newPlanets.length)
      } else {
        clearInterval(spawnInterval)
      }
    }, 2000)

    return () => clearInterval(spawnInterval)
  }, [containerSize])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {planets.map((planet) => (
        <PlanetAnimation key={planet.id} planet={planet} containerSize={containerSize} />
      ))}
    </div>
  )
}

function PlanetAnimation({ planet, containerSize }: { planet: Planet; containerSize: { width: number; height: number } }) {
  const controls = useAnimationControls()

  useEffect(() => {
    const animate = () => {
      const newX = Math.random() * containerSize.width
      const newY = Math.random() * containerSize.height
      
      controls.start({
        x: newX,
        y: newY,
        rotate: planet.rotation + 360,
        transition: {
          duration: planet.duration,
          ease: "linear"
        }
      }).then(animate)
    }

    animate()
  }, [planet, controls, containerSize])

  return (
    <motion.div
      className="absolute"
      initial={{ 
        x: planet.position.x, 
        y: planet.position.y,
        rotate: planet.rotation 
      }}
      animate={controls}
    >
      <div 
        style={{ 
          fontSize: `${planet.size}px`,
          filter: 'brightness(1.2) contrast(1.1)',
          textShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}
      >
        {planet.emoji}
      </div>
    </motion.div>
  )
}

