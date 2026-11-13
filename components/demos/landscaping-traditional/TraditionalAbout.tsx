import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TraditionalNavbar from './TraditionalNavbar';
import TraditionalFooter from './TraditionalFooter';
import { PRINCIPLES, LEADERSHIP } from '../landscaping/landscapingData';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const TraditionalAbout: React.FC = () => {
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
            Established 1998 · Practice &amp; Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Twenty-Eight Years of <span className="text-[#16A34A]">Enduring Landscapes.</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed">
            Formed in 1998, Oak &amp; Ash specialises in the architectural design and construction of private domestic gardens across Wiltshire, Surrey, and London.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block">
              Our Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-tight">
              Well-designed and constructed gardens, executed to the smallest detail.
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              Over nearly three decades, our studio has earned a reputation for delivering finely crafted outdoor spaces completed on schedule and within budget. Whether designing from a blank canvas in-house or building alongside independent landscape architects, our focus on structural integrity and botanical depth never wavers.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tabular-nums">28+</p>
                <p className="text-xs font-semibold text-zinc-500 mt-1">Years Est.</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tabular-nums">22</p>
                <p className="text-xs font-semibold text-zinc-500 mt-1">RHS &amp; BALI</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tabular-nums">100%</p>
                <p className="text-xs font-semibold text-zinc-500 mt-1">In-House</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden aspect-[4/3] bg-zinc-100">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg"
                alt="RHS Chelsea Gold Medal show garden"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#F7F7F5] border-y border-zinc-200">
        <div className="max-w-[1380px] mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
              Practice Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900">
              The Four Pillars of Every Commission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-zinc-300 pt-8">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="space-y-3">
                <span className="text-sm font-extrabold text-[#16A34A] block">
                  {p.num}
                </span>
                <h3 className="text-lg font-bold text-zinc-900">{p.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                Studio Leadership
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900">
                The Specialists Behind Your Garden
              </h2>
            </div>
            <Link
              to="/demo/landscaping-traditional/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#14532D] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-md transition-colors w-fit"
            >
              <span>Book a Free Site Visit</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {LEADERSHIP.map((member, idx) => (
              <div
                key={member.name}
                className="border-b border-zinc-200 pb-6 space-y-2.5"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block">
                  0{idx + 1} · {member.experience}
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900">{member.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#14532D]">
                  {member.role}
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed pt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TraditionalFooter />
    </div>
  );
};

export default TraditionalAbout;
