import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export async function GET(
  _req: NextRequest,
  { params }: { params: { fid: string } },
) {
  try {
    const fid = parseInt(params.fid);
    const resp = await client.lookupUserByFid(fid);
    return NextResponse.json(resp.result.user);
  } catch (e) {
    console.log("/api/user/[fid] GET", e);
    if (isApiErrorResponse(e)) {
      return NextResponse.json(e, { status: e.status });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, {
        status: 500,
      });
    }
  }
}
