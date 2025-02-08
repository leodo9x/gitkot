import { Loader2 } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className='flex-1 flex justify-center items-center gap-2'>
      <div className='flex items-center gap-2 border border-white/10 p-4 rounded-lg bg-white/5 backdrop-blur-xl'>
        <Loader2 className='size-5 animate-spin' strokeWidth={3} />
        <p className='text-white/70'>preparing feed...</p>
      </div>
    </div>
  );
}
