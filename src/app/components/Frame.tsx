import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Link from "next/link";

type Props = {
  frame: CastWithInteractions;
};

function Frame(props: Props) {
  const f = props.frame.frames?.[0];

  return (
    <div className="card card-compact h-full text-primary rounded-box max-w-md border border-gray-50 ">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <h6 className="card-title text-sm items-start w-full whitespace-nowrap text-ellipsis overflow-hidden ">
            <Link href={`/casts/${props.frame.hash}`} className="w-2">
              <span className="cursor-pointer max-w-2 hover:text-accent-focus">
                {props.frame.author.display_name}
              </span>
            </Link>
          </h6>
          <div className=" text-sm">{props.frame.author.username}</div>
        </div>
        <figure className="h-full">
          <Link href={`/users/${props.frame.author.username}`}>
            <img
              loading="lazy"
              src={f?.image}
              alt={f?.frames_url}
              className="h-full w-full object-cover rounded-box"
            />
          </Link>
        </figure>
        <div className="card-actions justify-around">
          {f?.buttons?.map((b, i) => (
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
