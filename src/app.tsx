// Add these imports at the top
import { RefreshCcw } from 'lucide-react';
import { RepositoryCard } from './components/RepositoryCard';
import { repositories } from './data/repositories';

export function App() {
  return (
    <div className='h-screen flex flex-col bg-zinc-950 text-white'>
      {/* Navigation */}
      <nav className='px-4 sm:px-6 py-4 flex-none bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'>
        <div className='flex items-center justify-between max-w-4xl mx-auto'>
          <div className='flex items-center space-x-1'>
            {['Discover', 'Latest', 'Following'].map((item) => (
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
            <RefreshCcw className='w-5 h-5' />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide'>
        {repositories.map((repository) => (
          <div
            key={repository.id}
            className='snap-start h-[calc(100vh-57px)] flex items-center'
          >
            <div className='w-full max-w-4xl mx-auto px-4 sm:px-6'>
              <RepositoryCard repository={repository} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
