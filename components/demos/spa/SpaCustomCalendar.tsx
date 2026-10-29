import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from 'lucide-react';

interface SpaCustomCalendarProps {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  onChange: (checkIn: string, checkOut: string) => void;
  className?: string;
}

export const SpaCustomCalendar: React.FC<SpaCustomCalendarProps> = ({
  checkIn,
  checkOut,
  onChange,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return checkIn ? new Date(checkIn) : new Date(2025, 5, 1); // June 2025 default
  });
  const [selectingStep, setSelectingStep] = useState<'checkIn' | 'checkOut'>('checkIn');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const handleDayClick = (day: number) => {
    const clickedStr = formatDate(year, month, day);
    if (selectingStep === 'checkIn') {
      onChange(clickedStr, clickedStr > checkOut ? clickedStr : checkOut);
      setSelectingStep('checkOut');
    } else {
      if (clickedStr < checkIn) {
        onChange(clickedStr, checkIn);
      } else {
        onChange(checkIn, clickedStr);
      }
      setSelectingStep('checkIn');
    }
  };

  const isSelected = (day: number) => {
    const str = formatDate(year, month, day);
    return str === checkIn || str === checkOut;
  };

  const isInRange = (day: number) => {
    const str = formatDate(year, month, day);
    return str > checkIn && str < checkOut;
  };

  return (
    <div className={`bg-[#0A0E0C] border border-white/15 rounded-none p-5 shadow-2xl text-white select-none ${className}`}>
      {/* HEADER: MONTH & YEAR WITH CONTROLS */}
      <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/10">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-none bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="text-center">
          <span className="font-cinzel text-sm font-bold uppercase tracking-wider text-white">
            {monthNames[month]} {year}
          </span>
          <span className="block text-[9px] uppercase tracking-widest text-emerald-400 font-mono mt-0.5 font-bold">
            {selectingStep === 'checkIn' ? 'Select Check-in Date' : 'Select Check-out Date'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-none bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* WEEKDAY LABELS */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase text-white/40 mb-2">
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
        <span>Su</span>
      </div>

      {/* DAYS GRID (SQUARE STYLING) */}
      <div className="grid grid-cols-7 gap-1 text-xs font-mono">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const inRange = isInRange(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDayClick(day)}
              className={`h-9 flex items-center justify-center rounded-none transition-all cursor-pointer text-xs ${
                selected
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-md'
                  : inRange
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border-y border-emerald-500/30'
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SpaCustomCalendar;
