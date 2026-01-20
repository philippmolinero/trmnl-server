import { NextRequest, NextResponse } from "next/server";

// POST /api/setup - Device registration
// Called when the TRMNL device first connects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Device setup request:", body);

    const baseUrl = getBaseUrl(request);

    // Return response in the exact format TRMNL firmware expects
    return NextResponse.json({
      status: 200,
      api_key: "trmnl-byos-api-key",
      friendly_id: "BYOS01",
      image_url: `${baseUrl}/api/image`,
      filename: "setup-complete",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({
      status: 404,
      api_key: null,
      friendly_id: null,
      image_url: null,
      filename: null,
    });
  }
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
