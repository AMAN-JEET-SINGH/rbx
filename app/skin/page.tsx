'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdGoogle from "../components/AdGoogle";
import WaitingTimer from "../components/WaitingTimer";

// Content: edit this array for skin options. Each row shows exactly 2 images; AdGoogle appears after the first row.
const skinOptions = [
  { id: 1, image: "/skin1.svg", alt: "Skin 1" },
  { id: 2, image: "/skin2.svg", alt: "Skin 2" },
  { id: 3, image: "/skin3.svg", alt: "Skin 3" },
  { id: 4, image: "/skin4.svg", alt: "Skin 4" },
  { id: 5, image: "/skin5.svg", alt: "Skin 5" },
  { id: 6, image: "/skin6.svg", alt: "Skin 6" },
  { id: 7, image: "/skin7.svg", alt: "Skin 7" },
  { id: 8, image: "/skin8.svg", alt: "Skin 8" },
  { id: 9, image: "/skin9.svg", alt: "Skin 9" },
  { id: 10, image: "/skin10.svg", alt: "Skin 10" },
];

export default function Skin() {
  const router = useRouter();
  const [showTimer, setShowTimer] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const firstRow = skinOptions.slice(0, 2);
  const rest = skinOptions.slice(2);

  const handleSkinClick = (id: number) => {
    setRedirectPath(`/skinactive?id=${id}`);
    setShowTimer(true);
  };

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
              src="/back.svg"
              alt="Back"
              width={40}
              height={40}
              className="w-full h-auto brightness-110 contrast-110 saturate-110"
              unoptimized
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Select Skin</h1>
        </div>

        {/* First row: exactly 2 images */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {firstRow.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSkinClick(item.id)}
              className="relative overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={200}
                height={200}
                className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
                unoptimized
                priority
                sizes="(max-width: 425px) 50vw, 200px"
              />
            </div>
          ))}
        </div>

        {/* AdGoogle after first two images */}
        <div className="mb-4">
          <AdGoogle />
        </div>

        {/* Remaining rows: exactly 2 images per row */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {rest.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSkinClick(item.id)}
                className="relative overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain brightness-110 contrast-110 saturate-110"
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 425px) 50vw, 200px"
                />
              </div>
            ))}
          </div>
        )}

        <WaitingTimer
          isOpen={showTimer}
          onComplete={() => {
            setShowTimer(false);
            if (redirectPath) router.push(redirectPath);
          }}
        />
      </div>
    </div>
  );
}
