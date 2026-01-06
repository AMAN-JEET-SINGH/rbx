'use client';

import { useState, useEffect, useRef } from 'react';

interface WaitingTimerProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function WaitingTimer({ isOpen, onComplete }: WaitingTimerProps) {
  const [countdown, setCountdown] = useState(8);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(8);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Use setTimeout to defer the callback to after render
          setTimeout(() => {
            onCompleteRef.current();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg px-4 py-3 max-w-xs w-full mx-4 flex items-center gap-3 shadow-lg">
        <div className="text-2xl">🕐</div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold text-sm">Wait {countdown}s...</p>
        </div>
      </div>
    </div>
  );
}

