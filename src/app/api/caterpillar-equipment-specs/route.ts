import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
    try {
        const jsonFilePath = path.join(process.cwd(), 'public', 'caterpillar_equipment_specs.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data: { [key: string]: any } = JSON.parse(jsonData);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}