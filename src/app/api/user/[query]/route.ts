import { NextRequest, NextResponse } from "next/server";
import client from "@/client/client";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export async function GET(
  req: NextRequest,
  { params }: { params: { query: string } },
) {
  const { searchParams } = new URL(req.url);
  let v = searchParams.get("viewer");
  try {
    console.log("GET /api/user/[query] params", params);

    let query: string | number = params.query;
    if (!isNaN(parseInt(query))) {
      query = parseInt(query);
    }

    if (typeof query === "number") {
      console.log("query is number", query);
      const resp = await client.fetchBulkUsers([query], {
        viewerFid: v ? parseInt(v) : undefined,
      });
      if (resp.users.length === 0) {
        return NextResponse.json({ message: "User not found" }, {
          status: 404,
        });
      }
      const u: User = resp.users[0];
      return NextResponse.json({ user: u }, { status: 200 });
    } else {
      if (!v) {
        console.log("viewer is required");
        return NextResponse.json({ message: "viewer is required" }, {
          status: 400,
        });
      }
      let viewer = parseInt(v);
      console.log("query is username", query);
      return getByUsername(params.query, viewer);
    }
  } catch (e) {
    console.log("ERROR: /api/user/[query] GET", e);
    if (isApiErrorResponse(e)) {
      return NextResponse.json(e, { status: e.status });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, {
        status: 500,
      });
    }
  }
}

async function getByUsername(username: string, viewer: number) {
  console.log("getByUsername", username, viewer);
  const resp = await client.searchUser(username, viewer);
  if (resp.result.users.length === 0) {
    console.log("User not found");
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const u: User = resp.result.users[0];
  if (u.username !== username) {
    console.log("User not matching");
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  console.log("User found", u);
  return NextResponse.json({ user: u }, { status: 200 });
}
