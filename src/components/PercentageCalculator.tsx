"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PercentageCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<number | string>('');
    const [percentage, setPercentage] = useState<number | string>(3);
    const [result, setResult] = useState<number>(0);

    const calculate = () => {
        const principalValue = parseFloat(principal as string);
        const percentageValue = parseFloat(percentage as string);

        if (isNaN(principalValue) || isNaN(percentageValue)) {
            alert("Please enter valid numbers.");
            return;
        }

        const resultValue = principalValue * (1 + percentageValue / 100);
        setResult(resultValue);
    };

    return (
        <div>
            <h2>Add percentage to principal</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="principal">Principal Amount:</label><br />
            <Input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="Enter principal amount" /><br /><br />

            <label style={{ fontSize: '16px', fontWeight: 600, textWrap: 'wrap' }} htmlFor="percentage">Percentage to Add <br /><span
                style={{ fontWeight: 200, fontSize: '14px' }}>(3% by default<br /> for full cc charges, tariff, amwins,
                etc,<br /> (feel free to change)):</span></label><br />
            <Input type="number" id="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="Enter percentage" /><br />

            <Button className='dark-button' onClick={calculate}>Calculate</Button>

            <h2>New Total: ${result.toFixed(2)}</h2>
        </div>
    );
};

export default PercentageCalculator;