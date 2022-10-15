import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Fine Animals</title>
        <meta
          name="description"
          content="Some very fine animals, not gonna lie"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <AuthShowcase />
    </>
  );
};

export default Home;

const Header: React.FC = () => {
  const placeholderProfilePicURL =
    "https://pbs.twimg.com/profile_images/1422497941915381760/zEf2qbss_400x400.jpg";

  const { data: sessionData } = useSession();

  console.log(sessionData?.user?.image);

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">Fine Animals</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
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

const Main: React.FC = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const { data: posts } = trpc.post.getPosts.useQuery({ take: 10 });

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-stone-200 p-4">
      {/* {posts?.map((post) => (
        <Post
          imageUrl={post.imageUrl}
          title={post.title}
          description={post.description}
          creator={post.userId}
        />
      ))} */}
      <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
        {hello.data ? <p>{hello.data.greeting}</p> : <p>loading...</p>}
      </div>
      <AuthShowcase />
    </main>
  );
};

// references for later, will be deleted

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      {/* <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button> */}
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
