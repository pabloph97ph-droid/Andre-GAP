import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PresentationConfig, SlideData, FoundersOfferConfig } from '../types';
import { initialPresentationConfig } from '../data/presentationData';

const PRESENTATION_STORAGE_KEY = 'gap_presentation_config_v4';
const PRESENTER_NOTES_KEY = 'gap_presenter_meeting_notes_v4';

interface ContentContextType {
  config: PresentationConfig;
  updateConfig: (newConfig: PresentationConfig) => void;
  updateSlide: (slideId: number, updatedSlide: Partial<SlideData>) => void;
  updateFoundersOffer: (offer: Partial<FoundersOfferConfig>) => void;
  resetToDefault: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => { success: boolean; error?: string };

  // Slide Navigation
  currentSlideIndex: number;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;

  // Presenter Notes & Meeting Controls
  isPresenterNotesOpen: boolean;
  setIsPresenterNotesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meetingTimerActive: boolean;
  setMeetingTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedSeconds: number;
  resetTimer: () => void;
  liveMeetingNotes: string;
  setLiveMeetingNotes: React.Dispatch<React.SetStateAction<string>>;

  // Editor Modal
  showEditorModal: boolean;
  setShowEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PresentationConfig>(() => {
    try {
      const saved = localStorage.getItem(PRESENTATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
          return { ...initialPresentationConfig, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Could not load saved GAP presentation from localStorage', e);
    }
    return initialPresentationConfig;
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPresenterNotesOpen, setIsPresenterNotesOpen] = useState<boolean>(false);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);

  // Live meeting notes for André during the call
  const [liveMeetingNotes, setLiveMeetingNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(PRESENTER_NOTES_KEY) || '';
    } catch {
      return '';
    }
  });

  // Meeting Timer
  const [meetingTimerActive, setMeetingTimerActive] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Save config
  useEffect(() => {
    try {
      localStorage.setItem(PRESENTATION_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Error saving presentation to localStorage', e);
    }
  }, [config]);

  // Save live notes
  useEffect(() => {
    try {
      localStorage.setItem(PRESENTER_NOTES_KEY, liveMeetingNotes);
    } catch (e) {
      console.warn('Error saving meeting notes', e);
    }
  }, [liveMeetingNotes]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (meetingTimerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [meetingTimerActive]);

  const resetTimer = () => {
    setElapsedSeconds(0);
    setMeetingTimerActive(false);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(config.slides.length - 1, prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < config.slides.length) {
      setCurrentSlideIndex(index);
    }
  };

  const updateConfig = (newConfig: PresentationConfig) => {
    setConfig(newConfig);
  };

  const updateSlide = (slideId: number, updatedSlide: Partial<SlideData>) => {
    setConfig((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === slideId ? { ...s, ...updatedSlide } : s)),
    }));
  };

  const updateFoundersOffer = (offer: Partial<FoundersOfferConfig>) => {
    setConfig((prev) => ({
      ...prev,
      foundersOffer: { ...prev.foundersOffer, ...offer },
    }));
  };

  const resetToDefault = () => {
    if (window.confirm('Deseja restaurar a apresentação original de 12 telas com os textos oficiais do briefing?')) {
      setConfig(initialPresentationConfig);
      localStorage.removeItem(PRESENTATION_STORAGE_KEY);
      localStorage.removeItem(PRESENTER_NOTES_KEY);
      setLiveMeetingNotes('');
      setCurrentSlideIndex(0);
    }
  };

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gap_apresentacao_andre_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !Array.isArray(parsed.slides) || parsed.slides.length !== 12) {
        return { success: false, error: 'O arquivo JSON precisa conter exatamente as 12 telas da apresentação GAP.' };
      }
      setConfig(parsed);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: 'Falha ao processar arquivo JSON: ' + (e?.message || 'formato inválido') };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        config,
        updateConfig,
        updateSlide,
        updateFoundersOffer,
        resetToDefault,
        exportJson,
        importJson,
        currentSlideIndex,
        setCurrentSlideIndex,
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
        showEditorModal,
        setShowEditorModal,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
