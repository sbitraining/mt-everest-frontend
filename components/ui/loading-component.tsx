import React from 'react';

export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md'>
      <div className='flex flex-col items-center gap-3'>
        <div className='relative h-16 w-16'>
          <div className='absolute h-full w-full rounded-full border-[3px] border-gray-100 opacity-20' />
          <div
            className='absolute h-full w-full animate-spin rounded-full border-[3px] border-transparent border-t-[#0d9488]'
            style={{
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              animationDuration: '1s',
            }}
          />
        </div>
        <div className='text-sm font-light text-gray-600'>Loading</div>
      </div>
    </div>
  );
}
