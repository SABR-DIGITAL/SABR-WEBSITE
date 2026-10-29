import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Calendar 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    service: 'patios',
    budget: '10k-25k',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How soon can you conduct a property survey?",
      a: "Our lead estimator typically visits your property within 3 to 5 business days of your enquiry. We bring material samples and take precise laser measurements."
    },
    {
      q: "How does the fixed-price quotation work?",
      a: "After inspecting the site levels, drainage, and access, we produce a comprehensive, itemised schedule of works. The price quoted is the price you pay — zero hidden extras."
    },
    {
      q: "What warranty do you provide?",
      a: "All our paved terraces and structural stone masonry are backed by a 10-year structural guarantee, installed strictly to British Standard BS 7533."
    },
    {
      q: "Do you handle planning or conservation approvals?",
      a: "Yes. Most residential garden builds fall under Permitted Development, but for listed properties or AONB conservation areas in Wiltshire, we handle drawings and planning applications."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#C86A3D] selection:text-white">
      <Navbar />

      {/* HEADER BANNER */}
      <section className="bg-[#162E20] text-white py-20 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            <span>Free On-Site Consultations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Start Your Garden Project.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Request an on-site survey and design discussion. We inspect levels, review material choices, and provide a binding fixed-price quotation.
          </p>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C86A3D] font-bold block mb-1">
                Direct Contact
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#162E20]">
                We’re Here to Help.
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mt-2.5">
                Whether you have an architect’s masterplan or are exploring ideas for your lawn and terrace, speak directly with our Wiltshire team.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              <a
                href="tel:01672552140"
                className="p-5 bg-white rounded-xl border border-stone-200/90 shadow-sm flex items-center gap-4 hover:border-[#C86A3D] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#162E20]/5 text-[#C86A3D] flex items-center justify-center shrink-0 group-hover:bg-[#C86A3D] group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">Direct Line</div>
                  <div className="font-serif text-xl font-bold text-[#162E20]">01672 552 140</div>
                  <div className="text-xs text-stone-500">Mon–Fri: 07:30 – 17:30</div>
                </div>
              </a>

              <div className="p-5 bg-white rounded-xl border border-stone-200/90 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#162E20]/5 text-[#C86A3D] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">Studio Enquiries</div>
                  <div className="text-sm font-bold text-[#162E20]">enquiries@oakandashlandscapes.co.uk</div>
                  <div className="text-xs text-stone-500">Replies within 24 hours</div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-stone-200/90 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#162E20]/5 text-[#C86A3D] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">Workshop &amp; Sample Yard</div>
                  <div className="text-sm font-bold text-[#162E20]">The Old Stone Mill</div>
                  <div className="text-xs text-stone-500 leading-relaxed">
                    High Street, Marlborough, Wiltshire, SN8 1AA
                  </div>
                </div>
              </div>
            </div>

            {/* Areas Covered */}
            <div className="p-6 bg-[#F5F2EB] rounded-xl border border-stone-200/90 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#162E20] font-bold">
                Areas We Regularly Serve:
              </h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                Marlborough · Pewsey Vale · Devizes · Salisbury · Bath &amp; North East Somerset · Cirencester · Tetbury · Chippenham · Swindon &amp; Cotswolds.
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-xl font-bold text-[#162E20] flex items-center gap-2">
                <HelpCircle size={18} className="text-[#C86A3D]" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 bg-white rounded-lg border border-stone-200 space-y-1">
                    <h5 className="font-bold text-xs text-[#162E20]">{faq.q}</h5>
                    <p className="text-stone-600 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xl relative">
              
              {submitted ? (
                <div className="py-16 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-[#162E20]">
                      Consultation Request Received
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Thank you, {formData.name || 'there'}. Our senior estimator will review your details and contact you within 24 hours to arrange your property survey.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-[#162E20] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#C86A3D] transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#162E20]">
                      Request Your Free Property Survey
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1">
                      Fill out the form below. No obligation, no high-pressure sales.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Henderson"
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] focus:ring-1 focus:ring-[#C86A3D] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Contact Telephone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 07700 900123"
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] focus:ring-1 focus:ring-[#C86A3D] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.co.uk"
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] focus:ring-1 focus:ring-[#C86A3D] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Project Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                        placeholder="e.g. SN8 1AA"
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] focus:ring-1 focus:ring-[#C86A3D] transition-all uppercase"
                      />
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Primary Requirement
                      </label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] transition-all"
                      >
                        <option value="patios">Porcelain &amp; Natural Stone Patios</option>
                        <option value="transformation">Full Garden Transformation</option>
                        <option value="outdoor-living">Outdoor Living &amp; Pergolas</option>
                        <option value="masonry">Stone Walling &amp; Masonry</option>
                        <option value="lawns">Turfing &amp; Drainage Solutions</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                        Anticipated Project Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] transition-all"
                      >
                        <option value="under-10k">Under £10,000</option>
                        <option value="10k-25k">£10,000 – £25,000</option>
                        <option value="25k-50k">£25,000 – £50,000</option>
                        <option value="50k-plus">£50,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                      Tell Us About Your Garden &amp; Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. We have a sloping rear garden and would like to replace an old timber deck with a modern porcelain terrace and raised cedar planter beds..."
                      className="w-full px-4 py-3 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#C86A3D] focus:ring-1 focus:ring-[#C86A3D] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C86A3D] hover:bg-[#b5582c] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <span>Send Consultation Request</span>
                    <Send size={15} />
                  </button>

                  <p className="text-[11px] text-stone-400 text-center">
                    Your details are strictly confidential. We never share contact information with third parties.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;