"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const TonsToLbs: React.FC = () => {
    const [tons, setTons] = useState<number | string>('');
    const [pounds, setPounds] = useState<number>(0);

    const convertTonsToLbs = () => {
        const tonsValue = parseFloat(tons as string);

        if (isNaN(tonsValue)) {
            alert("Please enter a valid number.");
            return;
        }

        const poundsValue = tonsValue * 2000;
        setPounds(poundsValue);
    };

    return (
        <div className="flex flex-col gap-1 justify-stretch items-stretch">
            <h2 className='font-bold'>Tons to Pounds</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="tons">Tons:</label>
            <Input type="number" id="tons" value={tons} onChange={(e) => setTons(e.target.value)} placeholder="Enter weight in tons" />
            

            <Button className='dark-button' onClick={convertTonsToLbs}>Convert to Pounds</Button>

            <h2 className='font-bold'>Weight in Pounds: {pounds.toFixed(2)}</h2>
        </div>
    );
};

export default TonsToLbs;