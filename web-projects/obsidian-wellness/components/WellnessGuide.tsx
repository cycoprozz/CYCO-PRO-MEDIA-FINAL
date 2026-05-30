import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getWellnessAdvice } from '../services/geminiService';

const WellnessGuide: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'I am Obsidian. How may I guide your recovery today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    const advice = await getWellnessAdvice(query);
    
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setIsLoading(false);
  };

  return (
    <section className="py-24 px-6 bg-onyx border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em]">Wellness Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-cream">Ask The Specialist</h2>
          <p className="text-cream/50 mt-4 text-sm">Guidance on recovery protocols, nutrition, and mindfulness.</p>
        </div>

        <div className="bg-obsidian border border-white/10 p-6 md:p-8 min-h-[400px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background Texture */}
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6 no-scrollbar max-h-[400px]"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-mocha/20 text-cream border border-mocha/30' 
                      : 'bg-white/5 text-cream/90 border-l-2 border-gold'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white/5 p-4 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                    <span className="text-xs text-cream/50 tracking-widest uppercase">Thinking...</span>
                 </div>
              </div>
            )}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about recovery stretches, ingredients, or sleep..."
                className="flex-1 bg-transparent text-cream placeholder-cream/30 text-sm focus:outline-none py-3"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="text-gold hover:text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessGuide;