import Link from "next/link";

type PostProps = {
  imageUrl: string;
  title: string;
  description: string | null;
  creator: {
    name: string;
    creatorId: string;
  };
};

const Post = ({ imageUrl, title, description, creator }: PostProps) => {
  const { creatorId, name } = creator;
  console.log(imageUrl);

  return (
    <div className="card-compact card w-1/4 max-w-md rounded bg-base-100 shadow-xl hover:cursor-pointer">
      <figure className="bg-stone-400">
        <img className="max-h-96" src={imageUrl} alt="probably an animal" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{title}</h2>
        <p>{description}</p>
        <small>
          posted by
          <span> </span>
          <Link href={`/user/${creatorId}`}>
            <span className="underline hover:text-amber-600">{name}</span>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Post;
