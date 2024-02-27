import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Link from "next/link";

type Props = {
  user: User;
  link?: boolean;
  className?: string;
};

export default function ProfileAvatar(props: Props) {
  if (!props.user) {
    return null;
  }
  return (
    <div className="avatar">
      <div className={`w-12 rounded-full ${props.className}`}>
        {props.link
          ? (
            <Link href={`/users/${props.user.username}`} passHref>
              <img
                src={props.user?.pfp_url}
                alt={props.user?.display_name}
                className="rounded-full"
              />
            </Link>
          )
          : (
            <img
              src={props.user.pfp_url}
              alt={props.user.display_name}
              className="rounded-full"
            />
          )}
      </div>
    </div>
  );
}
