import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export async function GET(
  req: NextRequest,
  { params }: { params: { fid: number } },
) {
  console.log(req.method, req.url);
  if (!params.fid) {
    return NextResponse.json({ message: "fid is required" }, { status: 400 });
  }
  try {
    const resp = await client.fetchFeed("following", {
      fid: params.fid,
      limit: 50,
    });
    return NextResponse.json({ resp: resp }, { status: 200 });
  } catch (e) {
    if (isApiErrorResponse(e)) {
      return NextResponse.json(e, { status: e.status });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, {
        status: 500,
      });
    }
  }
}
