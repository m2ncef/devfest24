import React from 'react';
import { X, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: {
    success: boolean;
    data: {
      aiPrediction: any;
      summary: {
        initialInvestment: number;
        targetRevenue: number;
        predictedSuccess: number;
        recommendedActions: string[];
      };
    };
  } | null;
}

const PredictionModal: React.FC<PredictionModalProps> = ({ isOpen, onClose, prediction }) => {
  if (!isOpen || !prediction) return null;

  const { success, data } = prediction;
  const successPercentage =
    Math.round(data.summary.predictedSuccess * 100) ||
    Math.round(data.aiPrediction.prediction.success_probability * 100);

  const defaultRecommendations = [
    'Develop a comprehensive market entry strategy',
    'Build a strong online presence and brand identity',
    'Focus on customer acquisition and retention',
    'Monitor cash flow and adjust budget accordingly',
  ];

  const recommendations =
    data.summary.recommendedActions?.length > 0
      ? data.summary.recommendedActions
      : defaultRecommendations;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Modal Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Business Prediction Results
              </h2>
              <p className="text-gray-600 mt-2">Here's our analysis of your business plan</p>
            </div>

            {/* Success Rate Circle */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-600">{successPercentage}%</div>
                    <div className="text-sm text-gray-500 mt-1">Success Rate</div>
                  </div>
                </div>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2.5"
                    className="drop-shadow-sm"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2.5"
                    strokeDasharray={`${successPercentage}, 100`}
                    className="drop-shadow-md"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-sm">
                <div className="text-sm text-indigo-600 mb-1 font-medium">Initial Investment</div>
                <div className="text-2xl font-bold text-indigo-900">
                  {data.summary.initialInvestment.toLocaleString()} DZD
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm">
                <div className="text-sm text-purple-600 mb-1 font-medium">Target Revenue</div>
                <div className="text-2xl font-bold text-purple-900">
                  {data.summary.targetRevenue.toLocaleString()} DZD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
