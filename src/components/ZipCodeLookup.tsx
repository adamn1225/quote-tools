"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ZipCodeLookup: React.FC = () => {
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [originInfo, setOriginInfo] = useState<string>('');
    const [destinationInfo, setDestinationInfo] = useState<string>('');
    const [distanceInfo, setDistanceInfo] = useState<string>('');

    const lookupZipCode = async (type: 'origin' | 'destination') => {
        const zipCode = type === 'origin' ? origin : destination;
        const url = `https://api.zippopotam.us/us/${zipCode}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const info = `
            <p>Country: ${data.country}</p>
            <p>State: ${data.places[0]['state']}</p>
            <p>City: ${data.places[0]['place name']}</p>
        `;
            if (type === 'origin') {
                setOriginInfo(info);
            } else {
                setDestinationInfo(info);
            }
        } catch (error) {
            const errorMessage = `<p>Error: ${(error as Error).message}</p>`;
            if (type === 'origin') {
                setOriginInfo(errorMessage);
            } else {
                setDestinationInfo(errorMessage);
            }
        }
    };

    const calculateDistance = () => {
        const originLatElement = document.getElementById('originLat') as HTMLInputElement | null;
        const originLngElement = document.getElementById('originLng') as HTMLInputElement | null;
        const destinationLatElement = document.getElementById('destinationLat') as HTMLInputElement | null;
        const destinationLngElement = document.getElementById('destinationLng') as HTMLInputElement | null;

        const originLat = parseFloat(originLatElement?.value ?? '');
        const originLng = parseFloat(originLngElement?.value ?? '');
        const destinationLat = parseFloat(destinationLatElement?.value ?? '');
        const destinationLng = parseFloat(destinationLngElement?.value ?? '');

        if (isNaN(originLat) || isNaN(originLng) || isNaN(destinationLat) || isNaN(destinationLng)) {
            const distanceInfoElement = document.getElementById('distanceInfo');
            if (distanceInfoElement) {
                distanceInfoElement.innerHTML = '<p>Please lookup both ZIP codes first.</p>';
            }
            return;
        }

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(destinationLat - originLat);
        const dLng = toRadians(destinationLng - originLng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(originLat)) * Math.cos(toRadians(destinationLat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = R * c; // Distance in kilometers
        const distanceMiles = distanceKm * 0.621371; // Convert kilometers to miles

        const distanceInfoElement = document.getElementById('distanceInfo');
        if (distanceInfoElement) {
            distanceInfoElement.innerHTML = `<p>Distance: ${distanceKm.toFixed(2)} km (${distanceMiles.toFixed(2)} miles)</p>`;
        }
    };

    const toRadians = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'start', alignItems: 'start' }}>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold'>Origin ZIP Code Lookup</h2>
                    <Input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter Origin ZIP Code" />
                    <Button onClick={() => lookupZipCode('origin')}>Lookup Origin</Button>
                    <div dangerouslySetInnerHTML={{ __html: originInfo }}></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold'>Destination ZIP Code Lookup</h2>
                    <Input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter Destination ZIP Code" />
                    <Button onClick={() => lookupZipCode('destination')}>Lookup Destination</Button>
                    <div dangerouslySetInnerHTML={{ __html: destinationInfo }}></div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75px' }}>
                <Button onClick={calculateDistance}>Calculate Distance</Button>
                <div dangerouslySetInnerHTML={{ __html: distanceInfo }}></div>
            </div>
        </div>
    );
};

export default ZipCodeLookup;