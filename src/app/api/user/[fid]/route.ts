import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export async function GET(
  req: NextRequest,
  { params }: { params: { fid: string } },
) {
  try {
    console.log("GET /api/user/[fid] params", params);
    const fid = parseInt(params.fid);
    const resp = await client.fetchBulkUsers([fid], {});
    if (resp.users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const u: User = resp.users[0];
    return NextResponse.json({ user: u }, { status: 200 });
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
