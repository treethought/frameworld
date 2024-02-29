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
            { length: 1 },
            (_, i) => (
              <div
                key={i}
                className="flex sm:h-screen md:h-1/3 sm:w-1/2 p-2 skeleton border-red bg-primary h-96"
              >
                <div className="card card-compact h-full text-primary rounded-box max-w-md border h-96">
                  <h6 className="card-title text-sm w-full whitespace-nowrap text-ellipsis overflow-hidden " />
                  <div className="divider" />
                  <div className="card-body skeleton" />
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
