'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Clothes() {
  const router = useRouter();
  const clothingItems = [
    { id: 1, image: "/cloth1.png", alt: "Cloth 1" },
    { id: 2, image: "/cloth2.png", alt: "Cloth 2" },
    { id: 3, image: "/cloth3.png", alt: "Cloth 3" },
    { id: 4, image: "/cloth4.png", alt: "Cloth 4" },
    { id: 5, image: "/cloth5.png", alt: "Cloth 5" },
    { id: 6, image: "/cloth6.png", alt: "Cloth 6" },
  ];

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
          <h1 className="text-2xl font-bold text-white">Select Clothes</h1>
        </div>

        {/* Clothing Grid - 2 columns, 3 rows */}
        <div className="grid grid-cols-2 gap-4">
          {clothingItems.map((item) => (
            <Link key={item.id} href="/anime">
              <div className="relative overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                <Image 
                  src={item.image} 
                  alt={item.alt} 
                  width={200} 
                  height={200}
                  className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
                  quality={100}
                  unoptimized
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

