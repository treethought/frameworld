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

type Props = {
  cast: CastWithInteractions;
  linkPage?: boolean;
};

function Frame(props: Props) {
  const { signerUuid } = useApp();
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
      signerUuid,
      props.cast.hash,
      action,
    ) as any;
    // resp is actually frame, not FrameActionResponse
    setCurrentFrame(resp as Frame);
  };

  return (
    <div>
      <div className="card card-compact h-full text-primary rounded-box max-w-md border border-gray-50 ">
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
  );
}
export default Frame;
