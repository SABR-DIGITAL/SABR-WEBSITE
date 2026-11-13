import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import TraditionalNavbar from './TraditionalNavbar';
import TraditionalFooter from './TraditionalFooter';
import { CORE_SERVICES, OAK_ASH_BRAND } from '../landscaping/landscapingData';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const TraditionalServices: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      <TraditionalNavbar />

      {/* Header */}
      <section className="pt-28 sm:pt-36 pb-14 sm:pb-20 px-5 sm:px-6 md:px-10 bg-[#14532D] text-white">
        <div className="max-w-[1380px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-white/75 block mb-3">
            Design &amp; Construction · Oak &amp; Ash
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Every Discipline, <span className="text-[#16A34A]">Under One Roof.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed">
            From initial spatial drawings through to structural stonework, planting, and seasonal maintenance, every stage is delivered by our permanent in-house specialists.
          </p>
        </div>
      </section>

      {/* Services Split Rows (Unboxed with Clean Dividers) */}
      <section className="py-12 sm:py-20 px-5 sm:px-6 md:px-10 max-w-[1380px] mx-auto divide-y divide-zinc-200">
        {CORE_SERVICES.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            <div className={`lg:col-span-5 aspect-[4/3] bg-zinc-100 overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img
                src={service.img}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`lg:col-span-7 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-2">
                {service.index} · {service.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-4">
                {service.title}
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6">
                {service.prose}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-zinc-200 mb-8">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-zinc-800">
                    <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/demo/landscaping-traditional/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#14532D] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-md transition-colors"
                >
                  <span>Enquire About {service.kicker}</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#14532D] hover:text-[#16A34A] transition-colors tabular-nums"
                >
                  <Phone size={15} />
                  <span>{OAK_ASH_BRAND.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <TraditionalFooter />
    </div>
  );
};

export default TraditionalServices;
