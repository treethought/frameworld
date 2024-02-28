"use client";
import { useApp } from "@/context/AppContext";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const { user } = useApp();
  const pages = ["frames", "feed"];
  const loginRequired: string[] = [];

  const isCurrentPage = (page: string) => {
    return pathname.replace(/^\/|\/$/g, "") === page;
  };
  return (
    <div>
      <div className="navbar bg-base-100 text-primary border-b-2 border-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-base-content"
            >
              <FontAwesomeIcon icon={faBars} />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content z-10 bg-base-200 mt-3 p-2 shadow rounded-box w-52"
            >
              {pages.map((page) => (
                <li key={page}>
                  <Link href={`/${page.toLowerCase()}`} passHref>
                    <span
                      className={`px-4 py-2 rounded capitalize ${isCurrentPage(page)
                          ? "text-primary-600 border border-primary-600"
                          : "text-base-content hover:text-secondary-focus"
                        }`}
                    >
                      {page}
                    </span>
                  </Link>
                </li>
              ))}

              {user &&
                loginRequired.map((page) => (
                  <li key={page}>
                    <Link href={`/${page.toLowerCase()}`} passHref>
                      <span
                        className={`px-4 py-2 rounded capitalize ${isCurrentPage(page)
                            ? "text-primary-600 border border-primary-600"
                            : "text-base-content hover:text-secondary-focus"
                          }`}
                      >
                        {page}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex-row items-center hidden md:flex gap-2">
            <Link href="/" passHref>
              <span className="font-manrope font-bold text-xl tracking-wider lowercase ">
                frameworld
              </span>
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {pages.map((page) => (
              <li key={page}>
                <Link href={`/${page.toLowerCase()}`} passHref>
                  <span
                    className={`px-4 py-2 rounded capitalize ${isCurrentPage(page)
                        ? "text-primary-600 border border-primary-600"
                        : "text-base-content hover:text-secondary-focus"
                      }`}
                  >
                    {page}
                  </span>
                </Link>
              </li>
            ))}

            {user &&
              loginRequired.map((page) => (
                <li key={page}>
                  <Link href={`/${page.toLowerCase()}`} passHref>
                    <span
                      className={`px-4 py-2 rounded capitalize ${isCurrentPage(page)
                          ? "text-primary-600 border border-primary-600"
                          : "text-base-content hover:text-secondary-focus"
                        }`}
                    >
                      {page}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="navbar-end">
          <SearchButton />
          {user?.pfp_url && <ProfileAvatar user={user} className="w-10" link />}
          <NotificationIndicator />
        </div>
      </div>
    </div>
  );
}

function SearchButton() {
  return (
    <button className="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
}

function NotificationIndicator() {
  return (
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item">
        </span>
      </div>
    </button>
  );
}

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function ThemeSelect() {
  return (
    <div className="dropdown mb-0">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z">
          </path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 text-content"
      >
        {themes.map((theme, i) => (
          <li key={i}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
