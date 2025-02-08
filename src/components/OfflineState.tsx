import { WifiOff } from 'lucide-react';

export function OfflineState() {
  return (
    <div className='flex-1 flex justify-center items-center gap-2'>
      <div className='flex flex-col justify-center text-center items-center gap-5 border border-white/10 py-8 px-4 rounded-lg bg-white/5 backdrop-blur-xl max-w-md mx-4'>
        <WifiOff className='size-8 text-yellow-400 shrink-0' strokeWidth={2} />
        <div className='space-y-2'>
          <p className='text-yellow-400 font-medium'>You're offline</p>
          <p className='text-yellow-400/70 text-sm text-balance'>
            Please check your internet connection and try again
          </p>
        </div>
      </div>
    </div>
  );
}
