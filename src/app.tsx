// Add these imports at the top
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Filters } from './components/Filters';
import { RepositoryCard } from './components/RepositoryCard';
import { repositories } from './data/repositories';

export function App() {
  const [activeFilter, setActiveFilter] = useState('discover');

  console.log(activeFilter);
  return (
    <div className='h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 flex-none bg-white/5 backdrop-blur-xl border-b border-white/10 z-50'>
        <div className='flex items-center justify-between max-w-4xl mx-auto'>
          <Filters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <button className='p-2 text-white/70 hover:text-white transition-colors sm:hidden'>
            <RefreshCcw className='w-5 h-5' />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide'>
        {repositories.map((repository) => (
          <div
            key={repository.id}
            className='snap-start min-h-[calc(100vh-57px)] h-[calc(100vh-57px)] flex items-center py-6'
          >
            <div className='w-full max-w-3xl mx-auto px-4 sm:px-6 h-full'>
              <RepositoryCard repository={repository} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
