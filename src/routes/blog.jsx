import PostGrid from "../components/post-grid";
import { useFetchAllPosts } from "../graph-queries/get-all-posts";

const Blog = () => {
  const { data, isLoading, isError, error } = useFetchAllPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">All Blog Posts</h1>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={data} />
      </div>
    </section>
  );
};

export default Blog;
