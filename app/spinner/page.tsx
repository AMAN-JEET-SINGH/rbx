'use client';
/**
 * SPINNER ASSETS – copy into public/:
 *   wheel-base.svg, rbxlogo.svg, spin.svg
 */

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCoins } from '../contexts/CoinContext';

interface Prize {
  label: string;
  value: number;
}

export default function SpinWheelPage() {
  const router = useRouter();
  const { addCoins, deductCoins, hasEnoughCoins, coins } = useCoins();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ label: string; value: number } | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  // 8 segments: rbxlogo + number each (like the reference image)
  const prizes: Prize[] = [
    { label: '200', value: 200 },
    { label: '10', value: 10 },
    { label: '100', value: 100 },
    { label: '20', value: 20 },
    { label: '120', value: 120 },
    { label: '30', value: 30 },
    { label: '150', value: 150 },
    { label: '50', value: 50 },
  ];

  const spinCost = 50;
  const anglePerPrize = 360 / prizes.length;

  // Helper: which prize is at the pointer (top)
  const getPrizeAtPointer = (currentRotation: number): number => {
    let normalizedRotation = currentRotation % 360;
    if (normalizedRotation < 0) normalizedRotation += 360;

    let minDiff = 360;
    let closestIndex = 0;

    for (let i = 0; i < prizes.length; i++) {
      const coinAngleFromXAxis = (i * anglePerPrize + anglePerPrize / 2) - 68;
      const coinAngleFromTop = (coinAngleFromXAxis + 90 + 360) % 360;
      const coinAbsoluteAngle = (coinAngleFromTop + normalizedRotation) % 360;
      const diff = Math.min(coinAbsoluteAngle, 360 - coinAbsoluteAngle);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const handleSpin = () => {
    if (spinning) return;

    if (!hasEnoughCoins(spinCost)) {
      return;
    }

    setSpinning(true);
    setResult(null);
    setShowMessage(false);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    const currentNormalizedRotation = rotation % 360;
    const coinAngleFromXAxis = (randomIndex * anglePerPrize + anglePerPrize / 2) - 68;
    const coinAngleFromTop = (coinAngleFromXAxis + 90 + 360) % 360;
    let targetAngle = (360 - coinAngleFromTop) % 360;
    if (targetAngle < 0) targetAngle += 360;

    let rotationNeeded = targetAngle - currentNormalizedRotation;
    if (rotationNeeded < 0) rotationNeeded += 360;

    const extraRotations = 5;
    const totalRotation = rotation + 360 * extraRotations + rotationNeeded;

    setRotation(totalRotation);
    deductCoins(spinCost);

    setTimeout(() => {
      const actualPrizeIndex = getPrizeAtPointer(totalRotation);
      const actualPrize = prizes[actualPrizeIndex];
      setResult(actualPrize);
      setShowMessage(true);
      if (actualPrize.value > 0) {
        addCoins(actualPrize.value);
      }
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 mt-4">
          <div
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/back.svg"
              alt="Back"
              width={40}
              height={40}
              className="w-full h-auto brightness-110 contrast-110 saturate-110"
              unoptimized
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Spin Wheel</h1>
        </div>

        {/* Coins & cost */}
        <div className="flex items-center justify-center gap-4 text-white mb-4">
          <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-lg">
            <Image src="/rbxlogo.svg" alt="Coins" width={20} height={20} className="w-5 h-5" unoptimized priority />
            <span className="font-bold">{coins.toLocaleString()}</span>
          </div>
          {/* <div className="text-sm">
            Cost: <span className="font-bold text-yellow-400">{spinCost} coins</span>
          </div> */}
        </div>

        {/* Wheel container */}
        <div className="bg-[#0F0E15] rounded-xl p-6 shadow-lg mb-4">
          {showMessage && result && (
            <div className="mb-4 px-4 py-3 rounded-xl text-center text-white">
              {result.value > 0 ? (
                <>
                  <p className="text-xl font-bold mb-1">🎉 Congratulations! 🎉</p>
                  <p className="text-lg">You won <span className="font-bold">{result.value} coins</span>!</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold mb-1">😔 Oops! Try Again</p>
                  <p className="text-lg">Better luck next time!</p>
                </>
              )}
            </div>
          )}

          <div className="relative flex flex-col items-center">
            <div className="relative w-80 h-80 mb-6">
              {/* Pointer at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30">
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-yellow-400" />
              </div>

              {/* Rotating wheel */}
              <div
                ref={wheelRef}
                className={`w-full h-full relative rounded-full overflow-hidden ${spinning ? 'transition-transform duration-[3000ms] ease-out' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Wheel base – copy wheel-base.svg into public/ */}
                <Image
                  src="/wheel-base.svg"
                  alt="Wheel Base"
                  fill
                  sizes="320px"
                  className="object-contain"
                  unoptimized
                  priority
                />

                {/* rbxlogo + number per segment, rotated to align with segment */}
                {prizes.map((prize, index) => {
                  const angle = (index * anglePerPrize + anglePerPrize / 2) - 68;
                  const radius = 80;
                  const radian = (angle * Math.PI) / 180;
                  const centerX = 160;
                  const centerY = 160;
                  const x = centerX + radius * Math.cos(radian);
                  const y = centerY + radius * Math.sin(radian);
                  return (
                    <div
                      key={index}
                      className="absolute flex items-center justify-center gap-1.5"
                      style={{
                        left: x,
                        top: y,
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      }}
                    >
                      <Image
                        src="/rbxlogo.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                        unoptimized
                        loading="eager"
                      />
                      <span className="text-white font-bold text-sm drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">
                        {prize.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Center spin button */}
              <button
                onClick={handleSpin}
                disabled={spinning || !hasEnoughCoins(spinCost)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#FBD457] rounded-full border-4 border-yellow-400 flex items-center justify-center z-20 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Image src="/spin.svg" alt="Spin" width={56} height={56} className="w-14 h-14" unoptimized priority />
              </button>
            </div>

            {/* Bottom spin button */}
            <button
              onClick={handleSpin}
              disabled={spinning || !hasEnoughCoins(spinCost)}
              className="w-full bg-[#FBD457] text-[#392C6E] font-bold py-4 px-8 rounded-xl text-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
            >
              {spinning ? 'Spinning...' : `Spin (${spinCost} coins)`}
            </button>

            {!hasEnoughCoins(spinCost) && (
              <p className="text-white/70 text-sm mt-3">
                Need {spinCost} coins to spin. Earn coins to play.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
