import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  ChartLine,
  CircleDollarSign, 
  LineChart, 
  Rocket, 
  Stars,
  TrendingUp, 
  Users2
} from "lucide-react";

const Lasthero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { icon: <Users2 className="w-6 h-6" />, value: "10K+", label: "Active Users" },
    { icon: <Brain className="w-6 h-6" />, value: "95%", label: "AI Accuracy" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "2.5x", label: "Growth Rate" },
    { icon: <CircleDollarSign className="w-6 h-6" />, value: "$2M+", label: "Revenue Generated" },
  ];

  const testimonials = [
    {
      quote: "This platform revolutionized how we handle our business analytics.",
      author: "Sarah Johnson",
      role: "CEO, TechCorp",
      rating: 5
    },
    {
      quote: "The AI-powered insights helped us double our growth in 6 months.",
      author: "Michael Chen",
      role: "Director, InnovateCo",
      rating: 5
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/50 to-white scroll-mt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center mb-3 text-indigo-600">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-bold text-center text-gray-800">{stat.value}</h4>
              <p className="text-sm text-center text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.div className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-8 h-8 text-indigo-600 animate-bounce" />
              <Stars className="w-8 h-8 text-purple-600 animate-pulse" />
              <ChartLine className="w-8 h-8 text-indigo-600 animate-bounce animation-delay-200" />
            </div>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Empower Your Business Growth
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Take your business to the next level with our innovative solutions and expert guidance
          </motion.p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column */}
          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg z-10">
                  <BarChart3 className="w-6 h-6 text-indigo-600 animate-pulse" />
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Business Analytics"
                  className="w-full h-[300px] object-cover transform transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300">
              <LineChart className="w-6 h-6 text-indigo-600 mb-3 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Data-Driven Decisions
              </h3>
              <p className="text-gray-600">
                Make informed decisions based on comprehensive analytics and real-time insights
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300">
              <Brain className="w-6 h-6 text-purple-600 mb-3 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Strategic Growth
              </h3>
              <p className="text-gray-600">
                Implement proven strategies to scale your business and maximize potential
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg z-10">
                  <TrendingUp className="w-6 h-6 text-purple-600 animate-pulse" />
                </div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                  alt="Strategic Planning"
                  className="w-full h-[300px] object-cover transform transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          id="testimonials"
          className="grid md:grid-cols-2 gap-8 mb-16 scroll-mt-20"
          variants={itemVariants}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Stars key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <Link to="/get-started">
            <Button 
              className="group px-8 py-4 text-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Lasthero;
