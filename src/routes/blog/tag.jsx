import { useParams } from "react-router";
import { useTag } from "../../graph-queries/get-tag-posts";

//components
import PostGrid from "../../components/post-grid";

const Tag = () => {
  const { tag } = useParams();

  const { data, isLoading, isError, error } = useTag(tag);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">Tag: {tag}</h1>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={data} />
      </div>
    </section>
  );
};

export default Tag;
