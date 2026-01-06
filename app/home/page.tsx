'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCoins } from "../contexts/CoinContext";
import AdModal from "../components/AdModal";

export default function Home() {
  const { coins } = useCoins();
  const [showAd, setShowAd] = useState(false);

  const handleEarnCoins = () => {
    setShowAd(true);
  };

  const handleAdComplete = () => {
    // This will be handled by the AdModal component
  };

  return (
    <>
      <div className="min-h-screen p-2">
        <div className="w-full max-w-md px-4">
          {/* Title */}
          <h1 className="text-xl font-bold text-white text-center mt-4 mb-3">Get Rbux Counter</h1>
          
          {/* Counter Container */}
          <div className=" rounded-xl border border-[#919297] p-5 space-y-2 px-3">
            {/* Coin Balance Display */}
            <div className="flex items-center justify-center">
              <div className="flex justify-center items-center gap-2">
                <Image 
                  src="/coin-earn.png" 
                  alt="Coin Earn" 
                  width={38} 
                  height={38}
                  className="brightness-110 contrast-110 saturate-110"
                  unoptimized
                />
                <div className="text-md font-bold text-white">{coins}</div>
              </div>
            </div>
            
            {/* EARN FREE COINS Button with Ad Label Outside */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <button 
                  onClick={handleEarnCoins}
                  className="w-full relative py-3 px-1 rounded-3xl bg-[#7f3e31] flex items-center justify-center overflow-hidden"
                >
                  {/* Continuous Shine Effect */}
                  <div className="absolute inset-0 shine-animation"></div>
                  
                  {/* Button Content */}
                  <div className="flex items-center gap-3 relative z-10">
                    {/* Coin Icon in Button */}
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Image 
                        src="/coin.png" 
                        alt="Coin Earn" 
                        width={24} 
                        height={24}
                        className="brightness-110 contrast-110 saturate-110"
                        unoptimized
                      />
                    </div>
                    <span className="text-white font-sm font-bold text-base uppercase">EARN FREE COINS</span>
                  </div>
                </button>
              </div>
              
              {/* Ad Label - Top right corner, outside the button */}
              <span 
                className="absolute top-0 -right-3 text-white text-[0.7rem] font-medium" 
                style={{ textOrientation: 'mixed' }}
              >
                Ad
              </span>
            </div>
          </div>

      </div>
      <div className="text-white text-center text-sm mt-1">
        <Link href="/daily">
        <Image 
          src="/daily.webp" 
          alt="Image" 
          width={400} 
          height={400}
          className="w-full h-auto object-contain"
          quality={100}
          unoptimized
          priority
        />
        </Link>
      </div>

      {/* Four Cards Grid */}
      <div className="w-full max-w-md px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Get Daily RBX */}
          <div className="relative overflow-hidden rounded-xl">
          <Link href="/clothes">
            <Image 
              src="/getDaily.webp" 
              alt="Daily RBX" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
            />
            </Link>
          </div>

          {/* Card 2: Spin Wheel */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/spinner">
            <Image 
              src="/spinner.webp" 
              alt="Spin Wheel" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
            />
            </Link>
          </div>

          {/* Card 3: Scratch and Win */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/scratch">
            <Image 
              src="/scratch.webp" 
              alt="Scratch and Win" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
            />
            </Link>
          </div>

          {/* Card 4: Memes For Fun */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/memes">
            <Image 
              src="/meme.webp" 
              alt="Memes For Fun" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
            />
            </Link>
          </div>
        </div>
      </div>

      {/* Two List Items Below Grid */}
      <div className="w-full max-w-md px-4 mt-4 space-y-3">
        {/* RBX TO Dollar */}
        <div className="relative overflow-hidden rounded-xl">
          <Link href="/rbx-to-dollar">
          <Image 
            src="/rd_main.webp" 
            alt="RBX TO Dollar" 
            width={400} 
            height={100}
            className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={100}
            unoptimized
          />
          </Link>
        </div>

        {/* Dollar To RBX */}
        <div className="relative overflow-hidden rounded-xl">
          <Link href="/dollar-to-rbx">
          <Image 
            src="/dr_main.webp" 
            alt="Dollar To RBX" 
            width={400} 
            height={100}
            className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={100}
            unoptimized
          />
          </Link>
        </div>
      </div>
      
      <AdModal 
        isOpen={showAd} 
        onClose={() => setShowAd(false)} 
        onComplete={handleAdComplete}
      />
    </div>
    </>
  );
}
