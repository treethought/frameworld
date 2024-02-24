"use client";
import {
  CastsResponse,
  CastWithInteractions,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useSWR from "swr";
import axios from "axios";
import { useApp } from "@/context/AppContext";
import Frame from "@/app/components/Frame";
import { useParams } from "next/navigation";

async function fetcher(key: string): Promise<CastsResponse> {
  const { data } = await axios.get<{ resp: CastsResponse }>(
    key,
  );
  return data.resp;
}

function useCast(hash: string, viewer: number | undefined) {
  console.log("FETCH CAST: ", `/api/cast/${hash}?viewer=${viewer}`);
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
  const { fid } = useApp();
  const { resp, error, isLoading } = useCast(hash, fid || undefined);

  if (error) return <div>Failed to load</div>;
  if (!resp) return <div>No cast...</div>;
  if (isLoading) return <div>Loading...</div>;
  const cast = resp?.result.casts[0];

  return (
    <main className="justify-center mx-auto bg-base-100">
      <div className="flex">
        <div className="flex flex-wrap justify-center">
          <div className="p-8">
            <Frame cast={cast} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default FramesFeed;
