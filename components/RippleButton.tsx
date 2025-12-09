import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ButtonProps } from '../types';

export const RippleButton: React.FC<ButtonProps> = ({ onClick, label, className = '' }) => {
  return (
    <div className="relative group">
      {/* Animated Ping Circle */}
      <div className="absolute -inset-1 bg-whatsapp-brand rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      
      {/* Main Button */}
      <button
        onClick={onClick}
        className={`
          relative flex items-center justify-center gap-3 
          w-full md:w-auto min-w-[280px] px-8 py-5
          bg-whatsapp-brand hover:bg-whatsapp-600 active:bg-whatsapp-800
          text-white font-bold text-lg rounded-full 
          shadow-[0_0_40px_-10px_rgba(37,211,102,0.5)]
          transform transition-all duration-300 ease-out
          hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
          ${className}
        `}
      >
        <WhatsAppIcon className="w-8 h-8 text-white fill-current" />
        <span>{label}</span>
      </button>
    </div>
  );
};
