import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export async function GET(
  req: NextRequest,
) {
  const { searchParams } = new URL(req.url);
  try {
    console.log("GET /api/frames/feed");
    const fids = searchParams.get("fids")?.split(",").map((fid) =>
      parseInt(fid)
    );
    console.log("fids", fids);
    const resp = await client.fetchFeed("filter", {
      filterType: "fids",
      fids: fids,
      limit: 50,
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
