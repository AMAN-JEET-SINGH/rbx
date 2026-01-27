'use client';

import Image from "next/image";

interface OopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchAd: () => void;
}

export default function OopsModal({ isOpen, onClose, onWatchAd }: OopsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-[#2a2a2a] rounded-lg p-6 max-w-sm w-full mx-4">
        {/* OOPS Image */}
        <div className="flex justify-center mb-4">
          <Image 
            src="/oops.png" 
            alt="OOPS" 
            width={200} 
            height={100}
            className="w-auto h-auto object-contain brightness-110 contrast-110 saturate-110"
            quality={85}
            sizes="200px"
            loading="eager"
          />
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-white font-bold text-lg mb-2">
            You don't have enough coins to join this contest.
          </p>
          <p className="text-white text-base">
            Watch an ad to earn free coins
          </p>
        </div>

        {/* Watch Video Button */}
        <button
          onClick={onWatchAd}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors mb-4 uppercase"
        >
          WATCH VIDEO
        </button>

        {/* Close Link */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="text-white underline text-sm"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

