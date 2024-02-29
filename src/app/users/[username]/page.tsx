"use client";
import Cast from "@/app/components/Cast";
import CastFeed from "@/app/components/CastFeed";
import UserBio from "@/app/components/UserBio";
import { useApp } from "@/context/AppContext";
import { useUserCasts } from "@/hooks/feed";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";

function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useApp();
  const { profileUser, error } = useUser(username, currentUser?.fid || 0);
  const { userCasts, error: feedError } = useUserCasts(profileUser?.fid);

  if (error) return <div>Failed to load</div>;
  if (feedError) return <div>Failed to load</div>;
  if (!profileUser) return <div>Loading...</div>;

  return (
    <main className="justify-center items-center mx-auto bg-base-100 w-full max-w-screen">
      <div className="flex flex-col w-full max-w-screen overflow-hidden">
        <div className="justify-center ">
          <UserBio user={profileUser} />
        </div>
        <div className="divider" />
        <CastFeed casts={userCasts?.casts} />
      </div>
    </main>
  );
}

export default Profile;
