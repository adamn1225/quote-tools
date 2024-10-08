"use client";
import React from 'react';
import Aside from '@/components/Aside';
import DimensionSearch from '@/components/DimensionSearch';

export default function Home() {
  return (
<div>
      <div className="w-full pl-[53px]">
        <Aside />
        <div className='absolute top-24 flex justify-center w-full'>
          <DimensionSearch />
        </div>
      </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
  
        </footer>
</div>
  );
}
