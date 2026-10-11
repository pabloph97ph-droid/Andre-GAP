import React from 'react';

export const ShipHorizonArt: React.FC<{ className?: string; height?: string }> = ({ 
  className = '', 
  height = 'h-64 md:h-80' 
}) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-xl bg-gradient-to-b from-[#06101B] via-[#0D2235] to-[#122D42] border border-[#29485F]/30 shadow-2xl ${className}`}>
      {/* Background Starry Sky and Horizon Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(227,203,157,0.18)_0%,transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 h-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(197,164,109,0.08)_0%,transparent_40%)]" />

      {/* SVG Nautical Constellations & Horizon Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Subtle latitude lines */}
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="rgba(174,185,195,0.06)" strokeDasharray="6 8" />
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="rgba(197,164,109,0.15)" strokeWidth="1" />
        
        {/* Dawn Horizon Ray */}
        <defs>
          <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C5A46D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C5A46D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="oceanWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10283D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#081522" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Ocean Horizon Line */}
        <rect x="0" y="65%" width="100%" height="35%" fill="url(#oceanWaveGrad)" />
      </svg>

      {/* Classical Expedition Ship Silhouette */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-48 sm:w-64 h-36 sm:h-44 flex items-end justify-center pointer-events-none">
        <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" fill="none">
          {/* Main Hull */}
          <path d="M 30 115 C 50 128, 150 128, 175 110 C 165 118, 140 122, 30 115 Z" fill="#050C14" />
          <path d="M 25 112 Q 100 125 180 108 L 175 118 Q 100 132 25 112 Z" fill="#C5A46D" opacity="0.3" />
          <path d="M 20 110 L 35 118 L 175 115 L 185 106 L 165 106 L 30 108 Z" fill="#091826" />

          {/* Masts */}
          {/* Foremast */}
          <line x1="65" y1="110" x2="65" y2="30" stroke="#C5A46D" strokeWidth="1.8" opacity="0.85" />
          {/* Mainmast */}
          <line x1="105" y1="112" x2="105" y2="15" stroke="#E3CB9D" strokeWidth="2.2" opacity="0.95" />
          {/* Mizzenmast */}
          <line x1="145" y1="110" x2="145" y2="38" stroke="#C5A46D" strokeWidth="1.6" opacity="0.8" />
          {/* Bowsprit */}
          <line x1="25" y1="110" x2="2" y2="92" stroke="#C5A46D" strokeWidth="1.8" opacity="0.85" />

          {/* Sails - Foremast */}
          <path d="M 52 45 Q 65 42 78 45 Q 74 65 65 67 Q 56 65 52 45 Z" fill="#E8DEC9" opacity="0.85" />
          <path d="M 48 70 Q 65 66 82 70 Q 77 92 65 95 Q 53 92 48 70 Z" fill="#E8DEC9" opacity="0.8" />

          {/* Sails - Mainmast (Tallest) */}
          <path d="M 90 28 Q 105 25 120 28 Q 116 48 105 50 Q 94 48 90 28 Z" fill="#F6F3EC" opacity="0.9" />
          <path d="M 85 54 Q 105 50 125 54 Q 120 78 105 82 Q 90 78 85 54 Z" fill="#E8DEC9" opacity="0.88" />
          <path d="M 82 85 Q 105 80 128 85 Q 122 104 105 107 Q 88 104 82 85 Z" fill="#E8DEC9" opacity="0.82" />

          {/* Sails - Mizzenmast */}
          <path d="M 132 50 Q 145 47 158 50 Q 154 70 145 72 Q 136 70 132 50 Z" fill="#E8DEC9" opacity="0.8" />
          <path d="M 130 75 Q 145 71 160 75 Q 155 95 145 98 Q 135 95 130 75 Z" fill="#E8DEC9" opacity="0.75" />

          {/* Jib sails at bow */}
          <polygon points="5,94 62,35 62,75" fill="#E8DEC9" opacity="0.65" />
          
          {/* Rigging cables */}
          <line x1="65" y1="30" x2="25" y2="108" stroke="#AEB9C3" strokeWidth="0.6" opacity="0.4" />
          <line x1="105" y1="15" x2="65" y2="108" stroke="#AEB9C3" strokeWidth="0.6" opacity="0.4" />
          <line x1="105" y1="15" x2="145" y2="108" stroke="#AEB9C3" strokeWidth="0.6" opacity="0.4" />
          <line x1="145" y1="38" x2="175" y2="108" stroke="#AEB9C3" strokeWidth="0.6" opacity="0.4" />
        </svg>
      </div>

      {/* Gentle Ocean Waves Foreground */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,85 350,35 500,65 C650,95 850,45 1000,70 C1100,85 1180,60 1200,65 L1200,120 L0,120 Z" fill="#081522" opacity="0.8" />
          <path d="M0,80 C200,60 400,95 600,75 C800,55 1000,90 1200,75 L1200,120 L0,120 Z" fill="#081522" />
        </svg>
      </div>

      {/* Subtle Overlay Label */}
      <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono text-[#AEB9C3]/70 uppercase tracking-widest">
        <span>Rota Marítima</span>
        <span>·</span>
        <span className="text-[#C5A46D]">Meridiano do Conhecimento</span>
      </div>
    </div>
  );
};

export const CompassRoseArt: React.FC<{ size?: string; className?: string }> = ({ 
  size = 'w-32 h-32', 
  className = '' 
}) => {
  return (
    <div className={`relative ${size} flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_180s_linear_infinite]" fill="none">
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="88" stroke="#E3CB9D" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="100" r="82" stroke="#29485F" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Degree markers */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="8"
            x2="100"
            y2={i % 9 === 0 ? "16" : "12"}
            stroke="#C5A46D"
            strokeWidth={i % 9 === 0 ? "1.5" : "0.75"}
            strokeOpacity={i % 9 === 0 ? "0.8" : "0.35"}
            transform={`rotate(${i * 10} 100 100)`}
          />
        ))}

        {/* Major Compass Points */}
        {/* North Point */}
        <polygon points="100,18 108,92 100,100" fill="#E3CB9D" />
        <polygon points="100,18 92,92 100,100" fill="#C5A46D" />

        {/* South Point */}
        <polygon points="100,182 108,108 100,100" fill="#29485F" />
        <polygon points="100,182 92,108 100,100" fill="#10283D" />

        {/* East Point */}
        <polygon points="182,100 108,92 100,100" fill="#E3CB9D" opacity="0.8" />
        <polygon points="182,100 108,108 100,100" fill="#C5A46D" opacity="0.8" />

        {/* West Point */}
        <polygon points="18,100 92,92 100,100" fill="#29485F" opacity="0.8" />
        <polygon points="18,100 92,108 100,100" fill="#10283D" opacity="0.8" />

        {/* Diagonal Intermediate Points */}
        <polygon points="158,42 105,95 100,100" fill="#C5A46D" opacity="0.5" />
        <polygon points="158,42 95,105 100,100" fill="#AEB9C3" opacity="0.3" />
        <polygon points="42,42 95,95 100,100" fill="#C5A46D" opacity="0.5" />
        <polygon points="42,42 105,95 100,100" fill="#AEB9C3" opacity="0.3" />
        <polygon points="158,158 105,105 100,100" fill="#29485F" opacity="0.5" />
        <polygon points="42,158 95,105 100,100" fill="#29485F" opacity="0.5" />

        {/* Center Ring & Hub */}
        <circle cx="100" cy="100" r="14" fill="#081522" stroke="#E3CB9D" strokeWidth="2" />
        <circle cx="100" cy="100" r="5" fill="#C5A46D" />
      </svg>
      
      {/* Cardinal Labels */}
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-serif font-bold text-[#E3CB9D] tracking-widest">N</span>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-serif font-bold text-[#AEB9C3] tracking-widest">S</span>
      <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-serif font-bold text-[#E3CB9D] tracking-widest">L</span>
      <span className="absolute top-1/2 -left-1 -translate-y-1/2 text-[10px] font-serif font-bold text-[#AEB9C3] tracking-widest">O</span>
    </div>
  );
};

export const FleetMovementArt: React.FC<{ className?: string; height?: string }> = ({
  className = '',
  height = 'h-48 sm:h-64',
}) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-2xl bg-gradient-to-b from-[#06101B] via-[#0D2235] to-[#142E44] border border-[#C5A46D]/30 shadow-2xl ${className}`}>
      {/* Golden dawn sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(227,203,157,0.22)_0%,transparent_70%)]" />

      {/* Horizon rays */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <line x1="0" y1="62%" x2="100%" y2="62%" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="0" y="62%" width="100%" height="38%" fill="url(#fleetWater)" />
        <defs>
          <linearGradient id="fleetWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2235" />
            <stop offset="100%" stopColor="#06101B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Fleet of Ships sailing together */}
      <div className="absolute bottom-[20%] inset-x-0 flex items-end justify-center gap-6 sm:gap-10 pointer-events-none px-4">
        {/* Left Ship */}
        <div className="w-16 sm:w-24 h-16 sm:h-24 opacity-75 transform -translate-y-2">
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow" fill="none">
            <path d="M 15 65 Q 50 72 85 62 L 80 67 Q 50 75 15 65 Z" fill="#050C14" />
            <line x1="50" y1="65" x2="50" y2="15" stroke="#C5A46D" strokeWidth="1.5" />
            <path d="M 40 22 Q 50 20 60 22 Q 58 45 50 48 Q 42 45 40 22 Z" fill="#E8DEC9" opacity="0.85" />
          </svg>
        </div>

        {/* Flagship Center (Largest) */}
        <div className="w-24 sm:w-36 h-24 sm:h-36 drop-shadow-xl z-10">
          <svg viewBox="0 0 120 90" className="w-full h-full" fill="none">
            <path d="M 15 72 Q 60 82 105 70 L 100 76 Q 60 86 15 72 Z" fill="#040910" />
            <line x1="60" y1="72" x2="60" y2="10" stroke="#E3CB9D" strokeWidth="2" />
            <line x1="35" y1="72" x2="35" y2="22" stroke="#C5A46D" strokeWidth="1.5" />
            <line x1="85" y1="72" x2="85" y2="28" stroke="#C5A46D" strokeWidth="1.5" />
            {/* Sails */}
            <path d="M 48 18 Q 60 15 72 18 Q 70 42 60 45 Q 50 42 48 18 Z" fill="#F6F3EC" opacity="0.95" />
            <path d="M 46 45 Q 60 42 74 45 Q 72 65 60 67 Q 48 65 46 45 Z" fill="#E8DEC9" opacity="0.9" />
            <path d="M 26 30 Q 35 28 44 30 Q 42 55 35 57 Q 28 55 26 30 Z" fill="#E8DEC9" opacity="0.85" />
            <path d="M 76 34 Q 85 32 94 34 Q 92 56 85 58 Q 78 56 76 34 Z" fill="#E8DEC9" opacity="0.8" />
          </svg>
        </div>

        {/* Right Ship */}
        <div className="w-16 sm:w-24 h-16 sm:h-24 opacity-80 transform -translate-y-1">
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow" fill="none">
            <path d="M 15 65 Q 50 72 85 62 L 80 67 Q 50 75 15 65 Z" fill="#050C14" />
            <line x1="50" y1="65" x2="50" y2="15" stroke="#C5A46D" strokeWidth="1.5" />
            <path d="M 40 22 Q 50 20 60 22 Q 58 45 50 48 Q 42 45 40 22 Z" fill="#E8DEC9" opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#E3CB9D]">
        <span>✦ Movimento Coletivo</span>
        <span>·</span>
        <span className="text-[#AEB9C3]">Frota em Formação Unificada</span>
      </div>
    </div>
  );
};

export const OpenChartArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative p-6 rounded-2xl bg-[#091B29] border border-[#C5A46D]/40 shadow-xl overflow-hidden ${className}`}>
      {/* Background rhumb lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="100" stroke="#C5A46D" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="50%" cy="50%" r="180" stroke="#E3CB9D" strokeWidth="1" strokeDasharray="6 6" fill="none" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#C5A46D" strokeWidth="0.75" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#C5A46D" strokeWidth="0.75" />
      </svg>

      <div className="relative z-10 flex items-center justify-between border-b border-[#C5A46D]/20 pb-3 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E3CB9D] font-bold">
          Carta Náutica Aberta sobre a Mesa
        </span>
        <span className="text-[10px] font-mono text-[#AEB9C3]">
          MESA DE INVESTIGAÇÃO & ESCUTA
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 text-xs">
        <div className="p-3 rounded-lg bg-[#050E17]/80 border border-[#29485F]/50 text-[#AEB9C3]">
          <div className="font-serif font-bold text-[#F6F3EC] mb-1">Registro de Dúvidas</div>
          <div>Ouvir o que os leitores destacaram e quais termos causaram mais reflexão.</div>
        </div>
        <div className="p-3 rounded-lg bg-[#050E17]/80 border border-[#29485F]/50 text-[#AEB9C3]">
          <div className="font-serif font-bold text-[#F6F3EC] mb-1">Rotas de Estudo</div>
          <div>Mapear os assuntos que o grupo considera mais urgentes investigar.</div>
        </div>
      </div>
    </div>
  );
};

export const NavigationalChartArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#0B1E2D] border border-[#29485F]/40 p-6 ${className}`}>
      {/* Rhumb lines background */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="120" stroke="#C5A46D" strokeWidth="0.75" strokeDasharray="4 4" fill="none" />
        <circle cx="50%" cy="50%" r="220" stroke="#C5A46D" strokeWidth="0.75" strokeDasharray="4 8" fill="none" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#E3CB9D" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#E3CB9D" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#C5A46D" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C5A46D" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-[#29485F]/50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A46D]" />
            <span className="text-xs uppercase tracking-widest font-mono text-[#E3CB9D]">Carta Hidrográfica de Investigação</span>
          </div>
          <span className="text-xs font-mono text-[#AEB9C3]">LAT 23° S / LON 43° W</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs text-[#AEB9C3]">
          <div className="p-2.5 rounded bg-[#081522]/80 border border-[#29485F]/30">
            <div className="font-serif text-[#F6F3EC] mb-1">01. Fontes Cartoriais</div>
            <div>Assentos, registros públicos e transcrições em inteiro teor.</div>
          </div>
          <div className="p-2.5 rounded bg-[#081522]/80 border border-[#29485F]/30">
            <div className="font-serif text-[#F6F3EC] mb-1">02. Tratados e Leis</div>
            <div>Legislação positivada e evolução do direito civil.</div>
          </div>
          <div className="p-2.5 rounded bg-[#081522]/80 border border-[#29485F]/30">
            <div className="font-serif text-[#F6F3EC] mb-1">03. Análise Crítica</div>
            <div>Checagem de consistência sem viés sensacionalista.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DocumentStudyArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative p-6 rounded-xl bg-gradient-to-br from-[#122A3E] via-[#0E2233] to-[#081522] border border-[#29485F]/50 shadow-xl ${className}`}>
      {/* Decorative Document Sheet with Wax Seal */}
      <div className="relative bg-[#E8DEC9] text-[#1C1917] p-6 rounded shadow-lg border border-[#D6CEBE]/80">
        {/* Seal */}
        <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#8B261D] border-2 border-[#E3CB9D] flex items-center justify-center shadow-md">
          <span className="font-serif text-xs font-bold text-[#E3CB9D]">GAP</span>
        </div>

        <div className="flex items-center justify-between border-b border-[#D6CEBE] pb-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#78350F]">Protocolo de Exame Documental</span>
          <span className="text-[10px] font-mono text-stone-500">REF: DOC-2026/04</span>
        </div>

        <h4 className="font-serif text-base font-bold text-[#1C1917] mb-2 leading-tight">
          Análise de Texto Notarial e Registro Histórico
        </h4>

        <div className="space-y-1.5 text-xs text-stone-700 font-serif leading-relaxed">
          <p className="italic">
            "Todo documento traz em si a intenção de sua época. Ignorar o contexto do redator é transformar um fato histórico em mito infundado."
          </p>
          <div className="pt-2 flex items-center gap-3 text-[11px] font-sans text-stone-600">
            <span>✓ Origem identificada</span>
            <span>·</span>
            <span>✓ Jurisdição checada</span>
            <span>·</span>
            <span>✓ Fonte primária auditada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookHardcoverMockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative group perspective-1000 ${className}`}>
      {/* 3D Angled Hardcover Book Representation */}
      <div className="relative w-64 sm:w-72 h-96 sm:h-[420px] rounded-r-lg rounded-l-sm bg-[#0A1826] border-t border-r border-b border-[#C5A46D]/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        
        {/* Leather spine effect */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#050E17] via-[#102435] to-[#0A1826] border-r border-[#C5A46D]/30" />
        
        {/* Embossed gold frame */}
        <div className="absolute inset-4 border border-[#C5A46D]/30 pointer-events-none rounded" />
        <div className="absolute inset-5 border border-[#C5A46D]/20 pointer-events-none rounded" />

        {/* Book Header / Monogram */}
        <div className="relative z-10 pl-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#E3CB9D]">
              OBRA INVESTIGATIVA
            </span>
            <span className="text-xs font-serif text-[#C5A46D]">§</span>
          </div>
          <div className="mt-6 text-center">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#AEB9C3]">
              ANDRÉ GAP
            </span>
          </div>
        </div>

        {/* Title in center */}
        <div className="relative z-10 text-center pl-2 my-auto">
          <div className="w-10 h-0.5 bg-[#C5A46D] mx-auto mb-4 opacity-70" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F3EC] leading-tight tracking-wide drop-shadow">
            VOCÊ NASCEU LIVRE!
          </h3>
          <p className="font-serif italic text-lg sm:text-xl text-[#E3CB9D] mt-2 drop-shadow">
            Morrerá Escravo?
          </p>
          <div className="w-10 h-0.5 bg-[#C5A46D] mx-auto mt-4 opacity-70" />
        </div>

        {/* Subtitle & Bottom Seal */}
        <div className="relative z-10 pl-2 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full border border-[#C5A46D]/50 flex items-center justify-center">
              <span className="text-[9px] font-serif text-[#E3CB9D]">⚓</span>
            </div>
          </div>
          <p className="text-[10px] text-[#AEB9C3] font-sans leading-tight">
            Um convite à reflexão, à leitura e à investigação documental.
          </p>
        </div>

        {/* Ribbon Bookmark */}
        <div className="absolute -top-1 left-8 w-3 h-16 bg-[#8B261D] shadow-md border-b-2 border-[#E3CB9D]" />
      </div>
    </div>
  );
};
