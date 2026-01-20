import { NextRequest, NextResponse } from "next/server";

// GET /api/display - Returns the current image to display
// The TRMNL device calls this endpoint periodically to get the next image
export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request);
  const filename = new Date().toISOString();

  // Return response in the exact format TRMNL firmware expects
  return NextResponse.json({
    status: 0,
    image_url: `${baseUrl}/api/image`,
    filename: filename,
    update_firmware: false,
    firmware_url: null,
    refresh_rate: "900", // Must be a string
    reset_firmware: false,
  });
}

// POST /api/display - Alternative method some firmware versions use
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Display request body:", body);
  } catch {
    // Body might be empty, that's fine
  }

  const baseUrl = getBaseUrl(request);
  const filename = new Date().toISOString();

  return NextResponse.json({
    status: 0,
    image_url: `${baseUrl}/api/image`,
    filename: filename,
    update_firmware: false,
    firmware_url: null,
    refresh_rate: "900",
    reset_firmware: false,
  });
}

function getBaseUrl(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
