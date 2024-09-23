"use client";
import React from 'react'
import ValueSearch from '@/components/ValueSearch'
import Aside from '@/components/Aside'

const EquipmentMarket: React.FC = () => {
  return (
    <div className="grid grid-rows-2 h-full justify-items-center items-start w-full pl-[53px]">
    <Aside />

        <div className='absolute top-14'>
        <ValueSearch />
        </div>

</div>
  )
}

export default EquipmentMarket
