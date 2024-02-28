"use client";
import { CastsResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useSWR from "swr";
import axios from "axios";
import { useApp } from "@/context/AppContext";
import Frame from "@/app/components/Frame";
import { useParams } from "next/navigation";
import Cast from "@/app/components/Cast";

async function fetcher(key: string): Promise<CastsResponse> {
  const { data } = await axios.get<{ resp: CastsResponse }>(
    key,
  );
  return data.resp;
}

function useCast(hash: string, viewer: number | undefined) {
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

function FramesFeed() {
  const { hash } = useParams<{ hash: string }>();
  const { user } = useApp();
  const { resp, error, isLoading } = useCast(hash, user?.fid || undefined);

  if (error) return <div>Failed to load</div>;
  if (!resp) return <div>No cast...</div>;
  if (isLoading) return <div>Loading...</div>;
  const cast = resp?.result.casts[0];

  return (
    <main className="justify-center items-center mx-auto bg-base-100 w-full max-w-screen">
      <div className="flex flex-col w-full max-w-screen overflow-hidden p-8">
        <Cast cast={cast} />
      </div>
    </main>
  );
}

export default FramesFeed;
