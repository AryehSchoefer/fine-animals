import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";

const NewPost: React.FC = () => {
  return (
    <>
      <Head>
        <title>Fine Animals</title>
        <meta name="description" content="Post a very fine animal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
    </>
  );
};

export default NewPost;

const Main: React.FC = () => {
  const [imageFile, setImageFile] = useState<File>();
  const test = [1, 2, 3, 4, 5, null];

  return (
    <main>
      <input
        type="file"
        onChange={(e) => {
          const { files } = e.target;
          const checkedFiles = files ? files[0] : undefined;
          setImageFile(checkedFiles);
        }}
      />
    </main>
  );
};
