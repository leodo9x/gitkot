import { RefreshCw, Settings } from 'lucide-react';
import { useState } from "react";
import { Logo } from './Logo';
import { FeedType } from '../lib/github';

interface NavigationProps {
  onSettingsClick: () => void;
  onRefreshClick: () => void;
  onRefresh: () => void;
  onSavedFeedType: (feedType: FeedType) => void;
  isDataLoading: boolean;
  initialFeedType: FeedType;
}

export function Navigation(props: NavigationProps) {
  const { onSettingsClick, onRefreshClick, isDataLoading, initialFeedType, onSavedFeedType, onRefresh } = props;
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(initialFeedType ?? 'random');

  const handleFeedTypeChange = (feedType: FeedType) => {
    setSelectedFeedType(feedType)
    onSavedFeedType(feedType)
    onRefresh()
  }

  return (
    <nav className='px-4 sm:px-6 py-4 flex justify-between flex-row bg-white/5 backdrop-blur-xl border-b border-white/10 z-50'>
      <div className='flex-1 flex justify-between max-w-2xl mx-auto items-center gap-2'>
        <a
          href='https://gitkot.com'
          className='flex items-center gap-2 text-white/70 hover:text-white transition-colors'
        >
          <Logo className='size-8' />
          <span className='text-base font-medium'>gitkot</span>
        </a>

        <div className='flex items-center gap-2'>
              <div className='relative'>
                <select
                  id='feedType'
                  value={selectedFeedType}
                  onChange={(e) => handleFeedTypeChange(e.target.value as FeedType)}
                  className='w-full bg-black/20 text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all'
                >
                  <option value=''>Feed Type</option>
                  <option value='new'>New</option>
                  <option value='random'>Random</option>
                </select>
                <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-white/40'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
            </div>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={onSettingsClick}
            className='p-2 text-white/70 hover:text-white transition-colors'
          >
            <Settings className='w-5 h-5' />
          </button>
          <button
            onClick={onRefreshClick}
            className='p-2 text-white/70 hover:text-white transition-colors'
            disabled={isDataLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isDataLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}
