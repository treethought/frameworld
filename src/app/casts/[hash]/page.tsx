"use client";
import { useApp } from "@/context/AppContext";
import { useParams } from "next/navigation";
import Cast from "@/app/components/Cast";
import useCast from "@/hooks/useCast";

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
