"use client";
import { FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useSWR from "swr";
import axios from "axios";
import Cast from "../components/Cast";

async function fetcher(key: string): Promise<FeedResponse> {
  const { data } = await axios.get<{ resp: FeedResponse }>(
    key,
  );
  return data.resp;
}

function useFramesFeed() {
  const { data, error, isLoading } = useSWR<FeedResponse, Error>(
    "/api/frames/feed",
    fetcher,
    { refreshInterval: 0 },
  );

  return {
    frames: data as FeedResponse,
    error,
    isLoading,
  };
}

function FramesFeed() {
  const { frames, error, isLoading } = useFramesFeed();

  return (
    <main className="bg-base-100 w-full max-w-screen">
      <div className="flex flex-col items-center w-full max-w-screen overflow-hidden">
        {isLoading
          ? Array.from(
            { length: 10 },
            (_, i) => (
              <div key={i} className="flex skeleton bg-primary min-h-screen md:h-1/3">
                <div className="flex flex-fit flex-wrap justify-center w-full mx-auto">
                  <div className="flex w-full">
                    <div className="card card-compact h-full text-content rounded-box border">
                    </div>
                  </div>
                </div>
              </div>
            ),
          )
          : frames.casts.map((cast, i) => (
            <div key={i} className="flex sm:h-screen md:h-1/3 sm:w-1/2 p-2">
              <Cast cast={cast} frameonly linkPage />
            </div>
          ))}
      </div>
    </main>
  );
}

export default FramesFeed;
