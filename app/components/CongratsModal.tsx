'use client';

interface CongratsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CongratsModal({ isOpen, onClose }: CongratsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl px-6 py-6 max-w-sm w-full shadow-xl text-center">
        {/* Party / Confetti Icon */}
        <div className="text-5xl mb-3">🎊</div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">Congratulation</h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Your Rbux Skin will be added to your Collections within 24 hours.
        </p>

        {/* OK, Done Button */}
        <button
          onClick={onClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          OK, Done
        </button>
      </div>
    </div>
  );
}
