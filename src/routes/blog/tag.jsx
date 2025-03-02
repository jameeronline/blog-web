import { useParams } from "react-router";
import { useTag } from "@queries/get-tag-posts";

//components
import PostGrid from "@components/post-grid";

//hoc
import withDataLoading from "@/components/hoc/hoc-data-loading";
import { findTagTitle } from "@/utilities/functions";

const TagEl = ({ posts }) => {
  const { tag } = useParams();
  const tagTitle = findTagTitle(posts.at(0), tag);

  return (
    <section className="">
      <header className="mb-12 mt-12 text-center">
        <p className="text-xs text-typography-tertiary uppercase mb-2">
          Tag Archives:
        </p>
        <h1 className="text-2xl font-bold">{tagTitle}</h1>
        <p className="text-primary-600 text-sm">
          (<span>{posts?.length}</span> items)
        </p>
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
