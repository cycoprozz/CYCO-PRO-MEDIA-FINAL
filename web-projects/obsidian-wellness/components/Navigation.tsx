import React, { useState, useEffect } from 'react';
import { Menu, X, Wind } from 'lucide-react';
import { SectionId } from '../types';

interface NavigationProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: SectionId.SERVICES, label: 'Massage' },
    { id: SectionId.NUTRITION, label: 'Nourish' },
    { id: SectionId.GUIDE, label: 'The Guide' },
    { id: SectionId.CONTACT, label: 'Reserve' },
  ];

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setIsMobileOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-obsidian/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection(SectionId.HOME)}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <Wind className="w-6 h-6 text-gold opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="font-serif text-xl tracking-[0.2em] text-cream font-semibold uppercase">
            Obsidian <span className="text-gold font-light">Wellness</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
                activeSection === link.id ? 'text-gold' : 'text-cream/70 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
             onClick={() => handleNavClick(SectionId.CONTACT)}
             className="px-6 py-2 border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-obsidian transition-all duration-500"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-cream"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 w-full bg-onyx border-b border-gold/10 flex flex-col items-center py-8 gap-6 md:hidden animate-fade-in-down">
           {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm uppercase tracking-[0.2em] text-cream/80 hover:text-gold"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;