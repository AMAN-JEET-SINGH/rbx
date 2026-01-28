'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdGoogle from "../components/AdGoogle";
import { useCoins } from "../contexts/CoinContext";
import OopsModal from "../components/OopsModal";
import AdModal from "../components/AdModal";

export default function RbxToDollar() {
  const router = useRouter();
  const { deductCoins, hasEnoughCoins, coins } = useCoins();
  const [rbx, setRbx] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showOopsModal, setShowOopsModal] = useState(false);
  const [showAd, setShowAd] = useState(false);

  // Conversion rate: 1000 RBX = $12.50
  // So 1 RBX = $0.0125
  const calculateDollar = (rbxAmount: number): number => {
    const dollarPerRBX = 12.50 / 1000; // $0.0125 per RBX
    return rbxAmount * dollarPerRBX;
  };

  const handleCount = () => {
    // Check if user has enough coins (entry fee is 10 coins)
    if (!hasEnoughCoins(10)) {
      setShowOopsModal(true);
      return;
    }

    const rbxAmount = parseFloat(rbx);
    if (isNaN(rbxAmount) || rbxAmount <= 0) {
      alert('Please enter a valid RBX amount');
      return;
    }

    // Deduct entry fee
    deductCoins(10);

    const calculatedDollar = calculateDollar(rbxAmount);
    setResult(calculatedDollar);
    setShowResult(true);
  };

  const handleWatchAd = () => {
    setShowOopsModal(false);
    setShowAd(true);
  };

  const handleAdComplete = () => {
    // Ad completion adds coins (handled by AdModal)
    setShowAd(false);
  };

  return (
    <>
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
            <h1 className="text-2xl font-bold text-white">RBX To Dollar Calculator</h1>
          </div>

          {/* Main Graphic */}
          <div className="mb-6 flex justify-center">
            <Image 
              src="/image/charactergrp.avif" 
              alt="RBX To Dollar" 
              width={220} 
              height={220}
              className="max-h-[120px] w-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
              sizes="(max-width: 425px) 220px, 220px"
            />
          </div>

          {/* Entry Fee Info */}
          <div className="mb-4 text-center">
            <p className="text-yellow-400 text-sm">
              Entry Fee: 10 Coins | Your Coins: {coins}
            </p>
          </div>

          {/* Input Field */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter RBX Amount"
              value={rbx}
              onChange={(e) => {
                setRbx(e.target.value);
                setShowResult(false);
              }}
              className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1f] border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              min="0"
              step="0.01"
            />
          </div>

          {/* Count Now Button */}
          <div className="mb-6 relative overflow-hidden rounded-2xl">
            <button
              onClick={handleCount}
              className="w-full relative bg-gradient-to-b from-orange-400 to-orange-600 hover:opacity-95 text-white font-bold py-4 px-6 rounded-2xl transition-all overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 shine-animation"></div>
              <span className="relative z-10">Count Now</span>
            </button>
          </div>

          {/* Ad Component */}
          <div className="mb-6">
            <AdGoogle slotId="8724045973" size="large" />
          </div>

          {/* Result Display */}
          {showResult && result !== null && (
            <div className="mb-6 p-6 bg-[#1a1a1f] rounded-lg border border-orange-500">
              <div className="text-center">
                <p className="text-white text-lg mb-2">Estimated Dollar Value:</p>
                <p className="text-orange-500 text-3xl font-bold">${result.toFixed(2)}</p>
                <p className="text-gray-400 text-sm mt-2">For {rbx} RBX</p>
              </div>
            </div>
          )}

          {/* Descriptive Text Section */}
          {/* <div className="w-full space-y-4 text-white">
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
          </div> */}
        </div>
      </div>

      {/* OOPS Modal */}
      <OopsModal
        isOpen={showOopsModal}
        onClose={() => setShowOopsModal(false)}
        onWatchAd={handleWatchAd}
      />

      {/* Ad Modal */}
      <AdModal
        isOpen={showAd}
        onClose={() => setShowAd(false)}
        onComplete={handleAdComplete}
      />
    </>
  );
}

