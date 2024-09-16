"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ZipCodeLookup: React.FC = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originInfo, setOriginInfo] = useState('');
    const [destinationInfo, setDestinationInfo] = useState('');
    const [distanceInfo, setDistanceInfo] = useState('');
    const [originLatLng, setOriginLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [destinationLatLng, setDestinationLatLng] = useState<{ lat: number, lng: number } | null>(null);

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
                <p>Latitude: ${data.places[0]['latitude']}</p>
                <p>Longitude: ${data.places[0]['longitude']}</p>
            `;
            const latLng = {
                lat: parseFloat(data.places[0]['latitude']),
                lng: parseFloat(data.places[0]['longitude']),
            };
            if (type === 'origin') {
                setOriginInfo(info);
                setOriginLatLng(latLng);
            } else {
                setDestinationInfo(info);
                setDestinationLatLng(latLng);
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

    const toRadians = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };

    const calculateDistance = () => {
        if (!originLatLng || !destinationLatLng) {
            setDistanceInfo('<p>Please lookup both ZIP codes first.</p>');
            return;
        }

        const { lat: originLat, lng: originLng } = originLatLng;
        const { lat: destinationLat, lng: destinationLng } = destinationLatLng;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(destinationLat - originLat);
        const dLng = toRadians(destinationLng - originLng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(originLat)) * Math.cos(toRadians(destinationLat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = R * c; // Distance in kilometers
        const distanceMiles = distanceKm * 0.621371; // Convert kilometers to miles

        setDistanceInfo(`<p> ${distanceKm.toFixed(2)} km (${distanceMiles.toFixed(2)} miles)</p>`);
    };

    return (
        <div className='flex flex-col justify-center items-center text-center w-2/3 mb-20'>
            <h2><strong className='text-2xl'>PLEASE READ:</strong> </h2><h3 className='font-medium text-md'>The miles calculation tool is only displayed here for visual concept. <br />The miles search gives the range of miles in a <strong>straight line</strong>, meaning it does not consider any obstacles such as roads, mountains, route options, etc. Google Maps is capable of giving the accurate miles with roads in consideration - which will be implemented hopefully soon.</h3><br />
    
            <div className='border border-slate-950 border-spacing-9, px-20 pb-20 mt-5'>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'start', alignItems: 'start', marginTop: '14px', }}>
    
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>Origin ZIP Code Lookup</h2>
                        <Input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter Origin ZIP Code" />
                        <Button className='dark-button' onClick={() => lookupZipCode('origin')}>Lookup Origin</Button>
                        <div dangerouslySetInnerHTML={{ __html: originInfo }}></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-bold'>Destination ZIP Code Lookup</h2>
                        <Input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter Destination ZIP Code" />
                        <Button className='dark-button' onClick={() => lookupZipCode('destination')}>Lookup Destination</Button>
                        <div dangerouslySetInnerHTML={{ __html: destinationInfo }}></div>
                    </div>
                </div>
                <div style={{ gap: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '75px' }}>
                    <Button className='dark-button' onClick={calculateDistance}>Calculate Distance</Button>
                    <p className="flex gap-2"><span className='font-bold text-md'>Distance:</span><div dangerouslySetInnerHTML={{ __html: distanceInfo }}></div></p>
                </div>
            </div>
        </div>
    );
};

export default ZipCodeLookup;