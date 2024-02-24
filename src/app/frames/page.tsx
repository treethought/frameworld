"use client";
import { FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useSWR, { Fetcher } from "swr";
import axios, { AxiosError } from "axios";
import Frame from "../components/Frame";

async function fetcher(key: string): Promise<FeedResponse> {
  const { data } = await axios.get<{ resp: FeedResponse }>(
    key,
  );
  return data.resp;
}

function useFramesFeed() {
  const { data, error } = useSWR<FeedResponse, Error>(
    "/api/frames/feed",
    fetcher,
    { refreshInterval: 0 },
  );

  return {
    frames: data as FeedResponse,
    error,
    // isLoading,
  };
}

function FramesFeed() {
  const { frames, error } = useFramesFeed();

  if (error) return <div>Failed to load</div>;
  if (!frames) return <div>Loading...</div>;
  frames.casts;

  return (
    <main className="justify-center items-center mx-auto bg-base-100">
      <div className="flex">
        <div className="flex flex-wrap justify-evenly">
          {frames.casts.map((cast, i) => (
            <div key={i} className="p-8">
              <Frame cast={cast} linkPage />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default FramesFeed;
