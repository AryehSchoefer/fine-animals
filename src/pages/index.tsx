import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

import Header from "../components/Header";
import Post from "../components/Post";

const Home: NextPage = () => {
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
      <Header initialRoute={true} />
      <Main />
      <AuthShowcase />
    </>
  );
};

export default Home;

const Main: React.FC = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { data: posts } = trpc.post.getPosts.useQuery({ take: 10 });

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-stone-200 p-4">
      {/* TODO: Add key prop */}
      {posts?.map((post) => (
        <Post
          imageUrl={post.imageUrl}
          title={post.title}
          description={post.description}
          creator={{ name: post.creator.name, creatorId: post.userId }}
        />
      ))}
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
