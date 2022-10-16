import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = ({ initialRoute = false }: { initialRoute?: boolean }) => {
  const placeholderProfilePicURL =
    "https://pbs.twimg.com/profile_images/1422497941915381760/zEf2qbss_400x400.jpg";

  const { data: sessionData } = useSession();

  return (
    <header className="navbar sticky top-0 bg-base-100">
      <div className="flex-1 gap-1">
        <Link href="/">
          <a className="btn btn-ghost text-xl normal-case">Fine Animals</a>
        </Link>
        <div
          className="tooltip tooltip-bottom"
          data-tip={initialRoute ? "New Post" : "Go Back"}
        >
          <Link href={initialRoute ? "/new_post" : "/"}>
            <button className="btn" disabled={sessionData ? false : true}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {initialRoute ? (
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                ) : (
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                )}
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        {sessionData ? (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
              <div className="w-10 rounded-full">
                <img
                  src={
                    sessionData?.user?.image
                      ? sessionData.user.image
                      : placeholderProfilePicURL
                  }
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => signOut()}>Sign out</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
