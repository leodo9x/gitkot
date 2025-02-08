import { CircleDot, GitFork, GitPullRequest, Share2, Star } from 'lucide-react';
import { shortNumber } from '../lib/number';
export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
};

export type Owner = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  [key: string]: any; // for other properties
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  topics: string[];
  license: License;
  visibility: string;
  [key: string]: any;
};

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const getLanguageColor = () => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-300/80',
      TypeScript: 'bg-blue-400/80',
      Python: 'bg-green-400/80',
      Java: 'bg-orange-400/80',
      'C++': 'bg-pink-400/80',
      Ruby: 'bg-red-400/80',
      Go: 'bg-cyan-400/80',
      Rust: 'bg-orange-500/80',
      PHP: 'bg-indigo-400/80',
      Solidity: 'bg-purple-400/80',
      'C#': 'bg-red-400/80',
      default: 'bg-gray-400/80',
    };
    return colors[repository.language] || colors.default;
  };

  return (
    <div className='grid grid-rows-[auto_minmax(0,1fr)_auto] h-full gap-4 sm:gap-6'>
      {/* Repository Stats Banner */}
      <div className='bg-gradient-to-r from-white/[0.03] to-white/[0.02] rounded-2xl p-3 backdrop-blur-xl border border-white/[0.06] shadow-xl'>
        <div className='grid grid-cols-3 divide-x divide-white/[0.06]'>
          <div className='flex flex-col items-center justify-center p-2'>
            <Star className='w-4 h-4 text-white/50 mb-1' />
            <div className='text-xl font-medium text-white'>
              {shortNumber(repository.stargazers_count)}
            </div>
            <div className='text-[0.65rem] text-white/40 font-medium uppercase tracking-wider'>
              Stars
            </div>
          </div>

          <div className='flex flex-col items-center justify-center p-2'>
            <GitFork className='w-4 h-4 text-white/50 mb-1' />
            <div className='text-xl font-medium text-white'>
              {shortNumber(repository.forks_count)}
            </div>
            <div className='text-[0.65rem] text-white/40 font-medium uppercase tracking-wider'>
              Forks
            </div>
          </div>

          <div className='flex flex-col items-center justify-center p-2'>
            <GitPullRequest className='w-4 h-4 text-white/50 mb-1' />
            <div className='text-xl font-medium text-white'>
              {shortNumber(repository.watchers_count)}
            </div>
            <div className='text-[0.65rem] text-white/40 font-medium uppercase tracking-wider'>
              Watchers
            </div>
          </div>
        </div>
      </div>

      {/* Repository Info */}
      <div className='bg-white/[0.03] rounded-2xl p-6 sm:p-8 backdrop-blur-xl border border-white/[0.06] shadow-xl flex flex-col min-h-0 hover:bg-white/[0.04] transition-colors'>
        {/* Repository Header with User Info */}
        <div className='flex items-center gap-3 mb-4'>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className='w-8 h-8 rounded-full ring-1 ring-white/[0.06]'
          />
          <div className='inline-grid'>
            <h1 className='text-xl font-semibold text-white truncate'>
              {repository.name}
            </h1>
            <p className='text-white/40 text-sm'>by {repository.owner.login}</p>
          </div>
        </div>

        {/* Repository Meta Info */}
        <div className='flex flex-wrap items-center gap-2 text-sm mb-4'>
          {repository.language && (
            <div className='flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] hover:bg-white/[0.06] transition-colors'>
              <span
                className={`w-2 h-2 rounded-full ${getLanguageColor()}`}
              ></span>
              <span className='text-white/70 text-sm'>
                {repository.language}
              </span>
            </div>
          )}

          <div className='flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] hover:bg-white/[0.06] transition-colors'>
            <CircleDot className='w-4 h-4 text-white/40' />
            <span className='text-white/70 text-sm'>
              {repository.license?.name || 'No License'}
            </span>
          </div>
        </div>

        <p className='text-white/70 text-base mb-6 leading-relaxed line-clamp-3 min-h-0'>
          {repository.description}
        </p>

        <div className='flex flex-wrap gap-2 mt-auto'>
          {repository?.topics?.slice(0, 6).map((topic) => (
            <span
              key={topic}
              className='px-3 py-1 bg-white/[0.03] border border-white/[0.06] text-white/60 rounded-full text-sm hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer hover:border-white/[0.1] group'
            >
              <span className='text-white/60 group-hover:text-white/90'>#</span>
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <a
          href={repository.html_url}
          target='_blank'
          className='flex-1 bg-white/[0.05] text-white p-4 rounded-xl 
            font-medium text-base hover:bg-white/[0.08] transition-all 
            flex items-center justify-center gap-2 border border-white/[0.1] 
            hover:border-white/[0.2] shadow-lg backdrop-blur-sm'
        >
          <Star className='w-5 h-5' />
          Star Repository
        </a>
        {navigator.share && (
          <button
            onClick={() => {
              navigator;
              navigator
                .share({
                  title: repository.name,
                  text: repository.description,
                  url: repository.html_url,
                })
                .catch((error) => console.log('Error sharing:', error));
            }}
            className='w-14 h-14 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-colors group'
          >
            <Share2 className='w-5 h-5 text-white/70 group-hover:text-white transition-colors' />
          </button>
        )}
      </div>
    </div>
  );
}
