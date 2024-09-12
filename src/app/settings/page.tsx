"use client";
import React from 'react'
import Aside from '@/components/Aside'

const Settings: React.FC = () => {

    return (
        <div className="grid grid-rows-2 h-1/2 justify-items-center items-start w-full pl-[53px]">
            <Aside />
            <div className='flex justify-start align-top items-start gap-24'>
                <h1 className="font-bold text-3xl text-center text-slate-950">Custom Settings Coming Soon</h1>
            </div>
        </div>
    )
}

export default Settings
