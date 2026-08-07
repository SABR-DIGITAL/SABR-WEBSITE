import React, { useEffect, useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Plus, ArrowRight } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, fees } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const groups = [
  {
    label: 'Before you come',
    items: [
      {
        q: 'Do I need a referral from my GP?',
        a: 'No. You can book straight in with us. If you are claiming on private health insurance your insurer might want a GP referral first, so it is worth a quick phone call to them before you book.'
      },
      {
        q: 'How soon can I be seen?',
        a: 'Most weeks we have space within two or three days, and we hold a couple of slots back each morning for people in acute pain. Ring the clinic rather than emailing if you need one of those.'
      },
      {
        q: 'What should I wear?',
        a: 'Something you can move in. For a knee, hip or back problem, shorts are ideal. For a shoulder or neck, a vest top. If you forget, we keep clean shorts in the room.'
      },
      {
        q: 'Can I bring someone with me?',
        a: 'Of course. Partners, parents and carers are welcome in the room, and if you would prefer a chaperone for any part of the examination just say so.'
      }
    ]
  },
  {
    label: 'The appointment',
    items: [
      {
        q: 'What happens in the first session?',
        a: `Fifty minutes. We spend the first fifteen or so asking about the problem and how it affects your day, then examine you properly, then explain what we think is going on. You usually start treatment in the same appointment and leave with two or three exercises.`
      },
      {
        q: 'Will it hurt?',
        a: 'Hands-on work can be uncomfortable while we are doing it, and you might ache for a day afterwards. It should not be something you have to grit your teeth through. Tell us and we will change what we are doing.'
      },
      {
        q: 'How many appointments will I need?',
        a: 'Most people we see are done in three to six. Some need one. Long-standing problems and post-surgical rehab take longer, and we will tell you roughly what to expect at the end of the first appointment rather than leaving you guessing.'
      },
      {
        q: 'Do you do dry needling and sports massage?',
        a: 'Yes to both. Acupuncture and dry needling are included in a normal appointment where they are useful. Sports massage is booked separately and is a full hour of soft tissue work.'
      }
    ]
  },
  {
    label: 'Money and admin',
    items: [
      {
        q: 'What does it cost?',
        a: `An initial assessment is ${fees[0].price} for fifty minutes and follow-ups are ${fees[1].price} for thirty. Every fee is listed on the treatments page. We do not sell blocks of sessions.`
      },
      {
        q: 'Do you deal with insurers?',
        a: 'We are recognised by Bupa, AXA Health, Aviva, WPA and Vitality, and we invoice them directly. Get an authorisation number from your insurer first and bring it with you.'
      },
      {
        q: 'What if I need to cancel?',
        a: 'Give us more than 24 hours and there is nothing to pay. Inside that we charge the full fee, because the slot almost never gets filled that late and somebody else needed it.'
      },
      {
        q: 'Is there parking?',
        a: 'There is metered parking on Argyle Street and Henrietta Street, and the Podium car park is a four-minute walk. The clinic is five minutes from Bath Spa station on foot.'
      }
    ]
  }
];

const PhysioFAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>('0-0');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F0EA] font-inter text-[#1D1C19] selection:bg-[#4A5D4E] selection:text-[#F3F0EA] overflow-x-hidden">
      <ExitPreviewButton />
      <PhysioNavbar />

      {/* HEADER */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-8">Questions</p>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] tracking-[-0.02em]">
              The things people ask on the phone.
            </h1>
          </div>
          <p className="lg:col-span-4 text-[#6E6A62] leading-relaxed">
            If yours is not here, ring {clinic.phoneDisplay} and ask. You will get a physiotherapist, not a call centre.
          </p>
        </div>
      </section>

      {/* ACCORDIONS */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto space-y-16 md:space-y-24">
          {groups.map((group, gi) => (
            <div key={group.label} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-3">
                <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] lg:sticky lg:top-32">
                  {group.label}
                </p>
              </div>

              <div className="lg:col-span-9 border-t border-[#E2DDD3]">
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const isOpen = open === id;
                  return (
                    <div key={item.q} className="border-b border-[#E2DDD3]">
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-8 text-left py-7 md:py-9 group"
                      >
                        <h2 className="font-serif text-xl md:text-[1.6rem] leading-snug tracking-[-0.01em] group-hover:text-[#4A5D4E] transition-colors duration-300">
                          {item.q}
                        </h2>
                        <span
                          className={`shrink-0 mt-1 w-9 h-9 flex items-center justify-center border border-[#E2DDD3] transition-all duration-500 ${
                            isOpen ? 'rotate-45 bg-[#1D1C19] text-[#F3F0EA] border-[#1D1C19]' : 'text-[#6E6A62]'
                          }`}
                        >
                          <Plus size={16} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-9 pr-8 md:pr-24 text-[#6E6A62] leading-relaxed max-w-3xl">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FBFAF7] border-t border-[#E2DDD3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-10 lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.02em] mb-5">
              Still not sure it is worth booking?
            </h2>
            <p className="text-[#6E6A62] max-w-xl leading-relaxed">
              Ring us and describe it. If a physiotherapist is not the right person for what you have got, we would
              rather tell you that on the phone than take {fees[0].price} off you first.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`tel:${clinic.phoneHref}`}
              className="inline-flex items-center justify-center px-9 py-5 border border-[#1D1C19]/20 text-[10px] uppercase tracking-[0.32em] hover:border-[#1D1C19] transition-colors duration-300"
            >
              {clinic.phoneDisplay}
            </a>
            <Link
              to="/demo/physio/contact"
              className="group inline-flex items-center justify-center gap-4 px-9 py-5 bg-[#1D1C19] text-[#F3F0EA] text-[10px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] transition-colors duration-300"
            >
              Send a message
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioFAQ;
