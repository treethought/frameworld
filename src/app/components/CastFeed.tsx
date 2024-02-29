import Cast from "@/app/components/Cast";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";

type Props = {
  casts: CastWithInteractions[];
};

function CastFeed(props: Props) {
  return (
    <div className="flex flex-col flex-fit items-center">
      {props.casts?.map((cast) => (
        <div
          key={cast.hash}
          className="flex sm:h-screen md:h-1/3 sm:w-1/2 p-2"
        >
          <Cast cast={cast} />
        </div>
      ))}
    </div>
  );
}

export default CastFeed;
