import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Nutrition from './components/Nutrition';
import WellnessGuide from './components/WellnessGuide';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { SectionId } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-cream selection:bg-gold selection:text-obsidian">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <div id={SectionId.HOME}>
            <Hero scrollToSection={scrollToSection} />
        </div>
        
        <div id={SectionId.SERVICES}>
            <Services />
        </div>
        
        <div id={SectionId.NUTRITION}>
            <Nutrition />
        </div>

        <div id={SectionId.GUIDE}>
            <WellnessGuide />
        </div>

        <div id={SectionId.CONTACT}>
            <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;