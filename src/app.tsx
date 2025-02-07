import { Loader2, RefreshCcw } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Filters } from './components/Filters';
import { Repository, RepositoryCard } from './components/RepositoryCard';
import { repositories as apiRepositories } from './data/repositories';

export function App() {
  const [activeFilter, setActiveFilter] = useState('discover');
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function fetchRepositories(): Promise<Repository[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiRepositories);
      }, 1000);
    });
  }

  useEffect(() => {
    fetchRepositories().then((repositories) => {
      setRepositories(repositories);
      setIsLoading(false);
    });
  }, []);

  // Add scroll handler
  useEffect(() => {
    if (isLoading) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      if (isFetchingMore) {
        return;
      }

      const totalHeight = scrollContainer.scrollHeight;
      const scrollPosition = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;

      // Calculate how many repositories are left before the end
      const itemHeight = containerHeight; // Since each item takes full viewport height
      const itemsFromBottom = Math.floor(
        (totalHeight - (scrollPosition + containerHeight)) / itemHeight
      );

      if (itemsFromBottom <= 3) {
        setIsFetchingMore(true);
        fetchRepositories().then((newRepositories) => {
          setRepositories((prev) => [...prev, ...newRepositories]);
          setIsFetchingMore(false);
        });
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isFetchingMore, isLoading]);

  return (
    <div className='h-screen relative flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {isFetchingMore && (
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-white'>
          <div className='absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-500 animate-shimmer' />
        </div>
      )}
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 flex justify-between flex-row bg-white/5 backdrop-blur-xl border-b border-white/10 z-50'>
        <Filters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <button className='p-2 text-white/70 hover:text-white transition-colors'>
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
