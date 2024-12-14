import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Brain, LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignOutButton from './SignOutButton';
import { BASE_URL } from '../lib/consts';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Solutions', href: '/#services' },
    { label: 'Analytics', href: '/#about' },
    { label: 'Success Stories', href: '/#testimonials' },
  ];

  const scrollToSection = (sectionId: string) => {
    // @ts-ignore
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      // @ts-ignore
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      // @ts-ignore
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === '/') {
      if (!isHomePage) {
        navigate('/');
      } else {
        // @ts-ignore
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (!isHomePage) {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['services', 'about', 'testimonials'];
      const navbarHeight = 80;
      // @ts-ignore
      const scrollPosition = window.scrollY + navbarHeight + 100;

      // Check if we're at the top of the page
      // @ts-ignore
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      // Find the current section
      // @ts-ignore
      for (const section of sections) {
        // @ts-ignore
        const element = document.getElementById(section);
        if (element) {
          // @ts-ignore
          const { top, bottom } = element.getBoundingClientRect();
          // @ts-ignore
          const elementTop = top + window.pageYOffset;
          // @ts-ignore
          const elementBottom = bottom + window.pageYOffset;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    // @ts-ignore
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // @ts-ignore
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Reset active section when leaving home page
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
    }
  }, [isHomePage]);

  // You might want to add authentication state management here
  const isAuthenticated = false; // Replace with your auth logic

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600"
          onClick={(e) => handleNavClick(e, '/')}
        >
          <Brain className="h-6 w-6" />
          <span className="font-bold text-xl">
            B-<span className="text-indigo-950">UP</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-gray-600 hover:text-indigo-600 transition-colors ${
                (item.href === '/' && !activeSection) || item.href.includes(activeSection)
                  ? 'text-indigo-600 font-medium'
                  : ''
              }`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:block">
              <SignOutButton />
            </div>
          ) : (
            <Link to={`${BASE_URL}/login`} className="hidden md:block">
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 hover:text-indigo-600"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
          <Link to="/get-started" className="hidden md:block">
            <Button className="hidden md:flex bg-indigo-600 hover:bg-indigo-700">
              Get Started
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block py-2 text-gray-600 hover:text-indigo-600 transition-colors ${
                    (item.href === '/' && !activeSection) || item.href.includes(activeSection)
                      ? 'text-indigo-600 font-medium'
                      : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                {isAuthenticated ? (
                  <SignOutButton />
                ) : (
                  <Link to="/signin" className="block">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link to="/get-started" className="block">
                  <Button className="w-full justify-start bg-indigo-600 hover:bg-indigo-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
