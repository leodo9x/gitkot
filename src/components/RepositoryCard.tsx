import {
  Star,
  Share2,
  GitFork,
  CircleDot,
  GitPullRequest,
  AlertCircle,
} from 'lucide-react';
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
  [key: string]: any; // for other properties
};

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className='space-y-6 sm:space-y-8 h-full'>
      {/* Repository Stats Banner */}
      <div className='bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50 backdrop-blur-xl'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col items-center justify-center p-3'>
            <Star className='w-5 h-5 text-blue-400 mb-1.5' />
            <div className='text-2xl font-bold text-zinc-100'>
              {repository.stargazers_count}
            </div>
            <div className='text-xs text-zinc-400 font-medium'>Stars</div>
          </div>

          <div className='flex flex-col items-center justify-center p-3 border-x border-zinc-800/50'>
            <GitFork className='w-5 h-5 text-purple-400 mb-1.5' />
            <div className='text-2xl font-bold text-zinc-100'>
              {repository.forks_count}
            </div>
            <div className='text-xs text-zinc-400 font-medium'>Forks</div>
          </div>

          <div className='flex flex-col items-center justify-center p-3'>
            <GitPullRequest className='w-5 h-5 text-green-400 mb-1.5' />
            <div className='text-2xl font-bold text-zinc-100'>
              {repository.watchers_count}
            </div>
            <div className='text-xs text-zinc-400 font-medium'>Watchers</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className='w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-zinc-700/50'
          />
          <span className='absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-medium'>
            JS
          </span>
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between mb-1'>
            <h2 className='text-xl sm:text-2xl font-bold text-zinc-100 truncate'>
              {repository.owner.login}
            </h2>
            <button className='bg-zinc-800 px-4 py-2 rounded-full text-sm hover:bg-zinc-700 transition-colors ml-2'>
              Follow
            </button>
          </div>
          <p className='text-zinc-400 text-sm'>
            Created on {new Date(repository.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Repository Info */}
      <div className='bg-zinc-900/30 rounded-2xl p-5 sm:p-8 border border-zinc-800/50'>
        <div className='flex items-start justify-between gap-4 mb-5'>
          <div className='min-w-0'>
            <h1 className='text-xl sm:text-2xl font-bold mb-2 text-zinc-100 truncate'>
              {repository.name}
            </h1>
            <p className='text-zinc-500 text-xs mb-4'>
              Created on {new Date(repository.created_at).toLocaleDateString()}
            </p>
            <div className='flex flex-wrap items-center gap-2 sm:gap-3 text-sm'>
              <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                <span className='w-2 h-2 rounded-full bg-yellow-400'></span>
                {repository.language}
              </div>

              <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                <CircleDot className='w-4 h-4 text-blue-400' />
                {repository.license?.name || 'No License'}
              </div>

              <div className='flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-full'>
                <AlertCircle className='w-4 h-4 text-red-400' />
                {repository.open_issues_count} issues
              </div>
            </div>
          </div>
        </div>
        <p className='text-zinc-300 text-sm sm:text-base mb-6 leading-relaxed'>
          {repository.description}
        </p>
        <div className='flex flex-wrap gap-1.5 sm:gap-2'>
          {repository?.topics?.map((topic) => (
            <span
              key={topic}
              className='px-2.5 py-1 bg-zinc-800/30 text-zinc-400 rounded-full text-xs hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors cursor-pointer'
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex space-x-3'>
        <button className='flex-1 bg-zinc-100 text-zinc-900 p-3 rounded-xl font-semibold text-base hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2'>
          <Star className='w-5 h-5' />
          Star Repository
        </button>
        <button className='w-14 h-14 flex items-center justify-center bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-colors'>
          <Share2 className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}
