'use client';

import { useEffect, useRef, useState } from 'react';
import { useIdle } from 'react-use';

const SPRITE_SETS: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
};

export function FooterCat() {
  const nekoRef = useRef<HTMLDivElement>(null);
  const [idleTime, setIdleTime] = useState(0);
  const [idleAnimation, setIdleAnimation] = useState<string | null>(null);
  const [idleAnimationFrame, setIdleAnimationFrame] = useState(0);
  const isIdle = useIdle(5000); // 5 seconds of inactivity

  const setSprite = (name: string, frame: number) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  // Handle global idle state
  useEffect(() => {
    if (isIdle) {
      setIdleAnimation('sleeping');
      setIdleAnimationFrame(0);
    } else if (idleAnimation === 'sleeping') {
      // Wake up when user becomes active
      setIdleAnimation('alert');
      setIdleAnimationFrame(0);
      setIdleTime(0);
    }
  }, [isIdle]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTime((prev) => prev + 1);

      // Only trigger random animations if not globally idle and no animation is running
      if (
        !isIdle &&
        idleTime > 10 &&
        Math.floor(Math.random() * 60) === 0 &&
        !idleAnimation
      ) {
        const availableIdleAnimations = ['sleeping', 'scratchSelf', 'alert', 'tired'];
        setIdleAnimation(
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ]
        );
        setIdleAnimationFrame(0);
      }

      if (idleAnimation) {
        switch (idleAnimation) {
          case 'sleeping':
            if (idleAnimationFrame < 8) {
              setSprite('tired', 0);
            } else {
              setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
            }
            // If globally idle, stay sleeping
            if (idleAnimationFrame > 192 && !isIdle) {
              setIdleAnimation(null);
              setIdleTime(0);
            }
            break;
          case 'scratchSelf':
            setSprite('scratchSelf', idleAnimationFrame);
            if (idleAnimationFrame > 9) {
              setIdleAnimation(null);
              setIdleTime(0);
            }
            break;
          case 'alert':
            setSprite('alert', 0);
            if (idleAnimationFrame > 20) {
              setIdleAnimation(null);
              setIdleTime(0);
            }
            break;
          case 'tired':
            setSprite('tired', 0);
            if (idleAnimationFrame > 40) {
              setIdleAnimation(null);
              setIdleTime(0);
            }
            break;
        }
        setIdleAnimationFrame((prev) => prev + 1);
      } else {
        setSprite('idle', 0);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [idleAnimation, idleAnimationFrame, idleTime, isIdle]);

  const handleCatClick = () => {
    const clickAnimations = ['alert', 'scratchSelf'];
    setIdleAnimation(clickAnimations[Math.floor(Math.random() * clickAnimations.length)]);
    setIdleAnimationFrame(0);
    setIdleTime(0);
  };

  return (
    <div 
      className="pixel-cat-root size-16 cursor-pointer"
      onClick={handleCatClick}
    >
      <div className="pixel-cat-img-wrap flex h-full items-center justify-center">
        <div
          ref={nekoRef}
          style={{
            width: '32px',
            height: '32px',
            imageRendering: 'pixelated',
            backgroundImage: 'url(/images/oneko.gif)',
            backgroundPosition: '-96px -96px', // idle
            transform: 'scale(2)',
          }}
        />
      </div>
      {idleAnimation === 'sleeping' && (
        <div className="pixel-cat-zz scale-150">
          <span className="pixel-cat-z1 text-[10px]">z</span>
          <span className="pixel-cat-z2 text-[10px]">z</span>
          <span className="pixel-cat-z3 text-[10px]">z</span>
        </div>
      )}
    </div>
  );
}
