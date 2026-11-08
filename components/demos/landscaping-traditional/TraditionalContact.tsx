import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import TraditionalNavbar from './TraditionalNavbar';
import TraditionalFooter from './TraditionalFooter';
import { OAK_ASH_BRAND } from '../landscaping/landscapingData';

export const TraditionalContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: 'Full Design & Build',
    budget: '£25,000 – £50,000',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F9F6] text-[#112A1B] font-sans overflow-x-hidden">
      <TraditionalNavbar />

      {/* Header */}
      <section className="pt-28 sm:pt-36 pb-14 sm:pb-20 px-5 sm:px-6 md:px-10 bg-[#14532D] text-white">
        <div className="max-w-[1380px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] block mb-3">
            Contact Oak &amp; Ash · Free Site Consultations
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Let&rsquo;s Talk About <span className="text-[#4ADE80]">Your Garden.</span>
          </h1>
          <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">
            Tell us about your garden. We will come back with a clear plan, a complimentary site consultation, and a fixed-price build proposal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/15 shadow-sm space-y-6">
            <h2 className="text-2xl font-extrabold text-[#112A1B]">
              Direct Contact Details
            </h2>

            <div className="space-y-4">
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9F6] hover:bg-emerald-50 transition-colors"
              >
                <Phone size={20} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Telephone
                  </span>
                  <span className="text-xl font-extrabold text-[#14532D] tabular-nums">
                    {OAK_ASH_BRAND.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${OAK_ASH_BRAND.email}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9F6] hover:bg-emerald-50 transition-colors"
              >
                <Mail size={20} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Email
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#14532D] break-all">
                    {OAK_ASH_BRAND.email}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9F6]">
                <MapPin size={20} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Design Studio &amp; Stone Yard
                  </span>
                  <span className="text-base font-bold text-[#112A1B] block">
                    {OAK_ASH_BRAND.address}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {OAK_ASH_BRAND.hours}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span>Replies within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span>Complimentary site visit &amp; written quote</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span>Covering Wiltshire, Surrey &amp; London</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quote Request Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-emerald-900/15 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112A1B]">
                Thank You, {formData.name || 'for Enquiring'}!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Our Principal Designer will review your brief and contact you within one working day to arrange your free site consultation.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#15803D] text-white text-sm font-semibold cursor-pointer"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-extrabold text-[#112A1B] mb-2">
                Request a Free Garden Quote
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.co.uk"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07700 900 000"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Postcode / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="e.g. SN8, SW3, GU28"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm bg-white"
                  >
                    <option value="Full Design & Build">Full Garden Design &amp; Build</option>
                    <option value="Build From Architect Plans">Construction from Existing Plans</option>
                    <option value="Soft Landscaping & Planting">Planting &amp; Soft Landscaping</option>
                    <option value="Garden Aftercare">Ongoing Estate &amp; Garden Aftercare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm bg-white"
                  >
                    <option value="£25,000 – £50,000">£25,000 – £50,000</option>
                    <option value="£50,000 – £100,000">£50,000 – £100,000</option>
                    <option value="£100,000 – £250,000">£100,000 – £250,000</option>
                    <option value="£250,000+">£250,000+ (Country Estate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Tell Us About Your Garden
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your garden project, ideas, or preferred timeframe..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15803D] focus:outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                <span>Submit Free Quote Request</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <TraditionalFooter />
    </div>
  );
};

export default TraditionalContact;
