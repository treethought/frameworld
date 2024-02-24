import {
  CastWithInteractions,
  Frame,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Link from "next/link";
import { useState } from "react";

type Props = {
  cast: CastWithInteractions;
  linkPage?: boolean;
};

function Frame(props: Props) {
  const [frame, setFrame] = useState<Frame | undefined>(
    props.cast?.frames?.[0],
  );
  const [image, setImage] = useState<string>(frame?.image || "");
  if (!props.cast || !props.cast.frames) {
    return <div>No frames...</div>;
  }

  return (
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
          {props.linkPage && (
            <div>
              <Link href={`/casts/${props?.cast?.hash}`}>View</Link>
            </div>
          )}

          <Link href={`/users/${props.cast.author.username}`}>
            <div className=" text-sm">{props.cast.author.username}</div>
          </Link>
        </div>
        <figure className="h-full">
          <Link
            href={props.linkPage
              ? `/casts/${props.cast.hash}`
              : frame?.frames_url || `#`}
          >
            <img
              loading="lazy"
              src={image}
              alt={"frame image"}
              className="h-full w-full object-cover rounded-box"
            />
          </Link>
        </figure>
        <div className="card-actions justify-around">
          {frame?.buttons?.map((b, i) => (
            <button key={i} className="btn btn-outline">
              {b.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Frame;
