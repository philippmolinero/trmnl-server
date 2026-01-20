import { NextRequest, NextResponse } from "next/server";

// POST /api/setup - Device registration
// Called when the TRMNL device first connects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Device setup request:", body);

    // Return a simple response that the device expects
    // The device sends its MAC address and we return an API key
    return NextResponse.json({
      api_key: "test-api-key-12345",
      friendly_id: "TRMNL-001",
      image_url: `${getBaseUrl(request)}/api/image`,
      message: "Device registered successfully",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Setup failed" },
      { status: 500 }
    );
  }
}

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
