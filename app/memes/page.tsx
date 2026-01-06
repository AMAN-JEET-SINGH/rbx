'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Meme() {
  const router = useRouter();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const memes = [
    {
      id: 1,
      title: "OOF at Spawn",
      description: "That moment when you join the game... and immediately fall off the map",
      text: "That moment when you join the game... and immediately fall off the map"
    },
    {
      id: 2,
      title: "Lag Got Me Like...",
      description: "I jumped 5 seconds ago, why am I still in the air?",
      text: "I jumped 5 seconds ago, why am I still in the air?"
    },
    {
      id: 3,
      title: "Blind Trust 😳🤝",
      description: "Follow me, I swear I know the way... dies instantly",
      text: "Follow me, I swear I know the way... dies instantly"
    },
    {
      id: 4,
      title: "Broken Dreams 💸💭",
      description: "Me checking my balance: 0 Robux. Me in my imagination: Gucci on Roblox",
      text: "Me checking my balance: 0 Robux. Me in my imagination: Gucci on Roblox"
    },
    {
      id: 5,
      title: "Builderman Watching 👀🧱",
      description: "That paranoid feeling when you think an admin is in your game 👀",
      text: "That paranoid feeling when you think an admin is in your game 👀"
    },
    {
      id: 6,
      title: "1 Free Item Avatar 🐷🎩",
      description: "Fashion disaster but make it Roblox",
      text: "Fashion disaster but make it Roblox"
    },
    {
      id: 7,
      title: "The Classic OOF",
      description: "When you die for the 100th time in the same obby",
      text: "When you die for the 100th time in the same obby"
    },
    {
      id: 8,
      title: "Robux Reality Check 💰",
      description: "Parent: What do you want for your birthday? Me: Robux. Just Robux.",
      text: "Parent: What do you want for your birthday? Me: Robux. Just Robux."
    },
    {
      id: 9,
      title: "Adopt Me Vibes 🐶",
      description: "Spent 5 hours grinding for a neon pet just for it to be worth 10 Robux",
      text: "Spent 5 hours grinding for a neon pet just for it to be worth 10 Robux"
    },
    {
      id: 10,
      title: "Script Kiddie Problems",
      description: "Me: *uses free admin script* Also me: *gets banned*",
      text: "Me: *uses free admin script* Also me: *gets banned*"
    }
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header with Back Button and Title */}
        <div className="flex items-center gap-4 mb-6 mt-4">
          <div onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center cursor-pointer">
            <Image 
              src="/back.webp" 
              alt="Back" 
              width={40} 
              height={40}
              className="w-full h-auto brightness-110 contrast-110 saturate-110"
              unoptimized
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Memes For Fun</h1>
        </div>

        {/* Memes List */}
        <div className="space-y-3">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="bg-[#1a1a1f] rounded-xl p-4 flex items-start justify-between gap-3"
            >
              {/* Meme Content */}
              <div className="flex-1">
                <h3 className="text-gray-300 font-semibold text-sm mb-2">{meme.title}</h3>
                <p className="text-white text-sm">{meme.description}</p>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(meme.text, meme.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex-shrink-0 ${
                  copiedIndex === meme.id
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {copiedIndex === meme.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

