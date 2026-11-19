// Cloudflare Pages Function: 100% Direct Cloudflare Edge KV Streaming
// ZERO GitHub dependency - 100% Hosted and streamed from Cloudflare Edge 24/7

const MANIFEST = {
  "NitroVPN_Setup.exe": {
    totalSize: 46766080,
    parts: 5,
    contentType: "application/vnd.microsoft.portable-executable"
  },
  "NitroVPN_Windows.zip": {
    totalSize: 46685340,
    parts: 5,
    contentType: "application/zip"
  },
  "NitroVPN_Release.apk": {
    totalSize: 108793668,
    parts: 11,
    contentType: "application/vnd.android.package-archive"
  }
};

export async function onRequest(context) {
  const { file } = context.params;
  const validFiles = ['NitroVPN_Setup.exe', 'NitroVPN_Windows.zip', 'NitroVPN_Release.apk', 'NitroVPN.apk'];

  if (!file || !validFiles.includes(file)) {
    return new Response('File not found', { status: 404 });
  }

  const fileKey = (file === 'NitroVPN.apk') ? 'NitroVPN_Release.apk' : file;
  const meta = MANIFEST[fileKey];

  if (!meta) {
    return new Response('Asset metadata not found', { status: 404 });
  }

  if (!context.env || !context.env.NITRO_KV) {
    return new Response('Cloudflare Edge KV storage binding unavailable', { status: 503 });
  }

  const headers = new Headers();
  headers.set('Content-Type', meta.contentType);
  headers.set('Content-Length', meta.totalSize.toString());
  headers.set('Content-Disposition', `attachment; filename="${file}"`);
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('X-Edge-Storage', 'Cloudflare-KV-Dedicated-Edge');

  const { readable, writable } = new TransformStream();

  // Stream each 10MB chunk sequentially directly from Cloudflare Edge KV
  (async () => {
    const writer = writable.getWriter();
    try {
      for (let i = 0; i < meta.parts; i++) {
        const chunkKey = `${fileKey}_part${i}`;
        const buf = await context.env.NITRO_KV.get(chunkKey, { type: 'arrayBuffer' });
        if (!buf) {
          throw new Error(`Chunk ${chunkKey} missing from KV edge store`);
        }
        await writer.write(new Uint8Array(buf));
      }
      await writer.close();
    } catch (err) {
      console.error('KV streaming error:', err);
      try {
        await writer.abort(err);
      } catch (_) {}
    }
  })();

  return new Response(readable, {
    status: 200,
    headers: headers
  });
}
