'use client'

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Rocket, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { StickManBody } from './stick-man-body'
import { ParticleEffects } from './particle-effects'
import { FlyingPlanets } from './flying-planets'

export default function SpaceSpinner() {
  const [speed, setSpeed] = useState(20)
  const [isSpinning, setIsSpinning] = useState(true)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (isSpinning) {
        setRotation((prevRotation) => (prevRotation + speed * deltaTime / 16) % 360);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpinning, speed]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <FlyingPlanets />

      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="relative">
          <ParticleEffects isSpinning={isSpinning} speed={speed} />
          <div 
            className="flex flex-col items-center"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.1s linear'
            }}
          >
            <div className="w-64 h-64 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SpinningHead-pTMs79WwOCzCvAhqanPavTNDdqgZsS.png"
                alt="Spinning head in space"
                width={256}
                height={256}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <StickManBody className="mt-[-20px]" />
          </div>
        </div>

        <Card className="p-6 bg-black/50 backdrop-blur border-purple-500">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white text-sm">Spin Speed</label>
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsSpinning(!isSpinning)}
                className="w-full group"
                variant="outline"
              >
                <Rocket className={`mr-2 h-4 w-4 transition-transform ${
                  isSpinning ? 'group-hover:translate-x-1' : ''
                }`} />
                {isSpinning ? 'Stop Spinning' : 'Start Spinning'}
              </Button>
              <Button
                onClick={() => {
                  setSpeed(20)
                  setIsSpinning(true)
                }}
                variant="outline"
                className="px-3"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

