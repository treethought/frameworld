"use client";
import ProfileAvatar from "@/app/components/ProfileAvatar";
import Render from "@/app/components/Util/Render";
import { useApp } from "@/context/AppContext";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import axios from "axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
//
async function fetcher(key: string): Promise<User> {
  const { data } = await axios.get<{ user: User }>(
    key,
  );
  return data.user;
}
//
function useUser(username: string, viewer: number) {
  if (!username) return { profileUser: null, error: null };
  const { data, error } = useSWR<User, Error>(
    `/api/user/${username}?viewer=${viewer}`,
    fetcher,
    { refreshInterval: 0 },
  );

  return {
    profileUser: data as User,
    error,
  };
}

type UserBioProps = {
  user: User;
};

function UserBio(props: UserBioProps) {
  return (
    <div className="card card-bordered">
      <div className="card-body">
        <div className="card-title text-base-content">
          <ProfileAvatar user={props.user} className="w-12 " />
          <div className="flex flex-col items-center space-y-1">
            <h2 className="card-title">{props.user.display_name}</h2>
            <span className="text-sm font-normal ">@{props.user.username}</span>
          </div>
        </div>
        <div className="divider" />
        <article className="prose text-center">
          <Render text={props.user.profile.bio.text} />
        </article>
      </div>
    </div>
  );
}

function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useApp();
  const { profileUser, error } = useUser(username, currentUser?.fid || 0);

  if (error) return <div>Failed to load</div>;
  if (!profileUser) return <div>Loading...</div>;

  return (
    <main className="justify-center items-center mx-auto bg-base-100">
      <div className="flex">
        <div className="flex flex-wrap justify-evenly">
          <div className="p-8">
            <UserBio user={profileUser} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
