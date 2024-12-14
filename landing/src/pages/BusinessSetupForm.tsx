import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, ArrowRight, Send, Target, Wallet, Users2, Store, Code, Palette } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface BusinessFormData {
  // Step 1 - Basic Info
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Step 2 - Business Category
  category: "ecommerce" | "design" | "development" | "";
  // Step 3 - Target & Budget
  targetAudience: string;
  initialBudget: string;
  expectedRevenue: string;
}

const categories = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: <Store className="w-6 h-6" />,
    description: "Online retail and digital product sales",
    dashboard: "/dashboard/ecommerce"
  },
  {
    id: "design",
    title: "Design Services",
    icon: <Palette className="w-6 h-6" />,
    description: "Graphic design and creative services",
    dashboard: "/dashboard/design"
  },
  {
    id: "development",
    title: "Full Stack Development",
    icon: <Code className="w-6 h-6" />,
    description: "Web and software development services",
    dashboard: "/dashboard/development"
  }
];

const BusinessSetupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [swiper, setSwiper] = useState<any>(null);
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    targetAudience: "",
    initialBudget: "",
    expectedRevenue: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const validatePasswords = () => {
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (categoryId: BusinessFormData["category"]) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your API endpoint here
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Redirect to the appropriate dashboard based on category
        const selectedCategory = categories.find(cat => cat.id === formData.category);
        if (selectedCategory) {
          navigate(selectedCategory.dashboard);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNext = () => {
    if (step === 1 && !validatePasswords()) {
      return;
    }
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

  const formSteps = [
    // Step 1 - Basic Information
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Name
        </label>
        <Input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          placeholder="Enter your business name"
          className="w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Owner Name
        </label>
        <Input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleInputChange}
          placeholder="Enter owner's name"
          className="w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          className="w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          className="w-full"
          required
        />
      </div>
      {passwordError && (
        <div className="text-red-500 text-sm">
          {passwordError}
        </div>
      )}
    </div>,

    // Step 2 - Business Category
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Select Your Business Category
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id as BusinessFormData["category"])}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              formData.category === category.id
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-300"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-3 ${
                formData.category === category.id ? "text-indigo-600" : "text-gray-600"
              }`}>
                {category.icon}
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{category.title}</h4>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>,

    // Step 3 - Target & Budget
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience
        </label>
        <Input
          type="text"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
          placeholder="Describe your target audience"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Initial Budget ($)
        </label>
        <Input
          type="number"
          name="initialBudget"
          value={formData.initialBudget}
          onChange={handleInputChange}
          placeholder="Enter your initial budget"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Annual Revenue ($)
        </label>
        <Input
          type="number"
          name="expectedRevenue"
          value={formData.expectedRevenue}
          onChange={handleInputChange}
          placeholder="Enter expected revenue"
          className="w-full"
        />
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/50 to-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900">
              Create Your Business Account
            </h1>
            <p className="text-gray-600 mt-2">
              Step {step} of 3: {
                step === 1 ? "Account Setup" : 
                step === 2 ? "Choose Category" : 
                "Target & Budget"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Swiper
              onSwiper={setSwiper}
              modules={[Navigation, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              allowTouchMove={false}
              className="h-[400px]"
              onSlideChange={(swiper) => setStep(swiper.activeIndex + 1)}
            >
              {formSteps.map((stepContent, index) => (
                <SwiperSlide key={index}>
                  {stepContent}
                </SwiperSlide>
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
                  Launch Business
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
                  i <= step ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetupForm; 