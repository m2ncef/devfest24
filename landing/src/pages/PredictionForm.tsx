import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, ArrowRight, Send, Store, Code, Palette } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DemoSchema, DemoType } from '../types/demo/schema';
import type { Swiper as SwiperType } from 'swiper';
import { API_URL } from '../lib/consts';
import PredictionModal from '../components/PredictionModal';
import SuccessAlert from '../components/SuccessAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';

const PredictionForm = () => {
  const [step, setStep] = useState(1);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<DemoType>({
    resolver: zodResolver(DemoSchema),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (step !== 3) {
      handleNext();
      return;
    }

    const data = getValues();

    if (
      !selectedCategory ||
      !data.description ||
      !data.datestart ||
      !data.montestart ||
      !data.monthend ||
      step !== 3
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const requestBody = {
        category: selectedCategory,
        description: data.description,
        datestart: data.datestart,
        montestart: data.montestart,
        monthend: data.monthend,
      };

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Server error occurred. Please try again.');
      }

      const result = await response.json();
      setPredictionResult(result as any);
      setShowSuccessAlert(true);
    } catch (err) {
      const error = err as Error;
      console.error('Submission error:', error);
      setError(error.message || 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
      setStep(step - 1);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setValue('category', categoryId as 'ecommerce' | 'design' | 'development');
    console.log('Category selected:', categoryId);
  };

  const categories = [
    {
      id: 'ecommerce',
      title: 'E-Commerce',
      icon: <Store className="w-8 h-8" />,
      description: 'Online retail and digital product sales',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'design',
      title: 'Design Services',
      icon: <Palette className="w-8 h-8" />,
      description: 'Graphic design and creative services',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'development',
      title: 'Full Stack Development',
      icon: <Code className="w-8 h-8" />,
      description: 'Web and software development services',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const formSteps = [
    // Step 1
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          Choose Your Business Category
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 
                ${errors.category ? 'border-red-200 bg-red-50' : 'border-gray-100'} 
                ${
                  selectedCategory === category.id
                    ? `border-transparent ring-2 ring-indigo-500 bg-gradient-to-br ${category.color} shadow-lg transform -translate-y-1`
                    : 'hover:border-indigo-100 hover:bg-indigo-50/50 bg-white'
                }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <input
                type="radio"
                {...register('category')}
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategorySelect(category.id)}
                className="sr-only"
              />
              <div
                className={`mb-3 transition-colors duration-200 
                ${selectedCategory === category.id ? 'text-white' : 'text-indigo-600'}`}
              >
                {category.icon}
              </div>
              <h3
                className={`text-base font-semibold mb-2 transition-colors duration-200
                ${selectedCategory === category.id ? 'text-white' : 'text-gray-800'}`}
              >
                {category.title}
              </h3>
              <p
                className={`text-sm text-center transition-colors duration-200
                ${selectedCategory === category.id ? 'text-white/90' : 'text-gray-500'}`}
              >
                {category.description}
              </p>
            </div>
          ))}
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm mt-3 text-center">{errors.category.message}</p>
        )}
      </div>
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          Project Description
        </label>
        <textarea
          {...register('description')}
          placeholder="Tell us about your business project..."
          className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-base 
            placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none 
            transition-all duration-200"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
        )}
      </div>
    </div>,
    // Step 2
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Launch Date</label>
        <Input type="date" {...register('datestart')} className="w-full" />
        {errors.datestart && (
          <p className="text-red-500 text-sm mt-1">{errors.datestart.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Initial Budget (DZD)</label>
        <Input
          type="number"
          {...register('montestart')}
          placeholder="Enter your starting budget"
          className="w-full"
        />
        {errors.montestart && (
          <p className="text-red-500 text-sm mt-1">{errors.montestart.message}</p>
        )}
      </div>
    </div>,
    // Step 3
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Revenue (DZD)</label>
        <Input
          type="number"
          {...register('monthend')}
          placeholder="Enter your revenue goal"
          className="w-full"
        />
        {errors.monthend && <p className="text-red-500 text-sm mt-1">{errors.monthend.message}</p>}
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900">
              Business Prediction Form
            </h1>
            <p className="text-gray-600 mt-2">
              Step {step} of 3:{' '}
              {step === 1
                ? 'Business Information'
                : step === 2
                ? 'Timeline & Budget'
                : 'Revenue Goals'}
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <Swiper
              onSwiper={setSwiper}
              initialSlide={step - 1}
              modules={[Navigation, Pagination]}
              allowTouchMove={false}
              className="h-[300px]"
              onSlideChange={(swiper) => setStep(swiper.activeIndex + 1)}
            >
              {formSteps.map((stepContent, index) => (
                <SwiperSlide key={index}>{stepContent}</SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
                >
                  Submit
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${
                  i <= step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <LoadingSpinner isOpen={isLoading} />

      <ErrorModal isOpen={!!error} onClose={() => setError(null)} error={error || ''} />

      <SuccessAlert
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        prediction={predictionResult as any}
        onViewDetails={() => {
          setShowSuccessAlert(false);
          setIsModalOpen(true);
        }}
      />

      <PredictionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prediction={predictionResult}
      />
    </div>
  );
};

export default PredictionForm;
