"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const MmToFeetInchesConverter: React.FC = () => {
    const [millimeters, setMillimeters] = useState<number | string>('');
    const [feetInches, setFeetInches] = useState<string>('0 ft 0 in');

    const convertMmToFeetInches = () => {
        const millimetersValue = parseFloat(millimeters as string);

        if (isNaN(millimetersValue)) {
            alert("Please enter a valid number.");
            return;
        }

        const totalInches = millimetersValue * 0.0393701;
        const feet = Math.floor(totalInches / 12);
        const inches = (totalInches % 12).toFixed(2);
        setFeetInches(`${feet} ft ${inches} in`);
    };

    return (
        <div className="flex flex-col gap-1 justify-stretch items-stretch">
            <h2 className='font-bold'>Millimeters to Feet & Inches</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="millimeters">Millimeters:</label>
                <Input type="number" id="millimeters" value={millimeters} onChange={(e) => setMillimeters(e.target.value)} placeholder="Enter length in millimeters" />

            <Button onClick={convertMmToFeetInches}>Convert to Feet and Inches</Button>

            <h2 className='font-bold'>Feet & Inches: {feetInches}</h2>
        </div>
    );
};

export default MmToFeetInchesConverter;