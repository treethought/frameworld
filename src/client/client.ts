// import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { NeynarV2APIClient } from "@neynar/nodejs-sdk/build/neynar-api/v2";

const client = new NeynarV2APIClient(process.env.NEXT_PUBLIC_NEYNAR_API_KEY!);

export default client;
