import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="max-w-xs">
           <span className="font-serif text-2xl text-cream tracking-wider block mb-6">
            Obsidian <span className="text-gold">Wellness</span>
          </span>
          <p className="text-cream/40 text-sm leading-relaxed mb-6">
            A sanctuary for the modern individual seeking balance, strength, and intentional restoration.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'Email'].map(social => (
                <a key={social} href="#" className="text-xs uppercase text-gold hover:text-white transition-colors">{social}</a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
            <h4 className="text-cream font-serif text-lg">Location</h4>
            <p className="text-cream/60 text-sm">
                The District, Loft 402<br />
                Private Entrance<br />
                Washington, DC 20001
            </p>
        </div>

        <div className="flex flex-col gap-4">
            <h4 className="text-cream font-serif text-lg">Hours</h4>
            <p className="text-cream/60 text-sm">
                Mon - Fri: 10am - 8pm<br />
                Sat: 11am - 5pm<br />
                Sun: Closed for Restoration
            </p>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-cream/20 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Obsidian Wellness. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;