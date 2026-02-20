import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MoveLeft } from 'lucide-react';

const ExitPreviewButton: React.FC = () => {
  return (
    <Link 
      to="/projects" 
      className="fixed bottom-8 right-8 z-[1000] group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-[#2563eb] via-[#9333ea] to-[#db2777] text-white font-black text-[12px] uppercase tracking-[0.4em] rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_60px_rgba(219,39,119,0.6)] transition-all duration-500 transform hover:scale-110 active:scale-95 animate-pulse-slow overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-shimmer pointer-events-none"></div>
      <MoveLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-500 relative z-10" />
      <span className="relative z-10">Exit Preview</span>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 50px rgba(37,99,235,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 25px 70px rgba(147,51,234,0.5); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
      `}</style>
    </Link>
  );
};

export default ExitPreviewButton;