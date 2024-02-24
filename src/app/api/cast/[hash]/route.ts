import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export async function GET(
  req: NextRequest,
  { params }: { params: { hash: string } },
) {
  const { searchParams } = new URL(req.url);
  try {
    let v = searchParams.get("viewer");
    let viewer;
    if (v) {
      viewer = parseInt(v);
    }
    console.log("CAST HASH: ", params.hash);
    console.log("GET /api/cast/[hash] params", params);
    const resp = await client.fetchBulkCasts([params.hash], {
      viewerFid: viewer,
    });

    if (resp.result.casts.length === 0) {
      return NextResponse.json({ message: "Cast not found" }, { status: 404 });
    }
    return NextResponse.json({ resp: resp }, { status: 200 });
  } catch (e) {
    console.log("/api/cast/[hash] GET", e);
    if (isApiErrorResponse(e)) {
      return NextResponse.json({ ...e.response.data }, {
        status: e.response.status,
      });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, {
        status: 500,
      });
    }
  }
}
