"use client";
import Cast from "@/app/components/Cast";
import ProfileAvatar from "@/app/components/ProfileAvatar";
import Render from "@/app/components/Util/Render";
import { useApp } from "@/context/AppContext";
import { FeedResponse, User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import axios from "axios";
import { useParams } from "next/navigation";
import useSWR from "swr";

async function userFetcher(key: string): Promise<User> {
  const { data } = await axios.get<{ user: User }>(
    key,
  );
  return data.user;
}

function useUser(username: string, viewer: number) {
  const { data, error, isLoading } = useSWR<User, Error>(
    username ? `/api/user/${username}?viewer=${viewer}` : null,
    userFetcher,
    { refreshInterval: 0 },
  );

  return {
    profileUser: data as User,
    error,
    isLoading,
  };
}

async function feedFetcher(key: string): Promise<FeedResponse> {
  const { data } = await axios.get<{ resp: FeedResponse }>(
    key,
  );
  return data.resp;
}

function useUserCasts(fid: number | undefined) {
  const { data, error, isLoading } = useSWR<FeedResponse, Error>(
    fid ? `/api/feed?fids=${fid}` : null,
    feedFetcher,
    { refreshInterval: 0 },
  );

  return {
    userCasts: data as FeedResponse,
    error,
    isLoading,
  };
}

type UserBioProps = {
  user: User;
};

function UserBio(props: UserBioProps) {
  return (
    <div className="card card-bordered bg-neutral">
      <div className="card-body space-y-0">
        <div className="card-title text-base-content">
          <ProfileAvatar user={props.user} className="w-12 " />
          <div className="flex flex-col items-center space-y-1">
            <h2 className="card-title">{props.user.display_name}</h2>
            <span className="text-sm font-normal ">@{props.user.username}</span>
          </div>
        </div>
        <div className="flex sp">
          <UserStats user={props.user} />
        </div>
        <div className="divider pt-0" />
        <article className="prose text-center">
          <Render text={props.user.profile.bio.text} />
        </article>
      </div>
    </div>
  );
}

function UserStats(props: UserBioProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-1">
        <span className="prose text-sm">Following:</span>
        <span className="prose text-sm">{props.user.following_count}</span>
      </div>
      <div className="flex flex-row space-x-1">
        <span className="prose text-sm">Followers:</span>
        <span className="prose text-sm">{props.user.follower_count}</span>
      </div>
    </div>
  );
}

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
        <div className="flex flex-col flex-fit items-center">
          {userCasts?.casts.map((cast) => (
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

export default Profile;
