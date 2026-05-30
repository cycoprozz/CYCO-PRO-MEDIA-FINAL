import React from 'react';
import { NutritionItem } from '../types';

const menu: NutritionItem[] = [
  {
    id: 'n1',
    title: 'The Grounding Bowl',
    type: 'bowl',
    ingredients: ['Organic Acai', 'Raw Cacao Nibs', 'Hemp Seeds', 'Almond Butter', 'Banana'],
    price: '$16'
  },
  {
    id: 'n2',
    title: 'Moss & Green',
    type: 'smoothie',
    ingredients: ['Sea Moss Gel', 'Spinach', 'Pineapple', 'Ginger', 'Coconut Water', 'Lime'],
    price: '$14'
  },
  {
    id: 'n3',
    title: 'Recovery Gold',
    type: 'smoothie',
    ingredients: ['Turmeric Root', 'Mango', 'Black Pepper', 'Collagen Peptides', 'Oat Milk'],
    price: '$14'
  },
  {
    id: 'n4',
    title: 'Post-Session Fuel',
    type: 'meal',
    ingredients: ['Quinoa', 'Roasted Sweet Potato', 'Black Beans', 'Avocado', 'Tahini Dressing'],
    price: '$22'
  }
];

const Nutrition: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-obsidian relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-olive/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
            
            {/* Visual Side */}
            <div className="w-full md:w-1/2 sticky top-24">
                <span className="text-gold text-xs uppercase tracking-[0.25em] block mb-2">The Fuel</span>
                <h2 className="font-serif text-4xl md:text-5xl text-cream mb-8">Nourishment with Purpose</h2>
                <p className="text-cream/60 mb-10 text-sm leading-relaxed max-w-md">
                    Inspired by Chop-Shop wellness philosophy. Food is not just consumption; it is the building block of your recovery. 
                    Every ingredient is chosen for inflammation reduction and energy sustainability.
                </p>
                <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-onyx">
                     <img 
                        src="https://picsum.photos/600/800?grayscale" 
                        alt="Ceramic bowl with ingredients" 
                        className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                </div>
            </div>

            {/* Menu Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-8 pt-12">
                {menu.map((item) => (
                    <div key={item.id} className="border-b border-white/10 pb-8 last:border-0 group">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">{item.title}</h3>
                            <span className="text-gold/80 font-medium">{item.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {item.ingredients.map((ing, idx) => (
                                <span key={idx} className="text-xs uppercase tracking-wider text-cream/50 bg-white/5 px-2 py-1">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Nutrition;