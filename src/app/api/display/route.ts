import { NextRequest, NextResponse } from "next/server";

// GET /api/display - Returns the current image to display
// The TRMNL device calls this endpoint periodically to get the next image
export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request);

  // Return dynamically generated image
  return NextResponse.json({
    image_url: `${baseUrl}/api/image`,
    refresh_rate: 900, // 15 minutes in seconds
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

  return NextResponse.json({
    image_url: `${baseUrl}/api/image`,
    refresh_rate: 900,
    reset_firmware: false,
  });
}

function getBaseUrl(request: NextRequest): string {
  // Check for forwarded headers (when behind proxy/Vercel)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
