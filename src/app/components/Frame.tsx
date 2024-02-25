"use client";
import client from "@/client/client";
import { useApp } from "@/context/AppContext";
import {
  CastWithInteractions,
  Frame,
  FrameAction,
  FrameActionButton,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Link from "next/link";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { CommentIcon, LikeIcon, RespostIcon } from "./Util/Icons";
import Render from "./Util/Render";

type Props = {
  cast: CastWithInteractions;
  linkPage?: boolean;
  details?: boolean;
};

function Frame(props: Props) {
  const { userInfo } = useApp();
  const [currentFrame, setCurrentFrame] = useState<Frame | undefined>(
    props.cast?.frames?.[0],
  );
  if (!currentFrame) {
    return <div>No frames...</div>;
  }

  const doPost = async (b: FrameActionButton) => {
    const action: FrameAction = {
      button: b,
      post_url: currentFrame?.post_url!,
      frames_url: currentFrame?.frames_url!,
    };
    const resp = await client.postFrameAction(
      userInfo?.signerUuid!,
      props.cast.hash,
      action,
    ) as any;
    // resp is actually frame, not FrameActionResponse
    setCurrentFrame(resp as Frame);
  };

  return (
    <div className="flex flex-wrap justify-center w-full mx-auto">
      <div className={"flex w-1/2" + props.details ? "w-1/2" : "w-full"}>
        <div className="card card-compact h-full text-content rounded-box border">
          <div className="card-body">
            <div className="flex flex-row justify-between">
              <h6 className="card-title text-sm items-start w-full whitespace-nowrap text-ellipsis overflow-hidden ">
                <Link href={`/casts/${props.cast.hash}`} className="w-2">
                  <span className="cursor-pointer max-w-2 hover:text-accent-focus">
                    {props.cast.author.display_name}
                  </span>
                </Link>
              </h6>

              <Link href={`/users/${props.cast.author.username}`}>
                <div className=" text-sm">{props.cast.author.username}</div>
              </Link>
            </div>
            <figure className="h-full">
              <Link
                href={props.linkPage
                  ? `/casts/${props.cast.hash}`
                  : currentFrame?.frames_url || `#`}
              >
                <img
                  loading="lazy"
                  src={currentFrame?.image}
                  alt={currentFrame?.image}
                  className="h-full w-full object-cover rounded-box"
                />
              </Link>
            </figure>
            <div className="card-actions justify-around">
              {currentFrame?.buttons?.map((b, i) => (
                <button
                  key={i}
                  className="btn btn-outline"
                  onClick={() => doPost(b)}
                >
                  {b.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {props.details && (
        <div className="flex">
          <CastDetails cast={props.cast} />
        </div>
      )}
    </div>
  );
}

type castDetailsProps = {
  cast: CastWithInteractions;
};

function CastDetails(props: castDetailsProps) {
  return (
    <div className="card card-compact h-full text-primary rounded-box max-w-md border">
      <h6 className="card-title text-md w-full whitespace-nowrap text-ellipsis overflow-hidden ">
        <div className="flex items-center justify-between w-full px-4 pb-0">
          <ProfileAvatar user={props.cast.author} />
          <Link href={`/casts/${props.cast.hash}`} className="flex ">
            <span className="prose cursor-pointer hover:text-accent-focus">
              @{props.cast.author.username}
            </span>
          </Link>
          <Link href={`/users/${props.cast.author.username}`}>
            <span className=" text-sm">{props.cast.author.username}</span>
          </Link>
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

export default Frame;
