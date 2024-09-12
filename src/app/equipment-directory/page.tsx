"use client";
import React from 'react'
import DimensionSearch from "@/components/DimensionSearch";
import Aside from '@/components/Aside';

const EquipmentDirectory: React.FC = () => {

    return (
        <div className="grid grid-rows-2 h-full justify-items-center items-start w-full pl-[53px]">
            <Aside />
            <div className='absolute top-24'>
                <DimensionSearch />
                </div>
        </div>
    )
};

export default EquipmentDirectory;
