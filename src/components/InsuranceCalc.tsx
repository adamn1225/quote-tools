"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InsuranceCalc: React.FC = () => {

    const [value, setValue] = useState<number | string>('');
    const [insurance, setInsurance] = useState<number>(0);
    const [poInsurance, setPoInsurance] = useState<number>(0);

    const calculateInsurance = () => {
        const parsedValue = parseFloat(value as string);

        if (isNaN(parsedValue)) {
            alert("Please enter a valid number.");
            return;
        }

        const insuranceValue = (parsedValue * 0.0017)
        const newInsuranceValue = insuranceValue * 1.1;
        setInsurance(newInsuranceValue);
        setPoInsurance(insuranceValue);
    };

    return (
        <div className="flex flex-col gap-1 justify-stretch items-stretch">
            <h2 className='font-bold'> Calculate Insurance</h2>
            <label style={{ fontSize: '16px', fontWeight: 600 }} htmlFor="value">Value:</label>
                <Input type="text" id="value" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />

            <Button className='dark-button ' onClick={calculateInsurance}>Calculate Insurance</Button>
            
            <h2 className='font-bold'>Insurance Value: {insurance.toFixed(2)}</h2>
            <h2 className='font-bold'>PO Insurance Value: {poInsurance.toFixed(2)}</h2>
        </div>
    );
}

export default InsuranceCalc;