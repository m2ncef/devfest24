import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles } from "lucide-react"; 

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-60 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative px-4 py-32 text-center max-w-5xl mx-auto">
        <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900 mb-8 leading-tight">
          Make your Business Better with us
        </h1>
        <h2 className="text-2xl text-gray-600 max-w-3xl mx-auto mb-16">
          Discover a new world of business management powered by cutting-edge algorithms 
          and advanced AI models that transform your operations
        </h2>
        <div className="flex gap-6 justify-center items-center">
          <Link to="/predict">
            <Button 
              className="group px-8 py-6 text-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all duration-300"
            >
              <Brain className="mr-2 h-5 w-5 animate-pulse" />
              Try AI Prediction
              <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            </Button>
          </Link>
          <Link to="/get-started">
            <Button 
              variant="outline"
              className="group px-8 py-6 text-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-gray-400 hover:text-indigo-600 transition-colors">
            <ArrowRight className="h-6 w-6 rotate-90" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
