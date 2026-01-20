export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TRMNL Server</h1>

      <p className="text-gray-600 mb-8">
        Custom BYOS (Bring Your Own Server) for TRMNL e-ink display.
      </p>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Endpoints</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <code className="bg-gray-100 px-1 rounded">POST /api/setup</code>{" "}
              - Device registration
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">GET /api/display</code>{" "}
              - Get current image URL
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">GET /api/image</code> -
              Generated display image
            </li>
          </ul>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Preview</h2>
          <a
            href="/api/image"
            className="text-blue-600 hover:underline text-sm"
          >
            View current display image →
          </a>
        </div>
      </div>
    </main>
  );
}
