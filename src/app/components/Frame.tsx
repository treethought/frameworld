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

type Props = {
  cast: CastWithInteractions;
  frame: Frame;
  linkPage?: boolean;
  details?: boolean;
};

function Frame(props: Props) {
  const { userInfo } = useApp();
  const [currentFrame, setCurrentFrame] = useState<Frame | undefined>(
    props.frame,
  );
  if (!currentFrame) {
    return <></>;
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
    <div className="card card-compact h-full text-content rounded-box border">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          {props.details && (
            <div className="card-title text-sm items-start w-full whitespace-nowrap text-ellipsis overflow-hidden ">
              <div className="flex items-center justify-start w-full">
                <ProfileAvatar user={props.cast.author} link />
                <div className="flex flex-col px-2">
                  <Link
                    href={`/users/${props.cast.author.username}`}
                    passHref
                  >
                    <span className="cursor-pointer max-w-2 hover:text-accent-focus">
                      {props.cast.author.display_name}
                    </span>
                  </Link>
                  <Link
                    href={`/users/${props.cast.author.username}`}
                    passHref
                  >
                    <span className="text-sm font-normal ">
                      @{props.cast.author.username}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
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
  );
}

export default Frame;
