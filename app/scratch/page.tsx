'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCoins } from "../contexts/CoinContext";
import AdGoogle from "../components/AdGoogle";

export default function Scratch() {
  const router = useRouter();
  const { addCoins, deductCoins, hasEnoughCoins, coins } = useCoins();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reward, setReward] = useState<{ type: string; amount: number; message: string; emoji: string } | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [entryFeePaid, setEntryFeePaid] = useState(false);

  // Random rewards configuration
  const rewards = [
    { type: 'coins', amount: 5, message: 'You Won 5 Coins!', emoji: '🪙' },
    { type: 'coins', amount: 10, message: 'You Won 10 Coins!', emoji: '🪙' },
    { type: 'coins', amount: 15, message: 'You Won 15 Coins!', emoji: '🪙' },
    { type: 'coins', amount: 20, message: 'You Won 20 Coins!', emoji: '🪙' },
    { type: 'coins', amount: 25, message: 'You Won 25 Coins!', emoji: '🪙' },
    { type: 'coins', amount: 50, message: 'You Won 50 Coins!', emoji: '🎉' },
    { type: 'jackpot', amount: 100, message: 'JACKPOT! You Won 100 Coins!', emoji: '🎊' },
  ];

  // Generate random reward
  const generateReward = () => {
    // Higher chance for smaller rewards, lower chance for big wins
    const random = Math.random();
    if (random < 0.3) return rewards[0]; // 30% chance for 5 coins
    if (random < 0.5) return rewards[1]; // 20% chance for 10 coins
    if (random < 0.65) return rewards[2]; // 15% chance for 15 coins
    if (random < 0.78) return rewards[3]; // 13% chance for 20 coins
    if (random < 0.88) return rewards[4]; // 10% chance for 25 coins
    if (random < 0.96) return rewards[5]; // 8% chance for 50 coins
    return rewards[6]; // 4% chance for 100 coins (jackpot)
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with scratch overlay (silver/gray color) only if not already revealed
    if (!isRevealed) {
      ctx.fillStyle = '#C0C0C0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.globalCompositeOperation = 'destination-out';

    let isDrawing = false;

    const startScratching = (e: MouseEvent | TouchEvent) => {
      // Check if user has enough coins and hasn't paid entry fee yet
      if (!entryFeePaid) {
        if (!hasEnoughCoins(10)) {
          setReward({
            type: 'error',
            amount: 0,
            message: 'Not enough coins! Need 10 coins to play.',
            emoji: '⚠️'
          });
          setIsRevealed(true);
          return;
        }
        // Deduct entry fee once when starting to scratch
        deductCoins(10);
        setEntryFeePaid(true);
      }
      
      isDrawing = true;
      setIsScratching(true);
      const point = getPoint(e);
      drawPoint(ctx, point.x, point.y);
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const point = getPoint(e);
      drawPoint(ctx, point.x, point.y);
      updateScratchedPercentage(canvas, ctx);
    };

    const stopScratching = () => {
      isDrawing = false;
      setIsScratching(false);
    };

    const getPoint = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateScratchedPercentage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
      setScratchedPercentage(percentage);

      // Only process reward once when 50% is reached
      // Only reveal prize once when 50% is scratched
      if (percentage >= 50 && !isRevealed && !hasPlayed && entryFeePaid) {
        setIsRevealed(true);
        setHasPlayed(true);
        
        // Generate and award random reward only once
        const randomReward = generateReward();
        setReward(randomReward);
        addCoins(randomReward.amount);
      }
    };

    // Mouse events
    canvas.addEventListener('mousedown', startScratching);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mouseleave', stopScratching);

    // Touch events
    canvas.addEventListener('touchstart', startScratching);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopScratching);

    return () => {
      canvas.removeEventListener('mousedown', startScratching);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopScratching);
      canvas.removeEventListener('mouseleave', stopScratching);
      canvas.removeEventListener('touchstart', startScratching);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopScratching);
    };
  }, [isRevealed, hasPlayed, entryFeePaid, hasEnoughCoins, deductCoins, addCoins]);

  const resetScratch = () => {
    // Check if user has enough coins before allowing another scratch
    if (!hasEnoughCoins(10)) {
      return;
    }

    // Reset all states
    setScratchedPercentage(0);
    setIsRevealed(false);
    setHasPlayed(false);
    setReward(null);
    setEntryFeePaid(false);

    // Reset canvas after a brief delay to ensure state is updated
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Re-draw the scratch overlay
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#C0C0C0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-out';
    }, 100);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header with Back Button and Title */}
        <div className="flex items-center gap-4 mb-6 mt-4">
          <div onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center cursor-pointer">
            <Image 
              src="/image/back.avif" 
              alt="Back" 
              width={40} 
              height={40}
              className="w-full h-auto brightness-110 contrast-110 saturate-110"
              unoptimized
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Scratch and Win</h1>
        </div>

        {/* Scratch Card Container */}
        <div className="flex flex-col items-center gap-4">
          <div 
            ref={containerRef}
            className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500"
          >
            {/* Reveal Content (underneath) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {reward ? (
                <>
                  <div className="text-6xl mb-4">{reward.emoji}</div>
                  <div className="text-3xl font-bold text-white mb-2 text-center">
                    {reward.type === 'jackpot' ? 'JACKPOT!' : 'Congratulations!'}
                  </div>
                  <div className="text-xl text-white text-center">{reward.message}</div>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🎁</div>
                  <div className="text-3xl font-bold text-white mb-2">Scratch to Win!</div>
                  <div className="text-xl text-white">Entry: 10 Coins</div>
                  <div className="text-sm text-white mt-2">You have: {coins} Coins</div>
                </>
              )}
            </div>

            {/* Scratch Overlay Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              style={{ touchAction: 'none' }}
            />
          </div>

          {/* Instructions and Reset Button */}
          <div className="flex flex-col items-center gap-4 w-full">
            {!isRevealed && (
              <div className="text-center">
                <p className="text-white text-center text-sm mb-2">
                  Scratch the card to reveal your prize!
                </p>
                <p className="text-yellow-400 text-xs">
                  Entry Fee: 10 Coins | Your Coins: {coins}
                </p>
                {!hasEnoughCoins(10) && (
                  <p className="text-red-400 text-xs mt-2">
                    Not enough coins! Watch ads to earn more.
                  </p>
                )}
              </div>
            )}
            {isRevealed && (
              <div className="text-center">
                {reward && reward.type !== 'error' && (
                  <p className="text-green-400 font-bold mb-2">Prize Revealed!</p>
                )}
                {hasEnoughCoins(10) ? (
                  <button
                    onClick={resetScratch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Scratch Again (10 Coins)
                  </button>
                ) : (
                  <p className="text-red-400 text-sm">
                    Not enough coins to play again. Watch ads to earn more!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ad Component */}
        <div className="mt-8 mb-6">
          <AdGoogle slotId="8724045973" size="large" />
        </div>
      </div>
    </div>
  );
}

