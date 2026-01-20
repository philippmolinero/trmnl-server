import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// TRMNL display dimensions
const WIDTH = 800;
const HEIGHT = 480;

export async function GET() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  });
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Berlin",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          color: "black",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 40,
            color: "#666",
          }}
        >
          TRMNL Connected
        </div>

        {/* Time */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {timeString}
        </div>

        {/* Date */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            marginTop: 20,
            color: "#333",
          }}
        >
          {dateString}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "#999",
          }}
        >
          Custom server running on Vercel
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}
