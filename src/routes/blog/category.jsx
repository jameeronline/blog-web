import { useParams } from "react-router";
import { useCategory } from "@queries/get-category-posts";

import withDataLoading from "@/components/hoc-data-loading";
import PostGrid from "@components/post-grid";

const CategoryEl = ({ posts }) => {
  const { category } = useParams();

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">Category: {category}</h1>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
};

const Category = () => {
  const { category } = useParams();
  const CategoryWithData = withDataLoading(useCategory, [category])(CategoryEl);

  return <CategoryWithData />;
};

export default Category;
