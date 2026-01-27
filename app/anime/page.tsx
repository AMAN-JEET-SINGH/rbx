'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Content: edit this array to add or change anime options. Image is /image/anime.avif; use `name` for the label.
const animeOptions = [
  { id: 1, name: "DJ Vibes" },
  { id: 2, name: "Urban Skater" },
  { id: 3, name: "Pink Trendsetter" },
  { id: 4, name: "Hoodie Queen" },
  { id: 5, name: "Basketball Star" },
  { id: 6, name: "Neon Chill" },
  { id: 7, name: "Rainbow Glow" },
];


export default function Anime() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header with Back Button and Title */}
        <div className="flex items-center gap-4 mb-6 mt-4">
          <div
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center cursor-pointer"
          >
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
          <h1 className="text-2xl font-bold text-white">Select Anime :</h1>
        </div>

        {/* Anime list - vertical cards */}
        <div className="space-y-3">
          {animeOptions.map((item, i) => (
            <Link key={item.id} href="/skin">
              <div className="flex items-center gap-3 rounded-xl bg-[#1a1a1f] px-4 py-3 cursor-pointer hover:opacity-90 transition-opacity mt-3">
                <Image
                  src="/image/anime.avif"
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 object-contain brightness-110 contrast-110 saturate-110"
                  unoptimized
                  priority={i < 2}
                />
                <span className="text-base font-bold text-white">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
