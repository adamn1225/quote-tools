// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface Dimensions {
    Length: string;
    Width: string | string[];
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
}

interface ExcavatorData {
    [key: string]: Excavator[];
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query') || '';

        // Log the query
        console.log('Query:', query);

        // Read the JSON file
        const jsonFilePath = path.join(process.cwd(), 'public', 'vera-equipment-data.json');
        console.log('Reading JSON file from:', jsonFilePath);
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data: ExcavatorData = JSON.parse(jsonData);

        // Ensure data is an object
        if (typeof data !== 'object' || data === null) {
            console.error('Invalid data format: data is not an object');
            return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
        }

        // Filter the data based on the query
        const filteredData: Excavator[] = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const excavators = data[key];
                const matchedExcavators = excavators.filter(excavator =>
                    excavator["Manufacturer/Model"].toLowerCase().includes(query.toLowerCase())
                );
                filteredData.push(...matchedExcavators);
            }
        }

        // Return the filtered data
        return NextResponse.json(filteredData, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}