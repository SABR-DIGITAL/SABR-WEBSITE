import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MoveLeft } from 'lucide-react';

const ExitPreviewButton: React.FC = () => {
  return (
    <Link
      to="/projects"
      className="fixed bottom-6 right-6 z-[1000] group flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md text-[#2563eb] font-medium text-[11px] uppercase tracking-[0.2em] rounded-full border border-[#2563eb]/40 shadow-sm hover:bg-white hover:border-[#2563eb] transition-all duration-300"
    >
      <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
      <span>Exit Preview</span>
    </Link>
  );
};

export default ExitPreviewButton;
