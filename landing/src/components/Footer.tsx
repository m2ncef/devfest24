import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Github, Twitter, Linkedin, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ];

  const productLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'AI Solutions', href: '/solutions' },
    { label: 'Case Studies', href: '/cases' },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Support', href: '/support' },
    { label: 'Partners', href: '/partners' },
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 mb-4">
              <Brain className="h-6 w-6" />
              <span className="font-bold text-xl">B-UP</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Empowering businesses with cutting-edge AI solutions. Transform your operations and
              drive growth with our innovative platform.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <span>Algeria, bARNA, Roud l couzina</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-5 w-5 text-indigo-600" />
                <span>+213 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5 text-indigo-600" />
                <span>contact@b-up.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} B-UP. All rights reserved to GDGC team.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
