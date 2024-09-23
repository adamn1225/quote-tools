import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface EquipmentMarket {
    category: string;
    details: {
        title: string;
        price: string;
    };
}

export async function GET(req: NextRequest) {
    try {
        const jsonFilePath = path.join(process.cwd(), 'public', 'equipment-value.json');
        console.log('Reading JSON file from:', jsonFilePath); // Debugging: Log file path
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const rawData: [string, { title: string; price: string }][] = JSON.parse(jsonData);
        console.log('Parsed JSON data:', rawData); // Debugging: Log parsed JSON data

        // Transform the data into a serializable format
        const data: EquipmentMarket[] = rawData.map(([category, details]) => ({
            category,
            details
        }));

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}