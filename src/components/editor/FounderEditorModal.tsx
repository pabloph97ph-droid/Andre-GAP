import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import {
  X,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Sliders,
  DollarSign,
  HelpCircle,
  FileText,
  Award,
} from 'lucide-react';

export const FounderEditorModal: React.FC = () => {
  const {
    config,
    updateConfig,
    showEditorModal,
    setShowEditorModal,
    resetToDefault,
    exportJson,
    importJson,
  } = useContent();

  const [activeTab, setActiveTab] = useState<'slides' | 'oferta' | 'notas' | 'backup'>('slides');
  const [selectedSlideId, setSelectedSlideId] = useState<number>(1);
  const [draftConfig, setDraftConfig] = useState(config);
  const [importedJson, setImportedJson] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  React.useEffect(() => {
    if (showEditorModal) {
      setDraftConfig(config);
      setImportStatus(null);
      setSavedNotice(false);
    }
  }, [showEditorModal, config]);

  if (!showEditorModal) return null;

  const handleSave = () => {
    updateConfig(draftConfig);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleImport = () => {
    if (!importedJson.trim()) return;
    const res = importJson(importedJson);
    if (res.success) {
      setImportStatus({ success: true, message: 'Apresentação importada com sucesso!' });
      setTimeout(() => setShowEditorModal(false), 1200);
    } else {
      setImportStatus({ success: false, message: res.error || 'Erro ao importar JSON.' });
    }
  };

  const activeSlideDraft = draftConfig.slides.find((s) => s.id === selectedSlideId) || draftConfig.slides[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#081522] border-2 border-[#C5A46D] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-[#F6F3EC]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B1E2D] border-b border-[#29485F]/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#081522] border border-[#C5A46D] flex items-center justify-center text-[#E3CB9D]">
              <Sliders className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC]">
                Painel de Edição da Apresentação — André GAP
              </h3>
              <p className="text-xs text-[#AEB9C3]">
                Revisão dos textos das {draftConfig.slides.length} telas, valor de validação e notas para a reunião
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-[#081522] bg-[#E3CB9D] hover:bg-[#C5A46D] rounded-lg transition-colors flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
            <button
              onClick={() => setShowEditorModal(false)}
              className="p-2 text-[#AEB9C3] hover:text-[#F6F3EC] rounded-lg hover:bg-[#10283D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-2.5 bg-[#06111B] border-b border-[#29485F]/40 flex items-center gap-2 text-xs font-mono shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'slides' ? 'bg-[#C5A46D] text-[#081522] font-bold' : 'text-[#AEB9C3] hover:text-[#F6F3EC]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Telas da Apresentação ({draftConfig.slides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('oferta')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'oferta' ? 'bg-[#C5A46D] text-[#081522] font-bold' : 'text-[#AEB9C3] hover:text-[#F6F3EC]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Membros Fundadores & Preço</span>
          </button>

          <button
            onClick={() => setActiveTab('notas')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'notas' ? 'bg-[#C5A46D] text-[#081522] font-bold' : 'text-[#AEB9C3] hover:text-[#F6F3EC]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Notas do Apresentador</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'backup' ? 'bg-[#C5A46D] text-[#081522] font-bold' : 'text-[#AEB9C3] hover:text-[#F6F3EC]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar / Importar JSON</span>
          </button>
        </div>

        {savedNotice && (
          <div className="bg-emerald-950/80 border-b border-emerald-500 px-6 py-2 text-xs font-mono text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Alterações salvas com sucesso no navegador!</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          
          {/* TAB 1: SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-5">
              {/* Slide Picker */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#29485F]/40">
                {draftConfig.slides.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSlideId(s.id)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors shrink-0 cursor-pointer ${
                      selectedSlideId === s.id
                        ? 'bg-[#C5A46D] text-[#081522] font-bold'
                        : 'bg-[#10283D] text-[#AEB9C3] hover:text-[#F6F3EC]'
                    }`}
                  >
                    Tela {s.slideNumber.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono text-[#E3CB9D]">
                  Editando Tela {activeSlideDraft.slideNumber}: {activeSlideDraft.theme.toUpperCase()}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Título da Tela</label>
                  <input
                    type="text"
                    value={activeSlideDraft.title}
                    onChange={(e) => {
                      const updated = draftConfig.slides.map((s) =>
                        s.id === selectedSlideId ? { ...s, title: e.target.value } : s
                      );
                      setDraftConfig({ ...draftConfig, slides: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Subtítulo</label>
                  <input
                    type="text"
                    value={activeSlideDraft.subtitle || ''}
                    onChange={(e) => {
                      const updated = draftConfig.slides.map((s) =>
                        s.id === selectedSlideId ? { ...s, subtitle: e.target.value } : s
                      );
                      setDraftConfig({ ...draftConfig, slides: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>

                {activeSlideDraft.keyPhrase && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#E3CB9D]">Frase Central em Destaque</label>
                    <input
                      type="text"
                      value={activeSlideDraft.keyPhrase || ''}
                      onChange={(e) => {
                        const updated = draftConfig.slides.map((s) =>
                          s.id === selectedSlideId ? { ...s, keyPhrase: e.target.value } : s
                        );
                        setDraftConfig({ ...draftConfig, slides: updated });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: OFERTA & MEMBROS FUNDADORES */}
          {activeTab === 'oferta' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Nome do Programa</label>
                  <input
                    type="text"
                    value={draftConfig.foundersOffer.programName}
                    onChange={(e) => setDraftConfig({
                      ...draftConfig,
                      foundersOffer: { ...draftConfig.foundersOffer, programName: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Preço de Referência</label>
                  <input
                    type="text"
                    value={draftConfig.foundersOffer.referencePrice}
                    onChange={(e) => setDraftConfig({
                      ...draftConfig,
                      foundersOffer: { ...draftConfig.foundersOffer, referencePrice: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Limite de Membros Fundadores</label>
                  <input
                    type="number"
                    value={draftConfig.foundersOffer.maxFoundingMembers}
                    onChange={(e) => setDraftConfig({
                      ...draftConfig,
                      foundersOffer: { ...draftConfig.foundersOffer, maxFoundingMembers: parseInt(e.target.value, 10) || 100 }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Status do Preço (Nota Discreta)</label>
                  <input
                    type="text"
                    value={draftConfig.foundersOffer.priceStatusNote}
                    onChange={(e) => setDraftConfig({
                      ...draftConfig,
                      foundersOffer: { ...draftConfig.foundersOffer, priceStatusNote: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#E3CB9D]">Nota sobre Limites do Acompanhamento</label>
                <textarea
                  rows={2}
                  value={draftConfig.foundersOffer.scopeNote}
                  onChange={(e) => setDraftConfig({
                    ...draftConfig,
                    foundersOffer: { ...draftConfig.foundersOffer, scopeNote: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-xs text-[#F6F3EC]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: NOTAS DO APRESENTADOR */}
          {activeTab === 'notas' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#29485F]/40">
                {draftConfig.slides.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSlideId(s.id)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors shrink-0 cursor-pointer ${
                      selectedSlideId === s.id
                        ? 'bg-[#C5A46D] text-[#081522] font-bold'
                        : 'bg-[#10283D] text-[#AEB9C3] hover:text-[#F6F3EC]'
                    }`}
                  >
                    Notas Tela {s.slideNumber.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono text-[#E3CB9D]">
                  Notas de Apoio para Tela {activeSlideDraft.slideNumber}: {activeSlideDraft.title}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#E3CB9D]">Pergunta para Fazer à Sala</label>
                  <input
                    type="text"
                    value={activeSlideDraft.presenterNote.audienceQuestion || ''}
                    onChange={(e) => {
                      const updated = draftConfig.slides.map((s) =>
                        s.id === selectedSlideId
                          ? { ...s, presenterNote: { ...s.presenterNote, audienceQuestion: e.target.value } }
                          : s
                      );
                      setDraftConfig({ ...draftConfig, slides: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-amber-400">Postura & Ritmo</label>
                  <input
                    type="text"
                    value={activeSlideDraft.presenterNote.pacingHint || ''}
                    onChange={(e) => {
                      const updated = draftConfig.slides.map((s) =>
                        s.id === selectedSlideId
                          ? { ...s, presenterNote: { ...s.presenterNote, pacingHint: e.target.value } }
                          : s
                      );
                      setDraftConfig({ ...draftConfig, slides: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#050C14] border border-[#29485F] text-sm text-[#F6F3EC]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP JSON */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0B1E2D] border border-[#29485F]/50 space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#F6F3EC] flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#C5A46D]" />
                  <span>Baixar Apresentação em Arquivo JSON</span>
                </h4>
                <p className="text-xs text-[#AEB9C3] leading-relaxed">
                  Gere um arquivo com todos os textos das 12 telas, preço e notas. Você pode salvar no seu computador e reutilizar quando quiser.
                </p>
                <button
                  onClick={exportJson}
                  className="px-4 py-2 text-xs font-bold text-[#081522] bg-[#E3CB9D] hover:bg-[#C5A46D] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Arquivo JSON da Apresentação</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1E2D] border border-[#29485F]/50 space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#F6F3EC] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#C5A46D]" />
                  <span>Importar Arquivo JSON</span>
                </h4>
                <textarea
                  rows={4}
                  value={importedJson}
                  onChange={(e) => setImportedJson(e.target.value)}
                  placeholder="Cole aqui o conteúdo do arquivo JSON para restaurar..."
                  className="w-full p-2.5 rounded-lg bg-[#050C14] border border-[#29485F] text-xs font-mono text-[#F6F3EC]"
                />

                {importStatus && (
                  <div className={`p-2.5 rounded text-xs font-mono ${
                    importStatus.success ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                  }`}>
                    {importStatus.message}
                  </div>
                )}

                <button
                  onClick={handleImport}
                  className="px-4 py-2 text-xs font-bold text-[#F6F3EC] bg-[#10283D] hover:bg-[#29485F] border border-[#29485F] rounded-lg transition-colors cursor-pointer"
                >
                  Importar e Atualizar Apresentação
                </button>
              </div>

              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-red-300">Restaurar Apresentação Padrão do Briefing</div>
                  <div className="text-[11px] text-[#AEB9C3]">Volta para os textos exatos fornecidos pelo cliente.</div>
                </div>
                <button
                  onClick={resetToDefault}
                  className="px-3 py-1.5 text-xs text-red-300 border border-red-800 rounded-lg hover:bg-red-900 transition-colors"
                >
                  Restaurar Padrão
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0B1E2D] border-t border-[#29485F]/50 flex items-center justify-between shrink-0 text-xs text-[#AEB9C3]">
          <span>* Salvo no navegador para a reunião de amanhã</span>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold text-[#081522] bg-[#E3CB9D] hover:bg-[#C5A46D] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar Alterações</span>
          </button>
        </div>

      </div>
    </div>
  );
};
