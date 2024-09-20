"use client";
import React from 'react'
import DimensionSearch from "@/components/DimensionSearch";
import Aside from '@/components/Aside';
import CaterpillarSearch from '@/components/CaterpillarSearch';

const EquipmentDirectory: React.FC = () => {

    return (
        <div className="grid grid-rows-2 h-full justify-items-center items-start w-full pl-[53px]">
            <Aside />

                <div className='absolute top-14'>
                    <DimensionSearch />
                    <div className='mt-48'><CaterpillarSearch /></div>
                </div>

        </div>
    )
};

export default EquipmentDirectory;
