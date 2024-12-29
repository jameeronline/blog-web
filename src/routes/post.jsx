import { useLocation, Link } from "react-router";
import { usePost } from "../graph-queries/get-post";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { formatDateString, slug } from "../utilities/functions";

const Post = () => {
  const { state } = useLocation();

  const { data, isLoading, isError, error } = usePost(state.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  console.log(data);

  const {
    title,
    author,
    summary,
    details,
    postThumbnail,
    tagsCollection,
    categoryCollection,
    sys,
  } = data;

  return (
    <article className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
      <aside className="col-span-4"></aside>
      <section className="lg:col-span-8 prose">
        <p className="text-primary-600 text-sm font-semibold">
          <span>{formatDateString(sys.publishedAt)}</span>
        </p>
        <h1>{title}</h1>
        {postThumbnail && (
          <figure>
            <img src={postThumbnail.url} alt={title} />
          </figure>
        )}
        {documentToReactComponents(details?.json)}
      </section>
    </article>
  );
};

export default Post;
