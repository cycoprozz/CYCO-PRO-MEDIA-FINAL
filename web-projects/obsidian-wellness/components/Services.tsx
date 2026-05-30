import React from 'react';
import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    id: '1',
    title: 'The Obsidian Signature',
    description: 'A deep tissue fusion incorporating hot stones and neuromuscular therapy to release chronic tension held in the deep muscle layers. Focuses on posture correction and stress elimination.',
    price: '$180',
    duration: '90 MIN',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Sports Recovery & Stretch',
    description: 'Dynamic sports massage tailored for active bodies. Includes assisted stretching, percussion therapy, and joint mobilization to restore range of motion.',
    price: '$150',
    duration: '60 MIN',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'The Noir Calm',
    description: 'A Swedish-based relaxation flow designed to down-regulate the nervous system. Uses aromatherapy and slow, rhythmic strokes to induce a meditative state.',
    price: '$140',
    duration: '75 MIN',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Cranial & Scalp Focus',
    description: 'Intensive focus on the neck, jaw, and scalp to relieve migraines, tech-neck, and mental fatigue. Can be added to any session.',
    price: '$85',
    duration: '45 MIN',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-onyx relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center md:text-left">
           <span className="text-gold text-xs uppercase tracking-[0.25em] block mb-2">Massage Therapy</span>
           <h2 className="font-serif text-4xl md:text-5xl text-cream">Therapeutic Menu</h2>
           <div className="h-px w-24 bg-gold/50 mt-6 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col border border-white/5 bg-obsidian hover:border-gold/30 transition-all duration-500 overflow-hidden">
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors z-10"></div>
                {/* Grayscale filter added to match brand aesthetic, removed on hover for impact */}
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-90"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-xl md:text-2xl font-serif text-cream group-hover:text-gold transition-colors">{service.title}</h3>
                  <span className="text-sm font-sans text-cream/50 tracking-widest">{service.duration}</span>
                </div>
                <p className="text-cream/60 font-sans text-sm leading-7 mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                  <span className="text-gold font-serif text-xl">{service.price}</span>
                  <span className="text-xs uppercase tracking-widest text-cream/40 group-hover:text-cream transition-colors cursor-pointer">Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;