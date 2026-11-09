import React from 'react';
import { createPortal } from 'react-dom';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MoveLeft } from 'lucide-react';

// Portalled into <body> so no ancestor transform anywhere in the page tree can
// turn itself into the containing block for this fixed button. It stays welded
// to the bottom-right of the viewport on every demo page, at every scroll depth.
const ExitPreviewButton: React.FC = () => {
  return createPortal(
    <Link
      to="/projects"
      className="fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-[1000] group flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-sm text-[#2563eb] font-medium text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] rounded-full border border-[#2563eb]/40 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.35)] hover:border-[#2563eb] hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.45)] transition-all duration-300"
    >
      <MoveLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
      <span>Exit Preview</span>
    </Link>,
    document.body
  );
};

export default ExitPreviewButton;
