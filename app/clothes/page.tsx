'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Clothes() {
  const router = useRouter();
  const clothingItems = [
    { id: 1, image: "/image/cloth1.avif", alt: "Cloth 1" },
    { id: 2, image: "/image/cloth2.avif", alt: "Cloth 2" },
    { id: 3, image: "/image/cloth3.avif", alt: "Cloth 3" },
    { id: 4, image: "/image/cloth4.avif", alt: "Cloth 4" },
    
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
          <h1 className="text-2xl font-bold text-white">Select Clothes</h1>
        </div>

        {/* Clothing Grid - 2 columns, 3 rows */}
        <div className="grid grid-cols-2 gap-4">
          {clothingItems.map((item, i) => (
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
                  priority={i < 2}
                  loading={i < 2 ? undefined : "eager"}
                  sizes="(max-width: 425px) 50vw, 200px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

