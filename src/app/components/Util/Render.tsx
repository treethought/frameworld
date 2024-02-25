import Link from "next/link";

import "linkify-plugin-mention";

import Linkify from "linkify-react";

function Render({ text }: { text: string }) {
  const formatHref = (href: string, type: string) => {
    if (type === "mention") {
      let path = "/users/" + href.substring(1);
      return path;
    }
    return href;
  };

  return (
    <Linkify
      options={{
        formatHref: formatHref,
        render: {
          url: ({ attributes, content }) => {
            const { href, ...props } = attributes;
            return (
              <Link
                href={href}
                {...attributes}
                className="text-primary break-words"
              >
                {content}
              </Link>
            );
          },
          hashtag: ({ attributes, content }) => {
            const { href, ...props } = attributes;
            return (
              <Link href={href} {...props} className="text-primary ">
                {content}
              </Link>
            );
          },
          mention: ({ attributes, content }) => {
            const { href, ...props } = attributes;
            return (
              <Link href={href} {...props} className="text-primary ">
                {content}
              </Link>
            );
          },
        },
      }}
    >
      {text}
    </Linkify>
  );
}

export default Render;
