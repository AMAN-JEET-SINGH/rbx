'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BcRbxCounter() {
  const router = useRouter();
  const [days, setDays] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // BC to RBX conversion logic: 1 day = 15 RBX
  const calculateRBX = (numberOfDays: number): number => {
    // Each day gives 15 RBX
    return numberOfDays * 15;
  };

  const handleCount = () => {
    const numberOfDays = parseInt(days);
    if (isNaN(numberOfDays) || numberOfDays <= 0) {
      alert('Please enter a valid number of days');
      return;
    }
    const calculatedRBX = calculateRBX(numberOfDays);
    setResult(calculatedRBX);
    setShowResult(true);
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
          <h1 className="text-2xl font-bold text-white">BC RBX Counter</h1>
        </div>

        {/* Main Graphic */}
        <div className="mb-6">
          <Image 
            src="/image/charactergrp.avif" 
            alt="Roblox Characters" 
            width={400} 
            height={400}
            className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={100}
            unoptimized
            priority
            sizes="(max-width: 425px) 100vw, 400px"
          />
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter Number of Days"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
              setShowResult(false);
            }}
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1f] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            min="1"
          />
        </div>

        {/* Count Now Button */}
        <div className="mb-6 relative overflow-hidden rounded-lg">
          <button
            onClick={handleCount}
            className="w-full relative bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors overflow-hidden"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 shine-animation"></div>
            <span className="relative z-10">Count Now</span>
          </button>
        </div>

        {/* Result Display */}
        {showResult && result !== null && (
          <div className="mb-6 p-6 bg-[#1a1a1f] rounded-lg border border-orange-500">
            <div className="text-center">
              <p className="text-white text-lg mb-2">Estimated RBX:</p>
              <p className="text-orange-500 text-3xl font-bold">{result} RBX</p>
              <p className="text-gray-400 text-sm mt-2">For {days} days</p>
            </div>
          </div>
        )}

        {/* Descriptive Text Section */}
        <div className="w-full space-y-4 text-white">
          <h2 className="text-2xl font-bold text-center">
            RBX Counter & Fun Rewards – Your Ultimate Robux Calculator!
          </h2>
          
          <p className="text-center text-gray-300">
            Count your daily free robux with our easy-to-use and powerful free robux counter, RBX calc and free robux converter.
          </p>
          
          <div>
            <h3 className="text-xl font-bold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>RBX calculator</li>
              <li>Convert BC, TBC, and OBX to RBX instantly</li>
              <li>RBX to Dollar counter</li>
              <li>Spin & Win – Try your luck and win surprises!</li>
              <li>Quiz Time – Test your RB knowledge and earn points</li>
              <li>Lucky Scratch – Scratch & reveal exciting rewards.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

