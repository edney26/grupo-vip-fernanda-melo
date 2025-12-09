import React, { useState } from 'react';
import { DEFAULT_CONFIG } from './constants';
import { RippleButton } from './components/RippleButton';
import { GroupConfig } from './types';
import { WhatsAppIcon } from './components/WhatsAppIcon';

const App: React.FC = () => {
  // State for configuration (allows real-time editing for demo purposes)
  const [config, setConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [isEditing, setIsEditing] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Handle the redirect logic
  const handleJoinClick = () => {
    setRedirecting(true);
    
    // Disparar evento do Facebook Pixel (Lead) para contabilizar o clique
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
    
    // Slight delay to show feedback interaction before redirect
    setTimeout(() => {
      window.location.href = config.inviteLink;
      // Reset after a few seconds if user comes back
      setTimeout(() => setRedirecting(false), 3000);
    }, 600);
  };

  // Toggle Edit Mode (Hidden feature for demo: Triple click bottom right copyright to activate)
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black z-10 opacity-90"></div>
        <img 
          src={DEFAULT_CONFIG.backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Animated Orbs for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-whatsapp-brand/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Card Container */}
      <main className="relative z-20 w-full max-w-md px-6 py-12 flex flex-col items-center text-center animate-float">
        
        {/* Glassmorphism Card */}
        <div className="w-full glass rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-xl bg-black/40">
          
          {/* Header Icon / Avatar */}
          <div className="mx-auto mb-8 relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-800 border-4 border-slate-700 shadow-xl overflow-hidden group">
             {config.imageUrl ? (
               <img 
                 src={config.imageUrl} 
                 alt={config.groupName} 
                 className="w-full h-full object-cover"
               />
             ) : (
               <WhatsAppIcon className="w-14 h-14 text-whatsapp-brand" />
             )}
             
             {/* Hint for editing image if in edit mode (optional visual cue) */}
             {isEditing && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 Imagem
               </div>
             )}
          </div>

          {/* Texts */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg break-words">
            {config.groupName}
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xs mx-auto whitespace-pre-line">
            {config.description}
          </p>

          {/* Action Button */}
          <div className="w-full flex justify-center">
            <RippleButton 
              label={redirecting ? "Redirecionando..." : (config.buttonLabel || "Entrar no Grupo")} 
              onClick={handleJoinClick} 
            />
          </div>

          {/* Security / Social Proof Note */}
          <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Seguro • Oficial • Gratuito
          </p>
        </div>

      </main>

      {/* Footer / Copyright */}
      <footer className="absolute bottom-4 text-center w-full z-20 text-slate-600 text-sm">
        <span 
          onClick={(e) => {
            if (e.detail === 3) toggleEdit();
          }}
          className="cursor-default select-none hover:text-slate-500 transition-colors"
        >
          &copy; {new Date().getFullYear()} ZapConnect
        </span>
      </footer>

      {/* Settings Modal (Visible only if isEditing is true) */}
      {isEditing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-whatsapp-brand">⚙️</span> Editar Página
            </h2>
            
            <div className="space-y-4">
              {/* Group Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Nome do Grupo (Título)</label>
                <input 
                  type="text" 
                  value={config.groupName}
                  onChange={(e) => setConfig({...config, groupName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-whatsapp-brand transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Descrição</label>
                <textarea 
                  value={config.description}
                  onChange={(e) => setConfig({...config, description: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-whatsapp-brand transition-colors resize-none"
                />
              </div>

              {/* Button Label */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Texto do Botão</label>
                <input 
                  type="text" 
                  value={config.buttonLabel || ''}
                  placeholder="Ex: Entrar no Grupo"
                  onChange={(e) => setConfig({...config, buttonLabel: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-whatsapp-brand transition-colors"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">URL da Imagem Redonda</label>
                <input 
                  type="text" 
                  value={config.imageUrl || ''}
                  placeholder="https://..."
                  onChange={(e) => setConfig({...config, imageUrl: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-whatsapp-brand transition-colors text-xs"
                />
                <p className="text-[10px] text-slate-500 mt-1">Deixe vazio para usar o ícone padrão.</p>
              </div>

              {/* Invite Link */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Link do Convite</label>
                <input 
                  type="text" 
                  value={config.inviteLink}
                  onChange={(e) => setConfig({...config, inviteLink: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-whatsapp-400 focus:outline-none focus:border-whatsapp-brand transition-colors font-mono text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-white text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Salvar & Fechar
              </button>
            </div>
            
            <p className="mt-4 text-[10px] text-slate-500 text-center">
              Dica: Para editar novamente, clique 3 vezes no rodapé ou no ícone de engrenagem no topo.
            </p>
          </div>
        </div>
      )}

      {/* Admin Quick Trigger (Top Right - visible on hover) */}
      <button 
        onClick={toggleEdit}
        className="absolute top-4 right-4 z-30 p-2 text-slate-700 hover:text-white transition-colors opacity-0 hover:opacity-100"
        title="Editar Página"
      >
        ⚙️
      </button>

    </div>
  );
};

export default App;
