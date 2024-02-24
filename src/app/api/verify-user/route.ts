import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { signerUuid, fid } = await req.json() as {
    signerUuid: string;
    fid: number;
  };

  let isVerifiedUser = false;
  try {
    const { fid: userFid } = await client.lookupSigner(signerUuid);
    if (fid === userFid) {
      isVerifiedUser = true;
    } else {
      isVerifiedUser = false;
    }
    return NextResponse.json({ isVerifiedUser }, { status: 200 });
  } catch (err) {
    console.log("/api/verify-user POST", err);
    if (isApiErrorResponse(err)) {
      return NextResponse.json(
        { ...err.response.data },
        { status: err.response.status },
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  }
}
