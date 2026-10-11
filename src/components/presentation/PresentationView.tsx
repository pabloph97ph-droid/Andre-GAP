import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import {
  ShipHorizonArt,
  FleetMovementArt,
  OpenChartArt,
  DocumentStudyArt,
  CompassRoseArt,
} from '../common/MaritimeArtwork';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Copy,
  Layers,
  Compass,
  CheckCircle2,
  Users,
  Shield,
  BookOpen,
  Award,
  Sparkles,
  Type,
  FileQuestion,
  ScrollText,
  ArrowRight,
  Check,
} from 'lucide-react';

export const PresentationView: React.FC = () => {
  const {
    config,
    currentSlideIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    isPresenterNotesOpen,
    setIsPresenterNotesOpen,
    meetingTimerActive,
    setMeetingTimerActive,
    elapsedSeconds,
    resetTimer,
    liveMeetingNotes,
    setLiveMeetingNotes,
    setShowEditorModal,
  } = useContent();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);
  
  // Text scale: 'compact' | 'balanced' | 'large'
  const [textScale, setTextScale] = useState<'compact' | 'balanced' | 'large'>('balanced');

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const totalSlides = config.slides.length;
  const currentSlide = config.slides[currentSlideIndex] || config.slides[0];

  // Scroll to top of slide on slide change so user starts at the top
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlideIndex]);

  // Keyboard navigation: ArrowRight / ArrowLeft / Space / F / P / T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPresenterNotesOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        cycleTextScale();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(liveMeetingNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const cycleTextScale = () => {
    setTextScale((prev) => {
      if (prev === 'compact') return 'balanced';
      if (prev === 'balanced') return 'large';
      return 'compact';
    });
  };

  // Render Part Switcher pill bar when slide has partInfo
  const renderPartSwitcher = () => {
    if (!currentSlide.partInfo) return null;
    const { currentPart, totalParts, partTitle, linkedSlideId } = currentSlide.partInfo;

    return (
      <div className="mb-4 p-2 sm:p-2.5 rounded-xl bg-[#071726] border border-[#C5A46D]/50 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
          <span className="text-[11px] font-mono uppercase text-[#AEB9C3]">
            TELA DIVIDIDA EM {totalParts} PARTES:
          </span>
          <span className="text-xs font-mono font-bold text-[#E3CB9D]">
            Parte {currentPart} de {totalParts} · {partTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToSlide(currentPart === 1 ? currentSlideIndex : linkedSlideId - 1)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPart === 1
                ? 'bg-[#C5A46D] text-[#081522] shadow'
                : 'bg-[#10283D] text-[#AEB9C3] hover:text-[#F6F3EC] hover:bg-[#1A3852]'
            }`}
          >
            <span>Parte 1</span>
            {currentPart === 1 && <Check className="w-3 h-3" />}
          </button>
          <button
            onClick={() => goToSlide(currentPart === 2 ? currentSlideIndex : linkedSlideId - 1)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPart === 2
                ? 'bg-[#C5A46D] text-[#081522] shadow'
                : 'bg-[#10283D] text-[#AEB9C3] hover:text-[#F6F3EC] hover:bg-[#1A3852]'
            }`}
          >
            <span>Parte 2</span>
            {currentPart === 2 && <Check className="w-3 h-3" />}
          </button>
        </div>
      </div>
    );
  };

  // Render Slide Body based on slide id
  const renderSlideBody = () => {
    switch (currentSlide.id) {
      // TELA 1 — ABERTURA
      case 1:
        return (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#C5A46D] px-3.5 py-1.5 rounded-lg bg-[#10283D] border border-[#C5A46D]/40 font-bold">
                {currentSlide.tagline}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className={`font-serif font-bold text-[#F6F3EC] leading-[1.15] tracking-wide ${
                textScale === 'compact' ? 'text-2xl sm:text-4xl' : textScale === 'balanced' ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-6xl'
              }`}>
                “{currentSlide.title}”
              </h1>

              <p className={`font-serif italic text-[#E3CB9D] leading-relaxed ${
                textScale === 'compact' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl lg:text-3xl'
              }`}>
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Maritime Graphic Area */}
            <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8">
                <ShipHorizonArt height="h-36 sm:h-48" />
              </div>
              <div className="md:col-span-4 p-5 rounded-2xl bg-[#0B1E2D] border border-[#29485F] flex flex-col items-center text-center justify-center space-y-2">
                <CompassRoseArt size="w-14 h-14 sm:w-16 sm:h-16" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#E3CB9D] font-bold">
                  Bússola & Cartas Náuticas
                </span>
                <span className="text-xs text-[#AEB9C3]">
                  Encontro com Leitores da Obra
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#29485F]/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#AEB9C3]">
              <span className="text-[#C5A46D] font-semibold">
                ✦ {currentSlide.keyPhrase}
              </span>
              <span>Reunião ao Vivo · {config.founderName}</span>
            </div>
          </div>
        );

      // TELA 2 — A HISTÓRIA
      case 2:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* 3 Visual Journey Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {currentSlide.bullets?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0D2235] border border-[#C5A46D]/40 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-[#10283D] border-2 border-[#C5A46D] flex items-center justify-center font-mono text-xs font-bold text-[#E3CB9D]">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono uppercase text-[#AEB9C3]/80">
                        {idx === 0 ? 'O Ponto de Partida' : idx === 1 ? 'Fontes e Estudos' : 'Missão Compartilhada'}
                      </span>
                    </div>

                    <h3 className={`font-serif font-bold text-[#F6F3EC] leading-snug ${
                      textScale === 'compact' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                    }`}>
                      {item}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#29485F]/40 text-xs font-mono text-[#C5A46D]">
                    Diário de Bordo · André GAP
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#0D2235]/60 border border-[#29485F]/50 text-xs sm:text-sm text-[#AEB9C3] flex items-center justify-between">
              <span>Espaço para André contar sua trajetória com suas próprias palavras e vivência.</span>
              <span className="text-[#C5A46D] font-mono font-semibold">Rota Autobiográfica</span>
            </div>
          </div>
        );

      // TELA 3 — OS DOCUMENTOS
      case 3:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              {/* Left: 5 Key Terms */}
              <div className="lg:col-span-7 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E3CB9D] font-bold block mb-1">
                  Palavras-Chave para Compreensão:
                </span>
                {currentSlide.bullets?.map((term, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-3.5 hover:border-[#C5A46D] transition-colors shadow-sm"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C5A46D] shrink-0" />
                    <span className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#F6F3EC]">
                      {term}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right: Document Table Graphic */}
              <div className="lg:col-span-5">
                <DocumentStudyArt />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F]/50 text-xs sm:text-sm text-[#AEB9C3]">
              * A função desta tela é apoiar André na explicação oral sobre os documentos abordados no livro, sem modelos falsos ou promessas milagrosas.
            </div>
          </div>
        );

      // TELA 4 — ANTECIPAÇÃO
      case 4:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* 3 Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7 space-y-3.5">
                {currentSlide.bullets?.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0D2235] border border-[#C5A46D]/40 shadow-lg flex items-start gap-4"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#081522] border-2 border-[#C5A46D] flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-[#E3CB9D] shrink-0">
                      0{idx + 1}
                    </span>
                    <p className={`font-serif font-bold text-[#F6F3EC] leading-snug ${
                      textScale === 'compact' ? 'text-sm sm:text-base' : 'text-base sm:text-xl'
                    }`}>
                      {q}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5">
                <ShipHorizonArt height="h-40 sm:h-48" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#10283D]/80 border border-[#29485F]/60 text-xs sm:text-sm text-[#E8DEC9] font-serif italic text-center">
              "{currentSlide.keyPhrase}"
            </div>
          </div>
        );

      // TELA 5 — ABRIR PARA PERGUNTAS
      case 5:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7 space-y-3">
                {currentSlide.bullets?.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-3.5 hover:border-[#C5A46D] transition-colors"
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#10283D] border border-[#C5A46D] flex items-center justify-center font-mono text-xs text-[#E3CB9D] shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span className={`font-serif font-bold text-[#F6F3EC] ${
                      textScale === 'compact' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                    }`}>
                      {q}
                    </span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5">
                <OpenChartArt />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#C5A46D]/40 text-xs sm:text-sm text-[#E3CB9D] flex items-center justify-between">
              <span>Momento de escuta: André interrompe a apresentação, ouve as pessoas e dialoga livremente.</span>
              <span className="font-mono text-[#AEB9C3]">Microfones & Chat</span>
            </div>
          </div>
        );

      // TELA 6 — A FORÇA DO GRUPO
      case 6:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC] leading-tight">
                {currentSlide.title}
              </h2>
            </div>

            {/* Central Highlight Quote */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#10283D] to-[#0A1A2A] border border-[#C5A46D]/60 text-center shadow-lg">
              <p className="font-serif text-lg sm:text-2xl font-bold text-[#E3CB9D] italic">
                {currentSlide.keyPhrase}
              </p>
            </div>

            {/* Bullets & Fleet Art */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSlide.bullets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#F6F3EC]"
                  >
                    <Users className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5">
                <FleetMovementArt height="h-36 sm:h-44" />
              </div>
            </div>

            <div className="pt-1 text-xs font-mono text-[#AEB9C3]/80 text-center">
              A importância da união em um movimento nacional sério e bem organizado.
            </div>
          </div>
        );

      // TELA 7 — A IMPORTÂNCIA DA LEI
      case 7:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7 space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E3CB9D] font-bold block mb-1">
                  Pilares de Atenção Técnica:
                </span>
                {currentSlide.bullets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-3.5 text-xs sm:text-base font-bold text-[#F6F3EC]"
                  >
                    <Shield className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0B1E2D] border border-[#C5A46D]/40 text-center space-y-3">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A46D] mx-auto" />
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#F6F3EC]">
                  Biblioteca Histórica & Rigor
                </h4>
                <p className="text-xs sm:text-sm text-[#AEB9C3] leading-relaxed">
                  {currentSlide.keyPhrase}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F]/50 text-xs text-[#AEB9C3]">
              * André aborda a influência da lei no dia a dia com responsabilidade, sem alegações infundadas de imunidade.
            </div>
          </div>
        );

      // TELA 8 — POR QUE NÃO FAZER TUDO SOZINHO?
      case 8:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
            </div>

            {/* Central Quote */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#10283D] border border-[#C5A46D]/50 shadow-md">
              <p className="font-serif italic text-sm sm:text-lg lg:text-xl text-[#E3CB9D] leading-relaxed">
                {currentSlide.quote}
              </p>
            </div>

            {/* 4 Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
              {currentSlide.bullets?.map((elem, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#0B1E2D] border border-[#29485F] flex flex-col justify-between shadow-md"
                >
                  <div className="text-xs font-mono text-[#C5A46D] mb-2 font-bold">
                    Ponto Crítico 0{idx + 1}
                  </div>
                  <p className="font-serif text-sm sm:text-base font-bold text-[#F6F3EC] leading-snug">
                    {elem}
                  </p>
                  <div className="mt-4 pt-2 border-t border-[#29485F]/30 text-[11px] font-mono text-[#AEB9C3]">
                    Requer atenção aos detalhes
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F]/50 text-xs text-[#AEB9C3]">
              A troca de experiências e a organização coletiva reduzem a chance de erros individuais.
            </div>
          </div>
        );

      // TELA 9 — A PROPOSTA DO GAP (PARTE 1 DE 2: ESTUDO E DOCUMENTOS)
      case 9:
        return (
          <div className="space-y-5 text-left">
            {renderPartSwitcher()}

            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* 3 Proposal Blocks with FULL text and spacious reading room */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {currentSlide.customBlocks?.map((block, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0D2235] border border-[#C5A46D]/50 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-full bg-[#10283D] border border-[#C5A46D] flex items-center justify-center font-mono text-xs font-bold text-[#E3CB9D]">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A46D] font-bold">
                        Pilar Documental
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#F6F3EC] mb-2 leading-snug">
                      {block.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#AEB9C3] leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-2.5 border-t border-[#29485F]/40 text-[10px] font-mono text-[#E3CB9D]">
                    Estrutura Educacional GAP
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom info & Next Part button */}
            <div className="p-3.5 rounded-xl bg-[#0A1B29] border border-[#29485F]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-[#AEB9C3]">
              <span>* Os materiais e cronogramas serão disponibilizados conforme forem preparados e verificados pelo fundador.</span>
              <button
                onClick={() => goToSlide(9)} // Go to slide 10 (0-indexed 9)
                className="px-3.5 py-1.5 rounded-lg bg-[#C5A46D] text-[#081522] font-mono font-bold text-xs hover:bg-[#E3CB9D] transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Ver Parte 2: Apoio & Movimento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );

      // TELA 10 — A PROPOSTA DO GAP (PARTE 2 DE 2: APOIO E MOVIMENTO COLETIVO)
      case 10:
        return (
          <div className="space-y-5 text-left">
            {renderPartSwitcher()}

            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F3EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base text-[#AEB9C3]">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* 2 Big Community Blocks + Visual Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-stretch">
              <div className="lg:col-span-7 space-y-4">
                {currentSlide.customBlocks?.map((block, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0D2235] border border-[#C5A46D]/50 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#10283D] border border-[#C5A46D] flex items-center justify-center font-mono text-xs font-bold text-[#E3CB9D]">
                          0{idx + 4}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A46D] font-bold">
                          {idx === 0 ? 'Encontros & Apoio' : 'Comunidade Nacional'}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F6F3EC] mb-2 leading-snug">
                        {block.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#AEB9C3] leading-relaxed">
                        {block.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#29485F]/40 text-[10px] font-mono text-[#E3CB9D]">
                      Construção Coletiva Organizada
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="p-5 rounded-2xl bg-[#0A1B29] border border-[#29485F] text-center space-y-3">
                  <FleetMovementArt height="h-32 sm:h-40" />
                  <p className="font-serif text-xs sm:text-sm text-[#E3CB9D] italic leading-relaxed">
                    "{currentSlide.keyPhrase}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#081522] border border-[#29485F]/60 text-xs text-[#AEB9C3]">
                  Encontros virtuais periódicos para tirar dúvidas, debater temas e trocar experiências de estudo.
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#10283D]/60 border border-[#29485F]/50 text-xs text-[#AEB9C3] flex items-center justify-between">
              <span>Continuidade do programa GAP com presença e alinhamento coletivo.</span>
              <span className="font-mono text-[#C5A46D]">Fase 02 Estruturante</span>
            </div>
          </div>
        );

      // TELA 11 — O CONHECIMENTO TRANSFORMA A FORMA DE VER
      case 11:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC] leading-tight">
                {currentSlide.title}
              </h2>
              <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#E3CB9D]">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7 space-y-2.5">
                {currentSlide.bullets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-3.5 text-xs sm:text-base font-bold text-[#F6F3EC]"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5">
                <ShipHorizonArt height="h-40 sm:h-48" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081522] border border-[#29485F]/50 text-xs sm:text-sm text-[#AEB9C3] text-center font-serif">
              "{currentSlide.keyPhrase}"
            </div>
          </div>
        );

      // TELA 12 — O CONVITE (PARTE 1 DE 2: OS 7 BENEFÍCIOS COMPLETOS)
      case 12:
        return (
          <div className="space-y-5 text-left">
            {renderPartSwitcher()}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29485F]/50 pb-2.5">
              <div>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                  {currentSlide.tagline}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F3EC]">
                  {currentSlide.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#AEB9C3]">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Founding Member Badge */}
              <div className="px-3.5 py-1.5 rounded-xl bg-[#10283D] border-2 border-[#C5A46D] flex items-center gap-2 shadow-lg">
                <Award className="w-4 h-4 text-[#E3CB9D]" />
                <span className="font-mono text-xs font-bold text-[#E3CB9D]">
                  PROGRAMA DE CONTINUIDADE
                </span>
              </div>
            </div>

            {/* 7 Benefits - FULL TEXT, CLEARLY NUMBERED & SPACED */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E3CB9D] font-bold block mb-1">
                Os 7 Benefícios da Comunidade GAP:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSlide.bullets?.map((benefit, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-start gap-3 text-xs sm:text-sm text-[#F6F3EC] shadow-sm ${
                      idx === 6 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Part Button */}
            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F]/50 flex flex-wrap items-center justify-between gap-3 text-xs text-[#AEB9C3]">
              <span>Todos os 7 itens propostos foram pensados para garantir autonomia, rigor e amparo contínuo.</span>
              <button
                onClick={() => goToSlide(12)} // Go to slide 13 (0-indexed 12)
                className="px-3.5 py-1.5 rounded-lg bg-[#C5A46D] text-[#081522] font-mono font-bold text-xs hover:bg-[#E3CB9D] transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Ver Condições dos Membros Fundadores</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );

      // TELA 13 — O GRUPO FUNDADOR (PARTE 2 DE 2: CONDIÇÕES & VALOR DE VALIDAÇÃO)
      case 13:
        return (
          <div className="space-y-5 text-left">
            {renderPartSwitcher()}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29485F]/50 pb-2.5">
              <div>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                  {currentSlide.tagline}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F3EC]">
                  {currentSlide.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#AEB9C3]">
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-[#10283D] border-2 border-[#C5A46D] flex items-center gap-2 shadow-lg">
                <Award className="w-5 h-5 text-[#E3CB9D]" />
                <span className="font-mono text-xs sm:text-sm font-bold text-[#E3CB9D]">
                  PRIMEIROS {config.foundersOffer.maxFoundingMembers} MEMBROS FUNDADORES
                </span>
              </div>
            </div>

            {/* Commercial terms panel & highlight cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-stretch">
              
              {/* Left: Highlights */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E3CB9D] font-bold block mb-1">
                  Condições da Turma Pioneira:
                </span>
                {currentSlide.bullets?.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D2235] border border-[#29485F] flex items-center gap-3.5 text-xs sm:text-sm font-bold text-[#F6F3EC]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}

                <div className="p-4 rounded-xl bg-[#0B1E2D] border border-[#C5A46D]/40 text-xs sm:text-sm text-[#E3CB9D] italic">
                  {currentSlide.quote}
                </div>
              </div>

              {/* Right: Commercial Terms Spotlight */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-[#10283D] to-[#0A1A2A] border-2 border-[#C5A46D] text-center space-y-4 shadow-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E3CB9D] font-bold block mb-2">
                    {config.foundersOffer.priceStatusNote}
                  </span>

                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F3EC]">
                    {config.foundersOffer.referencePrice}
                  </div>

                  <p className="text-xs text-[#AEB9C3] mt-2 leading-relaxed">
                    Acesso anual à comunidade, encontros periódicos e materiais verificados.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#081522] border border-[#29485F] text-xs text-[#E3CB9D] leading-relaxed">
                  {config.foundersOffer.scopeNote}
                </div>
              </div>

            </div>

            <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F]/50 text-xs text-[#AEB9C3] text-center">
              Condições, formato e limites do acompanhamento explicados oralmente por André durante a reunião.
            </div>
          </div>
        );

      // TELA 14 — ENCERRAMENTO
      case 14:
        return (
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#C5A46D] font-bold">
                {currentSlide.tagline}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F3EC] leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl text-[#AEB9C3] leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-center">
              <div className="lg:col-span-7">
                <FleetMovementArt height="h-40 sm:h-52" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#10283D] to-[#081522] border-2 border-[#C5A46D] text-center space-y-4 shadow-xl">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#E3CB9D] italic">
                  {currentSlide.quote}
                </div>
                <div className="text-sm font-mono text-[#AEB9C3] font-bold">
                  {currentSlide.keyPhrase}
                </div>
                <div className="p-3.5 rounded-xl bg-[#081522] border border-[#29485F] text-xs text-[#AEB9C3]">
                  Manifeste seu interesse no chat ou diretamente com André.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#29485F]/40 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#AEB9C3]">
              <span>Encerramento da Apresentação Oficial</span>
              <span className="text-[#C5A46D] font-bold">GAP · Investigação & Ação Coletiva</span>
            </div>
          </div>
        );

      default:
        return <div>Tela {currentSlide.slideNumber}</div>;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#07131F] text-[#F6F3EC] flex flex-col justify-between"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 h-14 px-4 sm:px-6 bg-[#091A2A]/95 border-b border-[#29485F]/40 flex items-center justify-between z-30 shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A46D] flex items-center justify-center bg-[#10283D]">
            <Compass className="w-4 h-4 text-[#C5A46D]" />
          </div>
          <div>
            <span className="font-serif text-sm font-bold text-[#F6F3EC]">
              {config.brandName}
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#AEB9C3] ml-2">
              · Reunião com Leitores
            </span>
          </div>
        </div>

        {/* Slide Counter & Progress */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#E3CB9D]">
          <span>Tela</span>
          <span className="font-bold text-base text-[#F6F3EC]">
            {currentSlide.slideNumber.toString().padStart(2, '0')}
          </span>
          <span className="text-[#AEB9C3]">/</span>
          <span className="text-[#AEB9C3]">
            {totalSlides.toString().padStart(2, '0')}
          </span>
          <span className="hidden md:inline text-[11px] text-[#AEB9C3]/70 ml-1">
            ({Math.round(((currentSlideIndex + 1) / totalSlides) * 100)}%)
          </span>
        </div>

        {/* Right Tools (Timer, Text Scale, Presenter Notes, Thumbnails, Editor, Fullscreen) */}
        <div className="flex items-center gap-2">
          {/* Meeting Timer */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0B1E2D] border border-[#29485F] text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="text-[#E3CB9D] font-bold">{formatTimer(elapsedSeconds)}</span>
            <button
              onClick={() => setMeetingTimerActive((prev) => !prev)}
              className="text-[#AEB9C3] hover:text-[#F6F3EC] ml-0.5 cursor-pointer"
              title={meetingTimerActive ? 'Pausar Cronômetro' : 'Iniciar Cronômetro'}
            >
              {meetingTimerActive ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            </button>
            <button
              onClick={resetTimer}
              className="text-[#AEB9C3] hover:text-[#F6F3EC] cursor-pointer"
              title="Zerar Cronômetro"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Text Scale Selector */}
          <button
            onClick={cycleTextScale}
            className="p-1.5 rounded-lg bg-[#10283D] hover:bg-[#29485F] text-[#AEB9C3] hover:text-[#F6F3EC] border border-[#29485F] transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono"
            title="Tamanho do Texto: Compacto / Equilibrado / Grande (Tecla T)"
          >
            <Type className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="hidden sm:inline uppercase text-[10px]">
              {textScale === 'compact' ? 'Pequeno' : textScale === 'balanced' ? 'Médio' : 'Grande'}
            </span>
          </button>

          {/* Presenter Notes Button */}
          <button
            onClick={() => setIsPresenterNotesOpen((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              isPresenterNotesOpen
                ? 'bg-[#C5A46D] text-[#081522] border-[#C5A46D]'
                : 'bg-[#10283D] hover:bg-[#29485F] text-[#E3CB9D] border-[#29485F]'
            }`}
            title="Painel do Apresentador (Tecla P)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notas</span>
          </button>

          {/* Thumbnails Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails((prev) => !prev)}
            className={`p-1.5 rounded-lg text-[#AEB9C3] border border-[#29485F] transition-colors cursor-pointer ${
              showThumbnails ? 'bg-[#C5A46D] text-[#081522]' : 'bg-[#10283D] hover:bg-[#29485F]'
            }`}
            title="Índice de Todas as Telas"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Editor Modal Button */}
          <button
            onClick={() => setShowEditorModal(true)}
            className="p-1.5 rounded-lg bg-[#10283D] hover:bg-[#29485F] text-[#AEB9C3] border border-[#29485F] transition-colors cursor-pointer"
            title="Editar Textos, Preço e Conteúdo"
          >
            <Sliders className="w-4 h-4 text-[#C5A46D]" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-[#10283D] hover:bg-[#29485F] text-[#AEB9C3] border border-[#29485F] transition-colors cursor-pointer"
            title="Tela Cheia (Tecla F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Slide Workspace - NEVER traps text! Dedicated scroll container */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* The Slide Canvas: Starts cleanly at the top, scrollable smoothly down without clipping */}
        <div
          ref={scrollAreaRef}
          className={`flex-1 w-full overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            isPresenterNotesOpen ? 'lg:max-w-[68%]' : 'w-full'
          }`}
        >
          <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8 pb-28 sm:pb-32 flex flex-col justify-start">
            
            {/* The Slide Card */}
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0B1E2E] to-[#07131F] border-2 border-[#C5A46D]/40 shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between">
              
              {/* Subtle background navigational lines */}
              <div className="absolute inset-0 bg-rhumb-lines opacity-20 pointer-events-none rounded-2xl" />

              {/* Slide Content */}
              <div className="relative z-10 w-full">
                {renderSlideBody()}
              </div>

              {/* Slide bottom progress indicator */}
              <div className="mt-8 pt-4 border-t border-[#29485F]/30 w-full">
                <div className="h-1.5 w-full bg-[#10283D] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C5A46D] to-[#E3CB9D] transition-all duration-300"
                    style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Presenter Notes Drawer */}
        {isPresenterNotesOpen && (
          <aside className="w-full lg:w-[32%] bg-[#06111B] border-t lg:border-t-0 lg:border-l border-[#29485F]/60 p-5 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-full">
            <div className="space-y-4 text-left">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#29485F]/50 text-xs font-mono">
                <span className="text-[#E3CB9D] font-bold">
                  LEMBRETES · TELA {currentSlide.slideNumber} / {totalSlides}
                </span>
                <span className="text-[#C5A46D] font-bold">
                  {currentSlide.theme.toUpperCase()}
                </span>
              </div>

              {/* Points to cover */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C5A46D] font-bold">
                  🎯 Pontos essenciais para André abordar:
                </div>
                <div className="space-y-2 bg-[#0B1E2D] p-3 rounded-xl border border-[#29485F]/50 text-xs text-[#F6F3EC]">
                  {currentSlide.presenterNote.pointsToCover.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#C5A46D] font-bold">•</span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question to audience */}
              {currentSlide.presenterNote.audienceQuestion && (
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#E3CB9D] font-bold">
                    ❓ Pergunta disparadora para a sala:
                  </div>
                  <p className="text-xs font-semibold text-[#F6F3EC] bg-[#0B1E2D] p-3 rounded-xl border border-[#29485F]/50">
                    "{currentSlide.presenterNote.audienceQuestion}"
                  </p>
                </div>
              )}

              {/* Pacing Hint */}
              {currentSlide.presenterNote.pacingHint && (
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    ⏱️ Postura & Ritmo:
                  </div>
                  <p className="text-xs text-amber-200/90 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/50">
                    {currentSlide.presenterNote.pacingHint}
                  </p>
                </div>
              )}

              {/* Live Notepad */}
              <div className="space-y-2 pt-2 border-t border-[#29485F]/40">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E3CB9D] font-bold">Bloco de Notas da Reunião:</span>
                  <button
                    onClick={copyNotes}
                    className="text-[#C5A46D] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedNotes ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={liveMeetingNotes}
                  onChange={(e) => setLiveMeetingNotes(e.target.value)}
                  placeholder="Digite aqui anotações de dúvidas dos participantes durante o Zoom/Meet..."
                  className="w-full p-2.5 rounded-xl bg-[#030910] border border-[#29485F] text-xs font-mono text-[#F6F3EC] focus:border-[#C5A46D] focus:outline-none"
                />
              </div>

            </div>

            <div className="mt-3 pt-3 border-t border-[#29485F]/30 text-[11px] font-mono text-[#AEB9C3]/70 flex items-center justify-between">
              <span>Orientação de reunião</span>
              <button
                onClick={() => setShowEditorModal(true)}
                className="text-[#C5A46D] hover:underline font-bold"
              >
                Editar notas
              </button>
            </div>
          </aside>
        )}

      </div>

      {/* Thumbnails Drawer Overlay */}
      {showThumbnails && (
        <div className="sticky bottom-16 inset-x-0 bg-[#06111B]/95 backdrop-blur-md border-t border-[#29485F] p-4 z-40 max-h-52 overflow-x-auto">
          <div className="flex items-center gap-3">
            {config.slides.map((s, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    goToSlide(idx);
                    setShowThumbnails(false);
                  }}
                  className={`w-44 h-28 rounded-xl p-3 border text-left shrink-0 transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#10283D] border-[#C5A46D] shadow-md ring-2 ring-[#C5A46D]'
                      : 'bg-[#030910] border-[#29485F]/50 hover:border-[#AEB9C3]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] text-[#C5A46D] font-bold">
                      Tela {s.slideNumber.toString().padStart(2, '0')}
                    </span>
                    {s.partInfo && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C5A46D]/20 text-[#E3CB9D]">
                        P{s.partInfo.currentPart}
                      </span>
                    )}
                  </div>
                  <span className="font-serif text-xs font-bold text-[#F6F3EC] line-clamp-2">
                    {s.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#AEB9C3]/60 uppercase truncate">
                    {s.theme}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Bar */}
      <footer className="sticky bottom-0 h-16 px-4 sm:px-6 bg-[#091A2A]/95 border-t border-[#29485F]/40 flex items-center justify-between z-30 shrink-0 backdrop-blur-md">
        <button
          disabled={currentSlideIndex === 0}
          onClick={prevSlide}
          className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-mono font-bold rounded-xl bg-[#10283D] hover:bg-[#1A3852] text-[#F6F3EC] border border-[#29485F] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#C5A46D]" />
          <span className="hidden sm:inline">Tela Anterior</span>
          <span className="sm:hidden">Anterior</span>
        </button>

        {/* Slide Dots / Counter */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[50%] sm:max-w-none px-2 py-1">
          {config.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlideIndex
                  ? 'w-6 sm:w-7 bg-[#C5A46D]'
                  : 'w-1.5 sm:w-2 bg-[#29485F] hover:bg-[#AEB9C3]'
              }`}
              title={`Ir para tela ${idx + 1}`}
            />
          ))}
        </div>

        <button
          disabled={currentSlideIndex === totalSlides - 1}
          onClick={nextSlide}
          className="px-3.5 sm:px-5 py-2.5 text-xs sm:text-sm font-mono font-bold rounded-xl bg-gradient-to-r from-[#C5A46D] to-[#E3CB9D] hover:from-[#E3CB9D] hover:to-[#C5A46D] text-[#081522] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <span className="hidden sm:inline">Próxima Tela</span>
          <span className="sm:hidden">Próxima</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
