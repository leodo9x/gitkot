import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

export function ErrorState(props: ErrorStateProps) {
  const { error } = props;

  return (
    <div className='flex-1 flex justify-center items-center gap-2'>
      <div className='flex flex-col justify-center text-center items-center gap-5 border border-white/10 py-8 px-4 rounded-lg bg-white/5 backdrop-blur-xl max-w-md mx-4'>
        <AlertTriangle
          className='size-8 text-red-400 shrink-0'
          strokeWidth={2}
        />
        <p className='text-red-400 text-balance text-sm'>{error}</p>
      </div>
    </div>
  );
}
