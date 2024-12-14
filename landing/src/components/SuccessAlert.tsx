import React from 'react';
import { CheckCircle2, TrendingUp, X } from 'lucide-react';

interface SuccessAlertProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: {
    success: boolean;
    data: {
      aiPrediction: {
        prediction: {
          success_probability_percentage: number;
        };
      };
      summary: {
        predictedSuccess: number;
        initialInvestment: number;
        targetRevenue: number;
      };
    };
  };
  onViewDetails: () => void;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isOpen,
  onClose,
  prediction,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  const successRate = prediction.data.aiPrediction.prediction.success_probability_percentage;
  console.log(prediction);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[400px] border border-green-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Prediction Complete</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
            <span className="text-sm text-gray-600">Success Rate</span>
            <span className="text-lg font-bold text-green-600">{successRate}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="text-xs text-indigo-600 mb-1">Investment</div>
              <div className="text-sm font-semibold">
                {prediction.data.summary.initialInvestment.toLocaleString()} DZD
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-xs text-purple-600 mb-1">Target</div>
              <div className="text-sm font-semibold">
                {prediction.data.summary.targetRevenue.toLocaleString()} DZD
              </div>
            </div>
          </div>

          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            <TrendingUp className="w-4 h-4" />
            View Detailed Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
