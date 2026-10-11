import React from 'react';
import { ContentProvider } from './context/ContentContext';
import { PresentationView } from './components/presentation/PresentationView';
import { FounderEditorModal } from './components/editor/FounderEditorModal';

export default function App() {
  return (
    <ContentProvider>
      <main className="min-h-screen w-full bg-[#07131F] text-[#F6F3EC] flex flex-col">
        <PresentationView />
        <FounderEditorModal />
      </main>
    </ContentProvider>
  );
}
