"use client";
import Cast from "@/app/components/Cast";
import { useApp } from "@/context/AppContext";
import { useFeed, useUserCasts } from "@/hooks/feed";

function Feed() {
  const { user: currentUser } = useApp();
  const { feed, error } = useFeed(currentUser?.fid);

  if (error) return <div>Failed to load</div>;
  if (!currentUser) return <div>Loading...</div>;

  return (
    <main className="justify-center items-center mx-auto bg-base-100 w-full max-w-screen">
      <div className="flex flex-col w-full max-w-screen overflow-hidden">
        <div className="flex flex-col flex-fit items-center">
          {feed?.casts.map((cast) => (
            <div
              key={cast.hash}
              className="flex sm:h-screen md:h-1/3 sm:w-1/2 p-2"
            >
              <Cast cast={cast} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Feed;
