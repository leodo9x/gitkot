export function LoadingBar() {
  return (
    <div className='absolute top-0 left-0 right-0 h-[2px] bg-white'>
      <div className='absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-500 animate-shimmer' />
    </div>
  );
}
