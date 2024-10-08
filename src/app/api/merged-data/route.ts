import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface Dimensions {
    Length: string;
    Width: string | string[];
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
    [key: string]: any; // Allow for additional properties
}

interface CombinedData {
    model: string;
    data: Excavator | any; // Adjust as needed
}

export async function GET(req: NextRequest) {
    try {
        const [veraResponse, caterpillarResponse] = await Promise.all([
            axios.get(`${req.nextUrl.origin}/api/vera-equipment-data`),
            axios.get(`${req.nextUrl.origin}/api/caterpillar-equipment-specs`)
        ]);

        const veraData: Excavator[] = veraResponse.data;
        const caterpillarData: { [key: string]: any } = caterpillarResponse.data;

        // Convert veraData to the combined format
        const combinedData1: CombinedData[] = veraData.map(item => ({
            model: item["Manufacturer/Model"] || 'Unknown Model',
            data: { ...item }
        }));

        // Convert caterpillarData to the combined format
        const combinedData2: CombinedData[] = Object.entries(caterpillarData).map(([model, specs]) => {
            const { "Operating Length - Conveyor Up": length, "Transport Length": transportLength, "Operating Width": width, "Transport Width": transportWidth, "Height - Canopy": height, "Transport Height": transportHeight, ...rest } = specs;
            return {
                model,
                data: {
                    "Manufacturer/Model": model,
                    ...rest,
                    dimensions: {
                        Length: length || transportLength || '',
                        Width: width || transportWidth || '',
                        Height: height || transportHeight || '',
                    }
                }
            };
        });

        // Merge the data
        const mergedData: CombinedData[] = [...combinedData1, ...combinedData2];

        console.log('Merged Data:', mergedData); // Debugging: Log merged data

        return NextResponse.json(mergedData);
    } catch (error) {
        console.error('Error fetching or merging data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}