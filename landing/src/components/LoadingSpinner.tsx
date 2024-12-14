import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Analyzing Your Business Plan</h3>
          <p className="text-sm text-gray-500 mt-1">This may take a few moments...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
