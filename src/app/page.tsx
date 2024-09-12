import Image from "next/image";
import DimensionSearch from "@/components/DimensionSearch";
import PercentageCalculator from '@/components/PercentageCalculator';
import KmToMiles from '@/components/KmToMiles';
import TonsToLbs from '@/components/TonsToLbs';
import MetersToFeetInchesConverter from '@/components/MetersToFeetInchesConverter';
import MmToFeetInchesConverter from '@/components/MmToFeetInchesConverter';
import ZipCodeLookup from '@/components/ZipCodeLookup';

export default function Home() {
  return (
<div>
      <div className="flex flex-col items-center p-2 pb-12 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <DimensionSearch />
        <main className="flex flex-row flex-wrap gap-8 row-start-2 justify-center items-center w-full sm:items-start pt-4 border-t-2 border-slate-950">
  
          <KmToMiles />
          <TonsToLbs />
          <MetersToFeetInchesConverter />
          <MmToFeetInchesConverter />
          <PercentageCalculator />
        </main>
      <div className="flex items-center justify-center w-full pt-4 border-t-2 border-slate-950">  <ZipCodeLookup /></div>
      </div>
  
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
  
        </footer>
</div>
  );
}
