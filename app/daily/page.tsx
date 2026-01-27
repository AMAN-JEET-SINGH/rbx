'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Daily() {
  const router = useRouter();
  const calculatorCards = [
    {
      id: 1,
      image: "/image/routine_image.avif",
      title: "Daily Free Rbx",
      subtitle: "Calculator",
      href: "/daily-free-rbx"
    },
    {
      id: 2,
      image: "/image/rbx_image.avif",
      title: "RBX To Dollar",
      subtitle: "Calculator",
      href: "/rbx-to-dollar"
    },
    {
      id: 3,
      image: "/image/dollar_image.avif",
      title: "Dollar To RBX",
      subtitle: "Calculator",
      href: "/dollar-to-rbx"
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
          <h1 className="text-2xl font-bold text-white">Daily R$ Converter</h1>
        </div>

        {/* Three Calculator Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {calculatorCards.map((card, i) => (
            <Link key={card.id} href={card.href}>
              <div className="">
                {/* Card Image */}
                <div className="flex justify-center mb-3">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    width={120} 
                    height={120}
                    className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
                    quality={100}
                    unoptimized
                    priority={i < 2}
                    loading={i >= 2 ? "eager" : undefined}
                  />
                
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Content Section */}
        <div className="w-full space-y-6 text-white">
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

          <div>
            <h3 className="text-xl font-bold mb-3">Important Information</h3>
            <p>
              RBLX Calc : Robox Counters is an unofficial application and is not affiliated with ROBLOX CORPORATION. It is designed to help players and fans discover free items and is fully compliant with Roblox's community usage guidelines.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Refer to</h3>
            <p>
              The name, logo and information provided by the application used in accordance with the guidelines indicated in:{" "}
              <a 
                href="https://en.help.roblox.com/hc/en-us/articles/115001708126-Roblox-Name-and-Logo-Community-Usage-Guidelines" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                https://en.help.roblox.com/hc/en-us/articles/115001708126-Roblox-Name-and-Logo-Community-Usage-Guidelines
              </a>
            </p>
          </div>

          <p className="text-center font-semibold">Thank you!</p>
        </div>
      </div>
    </div>
  );
}

