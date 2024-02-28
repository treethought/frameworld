import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Frame from "./Frame";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import Render from "./Util/Render";
import { CommentIcon, LikeIcon, RespostIcon } from "./Util/Icons";

type CastProps = {
  cast: CastWithInteractions;
  frameonly?: boolean;
  linkPage?: boolean;
};

export function Cast(props: CastProps) {
  return (
    <div className="flex flex-fit flex-wrap justify-center w-full mx-auto">
      {props.cast.frames?.map((frame, i) => (
        <div
          key={`${props.cast.hash}-${i}`}
          // className={"flex w-1/2" + !props.frameonly ? "w-1/2" : "w-full"}
          className="flex max-w-1/2"
        >
          <Frame cast={props.cast} frame={frame} linkPage={props.linkPage} />
        </div>
      ))}
      {!props.frameonly && (
        <div // className={"flex w-1/2" + !props.frameonly ? "w-1/2" : "w-full"}
          className="flex">
          <CastDetails cast={props.cast} />
        </div>
      )}
    </div>
  );
}

type castDetailsProps = {
  cast: CastWithInteractions;
};

export function CastDetails(props: castDetailsProps) {
  return (
    <div className="card card-compact h-full text-primary rounded-box max-w-md border">
      <h6 className="card-title text-md w-full whitespace-nowrap text-ellipsis overflow-hidden ">
        <div className="flex items-start justify-start w-full">
          <div className="p-2">
            <ProfileAvatar user={props.cast.author} link />
          </div>

          <div className="flex flex-col items-center">
            <Link
              href={`/users/${props.cast.author.username}`}
            >
              <span className="prose text-md cursor-pointer hover:text-accent-focus">
                {props.cast.author.display_name}
              </span>
            </Link>
            <Link href={`/users/${props.cast.author.username}`}>
              <span className=" text-xs">@{props.cast.author.username}</span>
            </Link>
          </div>
        </div>
      </h6>
      <div className="divider" />
      <div className="card-body">
        <article className="prose">
          <Render text={props.cast.text} />
        </article>
      </div>
      <div className="card-actions justify-center">
        <CastInteractions cast={props.cast} />
      </div>
    </div>
  );
}

function CastInteractions(props: { cast: CastWithInteractions }) {
  return (
    <>
      <button className="btn btn-ghost btn-sm gap-2 normal-case ">
        <CommentIcon />
        <span className="text-xs">
          {JSON.stringify(props.cast.replies.count)}
        </span>
      </button>
      <button className="btn btn-ghost btn-sm gap-2 normal-case ">
        <RespostIcon />
        <span className="text-xs">
          {JSON.stringify(props.cast.reactions.recasts.length)}
        </span>
      </button>
      <button className="btn btn-ghost btn-sm gap-2 normal-case ">
        <LikeIcon />
        <span className="text-xs">
          {JSON.stringify(props.cast.reactions.likes.length)}
        </span>
      </button>
    </>
  );
}

export default Cast;
