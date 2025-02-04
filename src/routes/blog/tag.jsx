import { useParams } from "react-router";
import { useTag } from "@queries/get-tag-posts";

//components
import PostGrid from "@components/post-grid";

//hoc
import withDataLoading from "@/components/hoc-data-loading";

const TagEl = ({ posts }) => {
  const { tag } = useParams();

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">Tag: {tag}</h1>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
};

const Tag = () => {
  const { tag } = useParams();
  const TagPosts = withDataLoading(useTag, [tag])(TagEl);

  return <TagPosts />;
};

export default Tag;
