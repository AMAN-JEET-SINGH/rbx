'use client';

import { useState, useEffect } from 'react';
import { useCoins } from '../contexts/CoinContext';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function AdModal({ isOpen, onClose, onComplete }: AdModalProps) {
  const { addCoins } = useCoins();
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setCanSkip(false);
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleComplete = () => {
    if (canSkip) {
      // Add 10 coins when ad is watched
      addCoins(10);
      onComplete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Advertisement</h2>
          
          {/* Ad Placeholder */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-16 mb-6 flex items-center justify-center min-h-[300px]">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">📺</div>
              <p className="text-xl font-semibold">Ad Video Playing</p>
              {!canSkip && (
                <p className="text-sm mt-2">Please wait {countdown} seconds...</p>
              )}
            </div>
          </div>

          {/* Skip/Complete Button */}
          <button
            onClick={handleComplete}
            disabled={!canSkip}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-colors ${
              canSkip
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {canSkip ? 'Complete & Earn 10 Coins' : `Wait ${countdown}s to skip`}
          </button>

          <button
            onClick={onClose}
            className="mt-4 text-gray-400 hover:text-white text-sm underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

