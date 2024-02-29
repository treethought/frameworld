import ProfileAvatar from "@/app/components/ProfileAvatar";
import Render from "@/app/components/Util/Render";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

type Props = {
  user: User;
};

function UserBio(props: Props) {
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

function UserStats(props: Props) {
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

export default UserBio;
