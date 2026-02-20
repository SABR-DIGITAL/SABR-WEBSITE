
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const StickyContact: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 md:hidden z-50 pointer-events-none">
      <div className="rounded-[2.5rem] p-3 flex items-center justify-between border-slate-200 shadow-3xl bg-white/90 backdrop-blur-2xl pointer-events-auto border">
        <button className="flex-1 flex items-center justify-center gap-4 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[12px] uppercase tracking-widest shadow-xl">
          <Phone size={20} />
          Call
        </button>
        <div className="w-[1px] h-10 bg-slate-100 mx-4"></div>
        <button className="flex-1 flex items-center justify-center gap-4 py-5 text-slate-950 rounded-[2rem] font-black text-[12px] uppercase tracking-widest border border-slate-100 bg-slate-50">
          <MessageSquare size={20} className="text-blue-600" />
          Chat
        </button>
      </div>
    </div>
  );
};

export default StickyContact;
