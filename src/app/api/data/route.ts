import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'db.json');
export async function GET() {
  try {
    const fileData = readFileSync(filePath, 'utf-8');
    const statistics = JSON.parse(fileData);
    return NextResponse.json({
      message: 'file is successfully fetched',
      data: statistics,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'file can not be fetched',
      error: error.message,
      status: 500,
    });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fileData = await readFile(filePath, 'utf-8');
    const currentData = JSON.parse(fileData);

    // // Make sure currentData is an array
    // const updatedData = Array.isArray(currentData) ? [...currentData] : [];

    // Add new data (array or single object)
    if (Array.isArray(body)) {
      currentData.products = body;
    } else {
      currentData.products.push(body);
    }

    // Write back to file
    await writeFile(filePath, JSON.stringify(currentData, null, 2), 'utf-8');

    return NextResponse.json({
      message: 'Data successfully written to db.json',
      data: currentData.products,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Failed to write to file',
      error: error.message,
      status: 500,
    });
  }
}
