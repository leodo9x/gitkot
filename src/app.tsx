import { Loader2, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { RepositoryCard } from './components/RepositoryCard';
import { useGitHub } from './hooks/use-github';
import { useInfiniteScroll } from './hooks/use-infinite-scroll';
import { Logo } from './components/Logo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { repositories, isLoading, isFetchingMore, fetchMore, refresh } =
    useGitHub();

  const scrollContainerRef = useInfiniteScroll({
    onLoadMore: fetchMore,
    isLoading: isLoading || isFetchingMore,
  });

  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className='h-screen relative flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {isFetchingMore && (
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-white'>
          <div className='absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-500 animate-shimmer' />
        </div>
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
        <button
          onClick={handleRefresh}
          className='p-2 text-white/70 hover:text-white transition-colors'
        >
          <RefreshCcw className='w-5 h-5' />
        </button>
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

export function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
