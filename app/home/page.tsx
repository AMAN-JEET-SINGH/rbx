'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCoins } from "../contexts/CoinContext";
import AdModal from "../components/AdModal";
import AdGoogle from "../components/AdGoogle";

export default function Home() {
  const { coins } = useCoins();
  const [showAd, setShowAd] = useState(false);
  const [canEarn, setCanEarn] = useState(true);
  const [nextEarnTime, setNextEarnTime] = useState<string>("");

  useEffect(() => {
    // Check if user can earn coins (24-hour cooldown)
    const lastEarnTime = localStorage.getItem("lastEarnCoinsTime");
    if (lastEarnTime) {
      const lastTime = new Date(lastEarnTime).getTime();
      const now = new Date().getTime();
      const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setCanEarn(false);
        const hoursRemaining = 24 - hoursPassed;
        const nextTime = new Date(now + hoursRemaining * 60 * 60 * 1000);
        setNextEarnTime(nextTime.toLocaleTimeString());
      } else {
        setCanEarn(true);
      }
    }
  }, []);

  const handleEarnCoins = () => {
    if (canEarn) {
      setShowAd(true);
    }
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
                  src="/image/coin-earn.avif" 
                  alt="Coin Earn" 
                  width={38} 
                  height={38}
                  className="brightness-110 contrast-110 saturate-110"
                  priority
                />
                <div className="text-md font-bold text-white">{coins}</div>
              </div>
            </div>
            
            {/* EARN FREE COINS Button with Ad Label Outside */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <button 
                  onClick={handleEarnCoins}
                  disabled={!canEarn}
                  className={`w-full relative py-3 px-1 rounded-3xl flex items-center justify-center overflow-hidden transition-opacity ${
                    canEarn ? 'bg-[#7f3e31]' : 'bg-gray-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Continuous Shine Effect */}
                  {canEarn && <div className="absolute inset-0 shine-animation"></div>}
                  
                  {/* Button Content */}
                  <div className="flex items-center gap-3 relative z-10">
                    {/* Coin Icon in Button */}
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Image 
                        src="/image/coin.avif" 
                        alt="Coin Earn" 
                        width={24} 
                        height={24}
                        className="brightness-110 contrast-110 saturate-110"
                        unoptimized
                        priority
                      />
                    </div>
                    <span className="text-white font-sm font-bold text-base uppercase">
                      {canEarn ? "EARN FREE COINS" : "Come back in 24h"}
                    </span>
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
      <div className="text-white text-center text-sm mt-5">
        <Link href="/daily">
        <Image 
          src="/image/daily.avif" 
          alt="Image" 
          width={400} 
          height={400}
          className="w-full h-auto object-contain"
          quality={100}
          unoptimized
          priority
          sizes="(max-width: 425px) 100vw, 400px"
        />
        </Link>
      </div>
      <AdGoogle slotId="8724045973" size="large" />
      {/* Four Cards Grid */}
      <div className="w-full max-w-md px-1 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Get Daily RBX */}
          <div className="relative overflow-hidden rounded-xl">
          <Link href="/clothes">
            <Image 
              src="/image/getDaily.avif" 
              alt="Daily RBX" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
              sizes="(max-width: 425px) 50vw, 150px"
            />
            </Link>
          </div>

          {/* Card 2: Spin Wheel */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/spinner">
            <Image 
              src="/image/spinner.avif" 
              alt="Spin Wheel" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
              sizes="(max-width: 425px) 50vw, 150px"
            />
            </Link>
          </div>

          {/* Card 3: Scratch and Win */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/scratch">
            <Image 
              src="/image/scratch.avif" 
              alt="Scratch and Win" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
              sizes="(max-width: 425px) 50vw, 150px"
            />
            </Link>
          </div>

          {/* Card 4: Memes For Fun */}
          <div className="relative overflow-hidden rounded-xl">
            <Link href="/memes">
            <Image 
              src="/image/meme.avif" 
              alt="Memes For Fun" 
              width={300} 
              height={300}
              className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
              quality={100}
              unoptimized
              priority
              sizes="(max-width: 425px) 50vw, 150px"
            />
            </Link>
          </div>
        </div>
      </div>

      {/* Two List Items Below Grid */}
      <div className="w-full max-w-md px-1 mt-4 space-y-3">
        {/* RBX TO Dollar */}
        <div className="relative overflow-hidden rounded-xl">
          <Link href="/rbx-to-dollar">
          <Image 
            src="/image/rd_main.avif" 
            alt="RBX TO Dollar" 
            width={500} 
            height={300}
            className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={100}
            unoptimized
            priority
          />
          </Link>
        </div>

        {/* Dollar To RBX */}
        <div className="relative overflow-hidden rounded-xl">
          <Link href="/dollar-to-rbx">
          <Image 
            src="/image/dr_main.avif" 
            alt="Dollar To RBX" 
            width={400} 
            height={100}
            className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={100}
            unoptimized
            priority
          />
          </Link>
        </div>
      </div>
      
      <AdModal 
        isOpen={showAd} 
        onClose={() => setShowAd(false)}
      />
    </div>
    </>
  );
}
