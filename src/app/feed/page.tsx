'use client';
import { useApp } from "@/context/AppContext";
import { useFeed } from "@/hooks/feed";
import CastFeed from "../components/CastFeed";

function Feed() {
  const { user: currentUser } = useApp();
  const { feed, error } = useFeed(currentUser?.fid);

  if (error) return <div>Failed to load</div>;
  if (!currentUser) return <div>Loading...</div>;
  if (!feed) return <div>Loading...</div>;

  return <CastFeed casts={feed.casts} />;
}

export default Feed;
