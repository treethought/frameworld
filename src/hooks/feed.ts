import { FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import axios from "axios";
import useSWR from "swr";

async function feedFetcher(key: string): Promise<FeedResponse> {
  const { data } = await axios.get<{ resp: FeedResponse }>(
    key,
  );
  return data.resp;
}

export function useUserCasts(fid: number | undefined) {
  const { data, error, isLoading } = useSWR<FeedResponse, Error>(
    fid ? `/api/user/casts?fids=${fid}` : null,
    feedFetcher,
    { refreshInterval: 0 },
  );

  return {
    userCasts: data as FeedResponse,
    error,
    isLoading,
  };
}

export function useFeed(fid: number | undefined) {
  const { data, error, isLoading } = useSWR<FeedResponse, Error>(
    fid ? `/api/feed/${fid}` : null,
    feedFetcher,
    { refreshInterval: 0 },
  );

  return {
    feed: data as FeedResponse,
    error,
    isLoading,
  };
}
