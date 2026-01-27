'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import CongratsModal from "../components/CongratsModal";

const skinOptions: { id: number; image: string; alt: string }[] = [
  { id: 1, image: "/image/skin1.avif", alt: "Skin 1" },
  { id: 2, image: "/image/skin2.avif", alt: "Skin 2" },
  { id: 3, image: "/image/skin3.avif", alt: "Skin 3" },
  { id: 4, image: "/image/skin4.avif", alt: "Skin 4" },
  { id: 5, image: "/image/skin5.avif", alt: "Skin 5" },
  { id: 6, image: "/image/skin6.avif", alt: "Skin 6" },
  { id: 7, image: "/image/skin7.avif", alt: "Skin 7" },
  { id: 8, image: "/image/skin8.avif", alt: "Skin 8" },
  { id: 9, image: "/image/skin9.avif", alt: "Skin 9" },
  { id: 10, image: "/image/skin10.avif", alt: "Skin 10" },
];

const DESCRIPTION =
  'This Roblox avatar features a stylish look with a black hoodie branded with "ROBLOX" paired with ripped black jeans and trendy sneakers. The spiky black hairstyle with a red headband adds a bold touch. Perfect for casual yet cool gameplay, this character stands out with confidence and modern streetwear vibes.';

function SkinActiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const skinId = idParam ? parseInt(idParam, 10) : 1;
  const [showCongrats, setShowCongrats] = useState(false);

  const skin = useMemo(
    () => skinOptions.find((s) => s.id === skinId) || skinOptions[0],
    [skinId]
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header: Back + Rbux Skin */}
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
          <h1 className="text-2xl font-bold text-white">Rbux Skin</h1>
        </div>

        {/* Central avatar / skin image */}
        <div className="flex justify-center mb-6">
          <Image
            src={skin.image}
            alt={skin.alt}
            width={280}
            height={280}
            className="w-full max-w-[280px] h-auto object-contain"
            unoptimized
            priority
          />
        </div>

        {/* Dark card: description + Active Now */}
        <div className="rounded-xl border border-gray-600 bg-[#1a1a1f] p-5">
          <p className="text-white text-sm leading-relaxed mb-5">
            {DESCRIPTION}
          </p>
          <button
            onClick={() => setShowCongrats(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Active Now
          </button>
        </div>
      </div>

      <CongratsModal
        isOpen={showCongrats}
        onClose={() => {
          setShowCongrats(false);
          router.push('/home');
        }}
      />
    </div>
  );
}

export default function SkinActive() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black p-4 flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    }>
      <SkinActiveContent />
    </Suspense>
  );
}
