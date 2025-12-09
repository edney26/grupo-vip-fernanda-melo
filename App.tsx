import React, { useState } from 'react';
import { DEFAULT_CONFIG } from './constants';
import { RippleButton } from './components/RippleButton';
import { WhatsAppIcon } from './components/WhatsAppIcon';

const App: React.FC = () => {
  // Estado apenas para feedback visual do botão
  const [redirecting, setRedirecting] = useState(false);

  // Configuração estática importada diretamente (Simples e Direto)
  const config = DEFAULT_CONFIG;

  // Lógica de Redirecionamento
  const handleJoinClick = () => {
    setRedirecting(true);
    
    // Disparar evento do Facebook Pixel (Lead)
    try {
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: config.groupName,
          content_category: 'WhatsApp Group Join'
        });
        console.log('Evento Pixel disparado: Lead');
      }
    } catch (e) {
      console.error('Erro ao disparar Pixel:', e);
    }
    
    // Pequeno delay para feedback visual antes de sair da página
    setTimeout(() => {
      window.location.href = config.inviteLink;
      setTimeout(() => setRedirecting(false), 3000);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black z-10 opacity-90"></div>
        <img 
          src={config.backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-whatsapp-brand/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Card Container */}
      <main className="relative z-20 w-full max-w-md px-6 py-12 flex flex-col items-center text-center animate-float">
        
        {/* Glassmorphism Card */}
        <div className="w-full glass rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-xl bg-black/40">
          
          {/* Header Icon / Avatar */}
          <div className="mx-auto mb-8 relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-800 border-4 border-slate-700 shadow-xl overflow-hidden">
             {config.imageUrl ? (
               <img 
                 src={config.imageUrl} 
                 alt={config.groupName} 
                 className="w-full h-full object-cover"
               />
             ) : (
               <WhatsAppIcon className="w-14 h-14 text-whatsapp-brand" />
             )}
          </div>

          {/* Texts */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg break-words uppercase">
            {config.groupName}
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xs mx-auto whitespace-pre-line">
            {config.description}
          </p>

          {/* Action Button */}
          <div className="w-full flex justify-center">
            <RippleButton 
              label={redirecting ? "Entrando..." : (config.buttonLabel || "Entrar no Grupo")} 
              onClick={handleJoinClick} 
            />
          </div>

          {/* Security / Social Proof Note */}
          <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Seguro • Oficial • Gratuito
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center w-full z-20 text-slate-600 text-sm">
        <span className="cursor-default select-none">
          &copy; {new Date().getFullYear()} ZapConnect
        </span>
      </footer>

    </div>
  );
};

export default App;