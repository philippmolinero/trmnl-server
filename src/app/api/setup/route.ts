import { NextRequest, NextResponse } from "next/server";

function buildSetupResponse(request: NextRequest) {
  const baseUrl = getBaseUrl(request);
  return {
    status: 200,
    api_key: "trmnl-byos-api-key",
    friendly_id: "BYOS01",
    image_url: `${baseUrl}/api/image`,
    filename: "setup-complete",
  };
}

// GET /api/setup - Some firmware versions use GET
export async function GET(request: NextRequest) {
  console.log("Setup GET request received");
  return NextResponse.json(buildSetupResponse(request));
}

// POST /api/setup - Device registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    console.log("Setup POST request:", body);
  } catch {
    // Body parsing failed, continue anyway
  }

  return NextResponse.json(buildSetupResponse(request));
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
