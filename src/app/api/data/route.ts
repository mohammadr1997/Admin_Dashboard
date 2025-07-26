import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db.json");

    const fileData = readFileSync(filePath, "utf-8");
    const statistics = JSON.parse(fileData);
    return NextResponse.json({
      message: "file is successfully fetched",
      data: statistics,
    });
  } catch (error) {
    return NextResponse.json({
      message: "file can not be fetched",
      error: error.message,
      status: 500,
    });
  }
}
