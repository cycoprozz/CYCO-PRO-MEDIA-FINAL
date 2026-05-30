import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Calendar, Clock, ChevronDown } from 'lucide-react';
import { services } from './Services';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Preferred date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', service: '', date: '', time: '', notes: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-onyx py-24 px-6 border-t border-white/5 flex items-center justify-center">
        <div className="max-w-md w-full bg-obsidian border border-gold/20 p-12 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-gold" />
          </div>
          <h3 className="font-serif text-3xl text-cream mb-4">Request Received</h3>
          <p className="text-cream/60 font-sans text-sm leading-relaxed mb-8">
            Thank you for choosing Obsidian Wellness. Your request has been securely transmitted. 
            We will review your preferences and confirm your appointment via email shortly.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-onyx py-24 px-6 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="lg:w-1/3">
             <span className="text-gold text-xs uppercase tracking-[0.25em] block mb-2">The Apartment</span>
             <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6">Secure Your Session</h2>
             <p className="text-cream/60 mb-8 text-sm leading-relaxed">
                Appointments are limited to ensure complete privacy and adequate preparation. 
                Please provide your details below to request a reservation.
             </p>
             
             <div className="space-y-6 border-t border-white/5 pt-8">
                <div>
                  <h4 className="text-cream font-serif text-lg mb-1">Deposit Policy</h4>
                  <p className="text-cream/40 text-xs leading-relaxed">
                    A 50% deposit is required upon confirmation to secure your booking. 
                    Cancellations must be made 24 hours in advance.
                  </p>
                </div>
                <div>
                  <h4 className="text-cream font-serif text-lg mb-1">Preparation</h4>
                  <p className="text-cream/40 text-xs leading-relaxed">
                    Please arrive 10 minutes early to decompress. 
                    Shower facilities are available pre-session if requested.
                  </p>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 bg-obsidian border border-white/5 p-8 md:p-10 shadow-2xl relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none"></div>

             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cream/50">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-white/20'} py-3 text-cream placeholder-white/10 focus:outline-none focus:border-gold transition-colors`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cream/50">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white/20'} py-3 text-cream placeholder-white/10 focus:outline-none focus:border-gold transition-colors`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2 relative">
                   <label className="text-xs uppercase tracking-widest text-cream/50">Desired Service</label>
                   <div className="relative">
                      <select 
                        name="service" 
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${errors.service ? 'border-red-500' : 'border-white/20'} py-3 text-cream appearance-none focus:outline-none focus:border-gold transition-colors cursor-pointer`}
                      >
                        <option value="" className="bg-obsidian text-white/50">Select a therapy...</option>
                        {services.map(s => (
                          <option key={s.id} value={s.title} className="bg-obsidian text-cream">
                            {s.title} ({s.duration} - {s.price})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-white/30 pointer-events-none" />
                   </div>
                   {errors.service && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.service}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Date */}
                   <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-cream/50 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Preferred Date
                      </label>
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${errors.date ? 'border-red-500' : 'border-white/20'} py-3 text-cream placeholder-white/10 focus:outline-none focus:border-gold transition-colors [color-scheme:dark]`}
                      />
                       {errors.date && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</span>}
                   </div>

                   {/* Time */}
                   <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-cream/50 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Preferred Time
                      </label>
                      <div className="relative">
                        <select 
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-cream appearance-none focus:outline-none focus:border-gold transition-colors cursor-pointer"
                        >
                            <option value="" className="bg-obsidian">Anytime</option>
                            <option value="morning" className="bg-obsidian">Morning (10am - 12pm)</option>
                            <option value="afternoon" className="bg-obsidian">Afternoon (12pm - 4pm)</option>
                            <option value="evening" className="bg-obsidian">Evening (4pm - 8pm)</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-3 w-4 h-4 text-white/30 pointer-events-none" />
                      </div>
                   </div>
                </div>
                
                 {/* Notes */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cream/50">Notes / Injuries</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-cream placeholder-white/10 focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Any specific areas of focus..."
                    />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-gold text-obsidian font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </>
                    ) : (
                      'Request Appointment'
                    )}
                  </button>
                </div>

             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;