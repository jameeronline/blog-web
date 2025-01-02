import { useParams } from "react-router";
import { useAuthor } from "../graph-queries/get-author-posts";
import ArticleSummary from "../components/blog-preview";
import ArticleGrid from "../components/post-grid";

const Author = () => {
  const { author } = useParams();

  const { data, isLoading, isError, error } = useAuthor(author);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">Blog Posts By: Author</h1>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <ArticleGrid posts={data} />
      </div>
    </section>
  );
};

export default Author;
