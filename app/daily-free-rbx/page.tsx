'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WaitingTimer from "../components/WaitingTimer";

export default function DailyFreeRbx() {
  const router = useRouter();
  const [showTimer, setShowTimer] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const counterCards = [
    {
      id: 1,
      image: "/image/bc.avif",
      title: "BC RBX Counter",
      href: "/bc-rbx-counter"
    },
    {
      id: 2,
      image: "/image/tbc.avif",
      title: "TBC RBX Counter",
      href: "/tbc-rbx-counter"
    },
    {
      id: 3,
      image: "/image/obc.avif",
      title: "OBC RBX Counter",
      href: "/obc-rbx-counter"
    }
  ];

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
          <h1 className="text-2xl font-bold text-white">Daily Free Rbx Calculator</h1>
        </div>

        {/* Three Counter Cards */}
        <div className="space-y-3 mb-6">
          {counterCards.map((card, i) => (
            <div
              key={card.id}
              onClick={() => {
                setRedirectPath(card.href);
                setShowTimer(true);
              }}
              className="relative overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Image 
                src={card.image} 
                alt={card.title} 
                width={400} 
                height={150}
                className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
                quality={100}
                unoptimized
                priority={i < 2}
                loading={i >= 2 ? "eager" : undefined}
              />
            </div>
          ))}
        </div>

        {/* Waiting Timer Modal */}
        <WaitingTimer
          isOpen={showTimer}
          onComplete={() => {
            setShowTimer(false);
            if (redirectPath) {
              router.push(redirectPath);
            }
          }}
        />

        {/* App Description and Features Section */}
        <div className="w-full space-y-4 text-white">
          <h2 className="text-2xl font-bold text-center">
            RBX Counter & Fun Rewards – Your Ultimate Robux Calculator!
          </h2>
          
          <p className="text-center">
            Count your daily free robux with our easy-to-use and powerful free robux counter, RBX calc and free robux converter.
          </p>
          
          <div>
            <h3 className="text-xl font-bold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
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
