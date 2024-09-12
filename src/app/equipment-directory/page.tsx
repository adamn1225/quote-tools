import React from 'react'
import DimensionSearch from "@/components/DimensionSearch";
import Aside from '@/components/Aside';

export default function EquipmentDirectory() {

    return (
        <div className="grid grid-rows-2 h-1/2 justify-items-center items-start w-full pl-[53px]">
            <Aside />
            <div className='flex justify-start align-top items-start gap-24'>
                <DimensionSearch />
                </div>
        </div>
    )
};
