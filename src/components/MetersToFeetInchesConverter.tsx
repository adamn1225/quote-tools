"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MetersToFeetInchesConverter: React.FC = () => {
    const [meters, setMeters] = useState<number | string>('');
    const [feetInches, setFeetInches] = useState<string>('0 ft 0 in');

    const convertMetersToFeetInches = () => {
        const metersValue = parseFloat(meters as string);

        if (isNaN(metersValue)) {
            alert("Please enter a valid number.");
            return;
        }

        const totalInches = metersValue * 39.3701;
        const feet = Math.floor(totalInches / 12);
        const inches = (totalInches % 12).toFixed(2);
        setFeetInches(`${feet} ft ${inches} in`);
    };

    return (
        <div className="flex flex-col gap-1 justify-stretch items-stretch">
            <h2 className='font-bold'>Meters to Feet & Inches</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="meters">Meters:</label>
            <Input type="number" id="meters" value={meters} onChange={(e) => setMeters(e.target.value)} placeholder="Enter length in meters" />

            <Button onClick={convertMetersToFeetInches}>Convert to Feet and Inches</Button>

            <h2 className='font-bold'>Feet and Inches: {feetInches}</h2>
        </div>
    );
};

export default MetersToFeetInchesConverter;