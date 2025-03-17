import {
  GitFork,
  GitPullRequest,
  Share2,
  Star,
  Hammer,
  ClockArrowDown,
} from 'lucide-react';
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
  [key: string]: any;
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
        Python: 'bg-[#3572A5]',
        C: 'bg-[#555555]',
        'C++': 'bg-[#f34b7d]',
        Java: 'bg-[#b07219]',
        'C#': 'bg-[#178600]',
        HTML: 'bg-[#e34c26]',
        CSS: 'bg-[#563d7c]',
        JavaScript: 'bg-[#f1e05a]',
        TypeScript: 'bg-[#2b7489]',
        Go: 'bg-[#00ADD8]',
        'Visual Basic': 'bg-[#945db7]',
        Fortran: 'bg-[#4d41b1]',
        SQL: 'bg-[#e38c00]',
        'Delphi/Object Pascal': 'bg-[#b0ce4e]',
        MATLAB: 'bg-[#e16737]',
        Rust: 'bg-[#dea584]',
        Ruby: 'bg-[#701516]',
        Scratch: 'bg-[#4d97ff]',
        PHP: 'bg-[#4F5D95]',
        Swift: 'bg-[#ffac45]',
        Assembly: 'bg-[#6E4C13]',
        COBOL: 'bg-[#4584b6]',
        Kotlin: 'bg-[#A97BFF]',
        Shell: 'bg-[#cecfcb]',
        Bash: 'bg-[#cecfcb]',
        "Jupyter Notebook": 'bg-[#DA5B0B]',
        Makefile: 'bg-[#427819]',
        "Objective-C": 'bg-[#438eff]',
        default: 'bg-[#9e9e9e]',
    };
    return colors[repository.language] || colors.default;
  };

  return (
    <div className='grid grid-rows-[minmax(0,1fr)_auto_auto] h-full gap-4 sm:gap-6'>
      <div className='bg-white/[0.03] rounded-2xl p-2 sm:p-8 backdrop-blur-xl border border-white/[0.06] shadow-xl flex flex-col min-h-0 hover:bg-white/[0.04] transition-colors'>
        <a
          href={repository.html_url}
          target='_blank'
          className='flex items-center gap-3 mb-2'
        >
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className='w-8 h-8 rounded-full ring-1 ring-white/[0.06]'
          />
          <span className='inline-grid'>
            <span className='text-xl font-semibold text-white truncate'>
              {repository.name}
            </span>
            <span className='text-white/40 text-sm'>
              by {repository.owner.login}
            </span>
          </span>
        </a>

        <div className='flex flex-wrap items-center gap-2 text-sm mb-2'>
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
        </div>

        <p className='text-white/70 text-base leading-relaxed line-clamp-5 min-h-0 [overflow-wrap:anywhere]'>
          {repository.description}
        </p>

        <div className='mt-auto flex justify-between'>
          <div className='flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] hover:bg-white/[0.06] transition-colors'>
            <Hammer className='w-4 h-4 text-white/40' />
            <time
              dateTime={repository.created_at}
              className='text-white/70 text-sm'
            >
              {new Date(repository.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className='flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] hover:bg-white/[0.06] transition-colors'>
            <ClockArrowDown className='w-4 h-4 text-white/40' />
            <time
              dateTime={repository.updated_at}
              className='text-white/70 text-sm'
            >
              {new Date(repository.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-white/[0.03] to-white/[0.02] rounded-2xl backdrop-blur-xl border border-white/[0.06] shadow-xl'>
        <div className='grid grid-cols-3 divide-x divide-white/[0.06]'>
          <div className='flex flex-col items-center justify-center p-1'>
            <Star className='w-4 h-4 text-white/50 mb-1' />
            <div className='text-xl font-medium text-white'>
              {shortNumber(repository.stargazers_count)}
            </div>
            <div className='text-[0.65rem] text-white/40 font-medium uppercase tracking-wider'>
              Stars
            </div>
          </div>

          <div className='flex flex-col items-center justify-center p-1'>
            <GitFork className='w-4 h-4 text-white/50 mb-1' />
            <div className='text-xl font-medium text-white'>
              {shortNumber(repository.forks_count)}
            </div>
            <div className='text-[0.65rem] text-white/40 font-medium uppercase tracking-wider'>
              Forks
            </div>
          </div>

          <div className='flex flex-col items-center justify-center p-1'>
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

      <div className='flex gap-3'>
        <a
          href={repository.html_url}
          target='_blank'
          className='flex-1 bg-white/[0.05] text-white rounded-xl
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
            className='w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-colors group'
          >
            <Share2 className='w-5 h-5 text-white/70 group-hover:text-white transition-colors' />
          </button>
        )}
      </div>
    </div>
  );
}
