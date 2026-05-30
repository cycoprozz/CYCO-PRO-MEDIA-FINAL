import React from 'react';
import { SectionId } from '../types';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Abstract Luxury Texture" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/60 to-obsidian"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-8 leading-tight tracking-tight">
          Strength.<br />
          Stillness.<br />
          Restoration.
        </h1>
        <p className="font-sans text-cream/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-10 tracking-wide">
          A private wellness sanctuary combining therapeutic massage with chop-shop style nutrition. 
          Curated for the modern individual who values intention.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="w-48 py-4 bg-gold text-obsidian font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-300"
          >
            Reserve Session
          </button>
          <button 
             onClick={() => scrollToSection(SectionId.SERVICES)}
             className="w-48 py-4 border border-white/20 text-cream font-sans text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;