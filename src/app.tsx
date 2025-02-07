// Add these imports at the top
import { RefreshCcw } from 'lucide-react';
import { RepositoryCard } from './components/RepositoryCard';
import { repositories } from './data/repositories';

export function App() {
  return (
    <div className='h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden'>
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 flex-none bg-white/5 backdrop-blur-xl border-b border-white/10'>
        <div className='flex items-center justify-between max-w-4xl mx-auto'>
          <div className='flex items-center space-x-2'>
            {['Discover', 'Latest', 'Following'].map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${
                        item === 'Discover'
                          ? 'bg-white text-black'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
              >
                {item}
              </button>
            ))}
          </div>
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
