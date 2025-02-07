import { Loader2, RefreshCcw, Settings } from 'lucide-react';
import { Logo } from './components/Logo';
import { RepositoryCard } from './components/RepositoryCard';
import { useGitHub } from './hooks/use-github';
import { useInfiniteScroll } from './hooks/use-infinite-scroll';
import { useState, useEffect } from 'react';
import { SettingsPopup, type Language } from './components/SettingsPopup';

export function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage as Language);
    }
  }, []);

  const { repositories, isLoading, isFetchingMore, fetchMore, refresh } =
    useGitHub({ language: selectedLanguage });

  const scrollContainerRef = useInfiniteScroll({
    onLoadMore: fetchMore,
    isLoading: isLoading || isFetchingMore,
  });

  const handleRefresh = () => {
    refresh();
  };

  const handleSaveSettings = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('preferred_language', language ?? '');
  };

  return (
    <div className='h-screen relative flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {isFetchingMore && (
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-white'>
          <div className='absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-500 animate-shimmer' />
        </div>
      )}

      {showSettings && (
        <SettingsPopup
          onClose={() => setShowSettings(false)}
          onSave={handleSaveSettings}
          initialLanguage={selectedLanguage}
        />
      )}

      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 flex justify-between flex-row bg-white/5 backdrop-blur-xl border-b border-white/10 z-50'>
        <a
          href='https://github.com'
          className='flex items-center gap-2 text-white/70 hover:text-white transition-colors'
        >
          <Logo className='size-8' />
          <span className='text-base font-medium'>gititok</span>
        </a>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setShowSettings(true)}
            className='p-2 text-white/70 hover:text-white transition-colors'
          >
            <Settings className='w-5 h-5' />
          </button>
          <button
            onClick={handleRefresh}
            className='p-2 text-white/70 hover:text-white transition-colors'
          >
            <RefreshCcw className='w-5 h-5' />
          </button>
        </div>
      </nav>
      {isLoading ? (
        <div className='flex-1 flex justify-center items-center gap-2'>
          <div className='flex items-center gap-2 border border-white/10 p-4 rounded-lg bg-white/5 backdrop-blur-xl'>
            <Loader2 className='size-5 animate-spin' strokeWidth={3} />
            <p className='text-white/70'>preparing feed...</p>
          </div>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className='flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide'
        >
          {repositories.map((repository) => (
            <div
              key={repository.id}
              className='snap-start min-h-[calc(100vh-60px)] h-[calc(100vh-60px)] flex items-center py-6'
            >
              <div className='w-full max-w-3xl mx-auto px-4 sm:px-6 h-full'>
                <RepositoryCard repository={repository} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
