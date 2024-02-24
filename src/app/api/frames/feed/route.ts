import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export async function GET(
  _req: NextRequest,
  { params }: { params: { fid: string } },
) {
  try {
    console.log("GET /api/frames/feed", params);
    const resp = await client.fetchFramesOnlyFeed({
      limit: 10,
    });
    return NextResponse.json({ resp: resp }, { status: 200 });
  } catch (e) {
    console.log("/api/frames/feed GET", e);
    if (isApiErrorResponse(e)) {
      return NextResponse.json(e, { status: e.status });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, {
        status: 500,
      });
    }
  }
}
