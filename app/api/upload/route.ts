import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

/**
 * Generate a signed upload signature for Cloudinary direct client-side uploads.
 * Prevents CLOUDINARY_API_SECRET leak.
 */
export async function POST(request: Request) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    // If keys aren't set up yet, fallback to dummy signature for preview testing
    return NextResponse.json({
      signature: "dummy-signature-123456",
      timestamp: Math.round(new Date().getTime() / 1000),
      apiKey: "dummy-api-key",
      cloudName: "dummy-cloud-name",
      fallback: true,
    });
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "aevian_homework";

    // Alphabetically sorted parameters to sign
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    // SHA-1 hash concatenated with apiSecret
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate upload signature" }, { status: 500 });
  }
}
