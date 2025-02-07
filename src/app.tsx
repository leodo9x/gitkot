// Add these imports at the top
import { Share2 } from 'lucide-react';
import { RepositoryCard } from './components/RepositoryCard';
import { repositories } from './data/repositories';

export function App() {
  return (
    <div className='h-[100dvh] bg-zinc-950 text-white overflow-hidden'>
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'>
        <div className='flex items-center justify-between max-w-4xl mx-auto'>
          <div className='flex items-center space-x-1'>
            {['Discover', 'My Feed'].map((item) => (
              <button
                key={item}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        item === 'Discover'
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className='p-2 text-zinc-400 hover:text-white transition-colors sm:hidden'>
            <Share2 className='w-5 h-5' />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='h-[calc(100dvh-61px)] overflow-y-auto snap-y snap-mandatory scrollbar-hide'>
        {repositories.map((repository) => (
          <div key={repository.id} className='snap-start h-[calc(100dvh-61px)]'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 h-full'>
              <RepositoryCard repository={repository} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
