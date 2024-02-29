import { CastsResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useSWR from "swr";
import axios from "axios";

async function fetcher(key: string): Promise<CastsResponse> {
  const { data } = await axios.get<{ resp: CastsResponse }>(
    key,
  );
  return data.resp;
}

export default function useCast(hash: string, viewer: number | undefined) {
  const { data, error, isLoading } = useSWR<CastsResponse, Error>(
    `/api/cast/${hash}?viewer=${viewer}`,
    fetcher,
    { refreshInterval: 0 },
  );

  return {
    resp: data,
    error,
    isLoading,
  };
}
