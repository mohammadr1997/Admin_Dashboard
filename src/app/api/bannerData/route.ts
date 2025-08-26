import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fileData = path.join(process.cwd(), 'db.json');
    const data = await readFile(fileData, 'utf-8');
    const currentData = JSON.parse(data);
    if (currentData && currentData.banners) {
      if (Array.isArray(body)) {
        currentData.banners = body;
      } else {
        currentData.banners.push(body);
      }

      await writeFile(fileData, JSON.stringify(currentData, null, 2), 'utf-8');
    }
    return NextResponse.json({
      message: 'successfully read file',
      data: currentData.banners,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'failed to read file',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const file = await readFile(filePath, 'utf-8');
    const fileData = JSON.parse(file);
    if (fileData) {
      return NextResponse.json({
        message: 'Banners are fully Got',
        data: fileData.banners,
      });
    }
  } catch (err: unknown) {
    let errorMessage = 'Unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
