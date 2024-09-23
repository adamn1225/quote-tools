"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface EquipmentMarket {
    category: string;
    details: {
        title: string;
        price: string;
    };
}

const ValueSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<EquipmentMarket[]>([]);
    const [data, setData] = useState<EquipmentMarket[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/value-search');
                console.log('Fetched data:', response.data); // Debugging: Log fetched data
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const fuse = new Fuse(data, {
            keys: ['details.title', 'category'],
            threshold: 0.3, // Adjust the threshold for more or less fuzzy matching
        });
        const result = fuse.search(query);
        console.log('Search results:', result); // Debugging: Log search results
        setResults(result.map(r => r.item));
    };

    const handleClearSearch = () => {
        setQuery('');
        setResults([]);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Equipment Value Search/Directory</h1>
            <div className='flex gap-4 w-full justify-center'>
                <div className="relative mb-4 w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-950" />
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title or category..."
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex gap-4 mb-4 justify-center">
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={handleClearSearch} variant="outline">Clear</Button>
            </div>
            <ul className="flex flex-col justify-center items-center gap-4 w-full">
                {results.map((result, index) => (
                    <div key={index} className='flex flex-col gap-4 w-2/3 justify-evenly items-center bg-stone-50 border border-gray-800 p-4 h-auto'>
                        <div className='grid grid-cols-1 justify-items-start'>
                            <li className="font-bold cursor-pointer border-b border-gray-500" onClick={() => toggleExpand(index)}>
                                {result.details.title}
                            </li>
                        </div>
                        {expandedIndex === index && (
                            <div className="flex flex-col gap-1">
                                <li className="font-bold border-b border-gray-400">Category: {result.category}</li>
                                <li className="font-bold border-b border-gray-400">Price: {result.details.price}</li>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ValueSearch;