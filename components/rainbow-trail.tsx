import React from 'react'

interface RainbowTrailProps {
  isSpinning: boolean
  speed: number
}

export function RainbowTrail({ isSpinning, speed }: RainbowTrailProps) {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  const trailLength = 20

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {isSpinning && Array.from({ length: trailLength }).map((_, index) => (
        <div
          key={index}
          className="absolute w-4 h-4"
          style={{
            left: `calc(50% + 120px * cos(${index * 2 * Math.PI / trailLength}))`,
            top: `calc(50% + 120px * sin(${index * 2 * Math.PI / trailLength}))`,
            backgroundColor: colors[index % colors.length],
            opacity: 1 - index / trailLength,
            transform: 'translate(-50%, -50%)',
            transition: `all ${0.1 / speed}s linear`,
          }}
        />
      ))}
    </div>
  )
}

