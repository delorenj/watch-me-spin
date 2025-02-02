import React from 'react'

interface StickManBodyProps {
  className?: string
}

export function StickManBody({ className = '' }: StickManBodyProps) {
  return (
    <svg
      className={`w-32 h-48 ${className}`}
      viewBox="0 0 100 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Neck */}
      <line x1="50" y1="0" x2="50" y2="30" stroke="white" strokeWidth="4" />
      
      {/* Body */}
      <line x1="50" y1="30" x2="50" y2="100" stroke="white" strokeWidth="4" />
      
      {/* Arms */}
      <line x1="50" y1="50" x2="20" y2="80" stroke="white" strokeWidth="4" />
      <line x1="50" y1="50" x2="80" y2="80" stroke="white" strokeWidth="4" />
      
      {/* Legs */}
      <line x1="50" y1="100" x2="30" y2="140" stroke="white" strokeWidth="4" />
      <line x1="50" y1="100" x2="70" y2="140" stroke="white" strokeWidth="4" />
    </svg>
  )
}

