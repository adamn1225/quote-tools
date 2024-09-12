"use client";
import ZipCodeLookup from '@/components/ZipCodeLookup';
import KmToMiles from '@/components/KmToMiles';
import TonsToLbs from '@/components/TonsToLbs';
import MetersToFeetInchesConverter from '@/components/MetersToFeetInchesConverter';
import MmToFeetInchesConverter from '@/components/MmToFeetInchesConverter';
import Aside from '@/components/Aside';

export function Calculators() {
    return (
        <>
            <div className="flex flex-col gap-2 h-screen justify-items-center items-start w-full pl-[53px]">
                <Aside />
        <div className='flex w-screen h-1/3 justify-center items-center gap-12'>
                <KmToMiles />
                <TonsToLbs />
                <MetersToFeetInchesConverter />
                <MmToFeetInchesConverter />
           </div>
            <div className="flex items-center justify-center w-full pt-24 mt-6 border-t-2 border-slate-950">  <ZipCodeLookup /></div>
            </div>
        </>
    );
}

export default Calculators;