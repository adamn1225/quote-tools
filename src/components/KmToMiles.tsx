"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const KmToMiles: React.FC = () => {
    const [kilometers, setKilometers] = useState<number | string>('');
    const [miles, setMiles] = useState<number>(0);

    const convertKmToMiles = () => {
        const kilometersValue = parseFloat(kilometers as string);

        if (isNaN(kilometersValue)) {
            alert("Please enter a valid number.");
            return;
        }

        const milesValue = kilometersValue * 0.621371;
        setMiles(milesValue);
    };

    return (
        <div className="flex flex-col gap-1 justify-stretch items-stretch">
            <h2 className='font-bold'> Convert Kilometers to Miles</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="kilometers">Kilometers:</label>
                <Input type="text" id="kilometers" value={kilometers} onChange={(e) => setKilometers(e.target.value)} placeholder="Enter distance in kilometers" />

            <Button onClick={convertKmToMiles}>Convert to Miles</Button>

            <h2 className='font-bold'>Distance in Miles: {miles.toFixed(2)}</h2>
        </div>
    );
};

export default KmToMiles;