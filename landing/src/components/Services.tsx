import React from "react";
import { Brain, Rocket, Target, TrendingUp } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group relative p-8 rounded-2xl bg-white hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="mb-4 inline-block p-4 bg-indigo-100 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms to analyze and optimize your business operations"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Planning",
      description: "Data-driven insights to help you make informed decisions and achieve your goals"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth Optimization",
      description: "Proven strategies to scale your business and maximize revenue potential"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation Solutions",
      description: "Cutting-edge tools and technologies to keep you ahead of the competition"
    }
  ];

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your business with our comprehensive suite of services designed to drive growth and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
