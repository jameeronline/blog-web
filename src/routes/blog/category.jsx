import { useParams } from "react-router";
import { useCategory } from "@queries/get-category-posts";

import withDataLoading from "@/components/hoc/hoc-data-loading";
import PostGrid from "@components/post-grid";
import { findCategoryTitle } from "@/utilities/functions";

const CategoryPageTemplate = ({ posts }) => {
  const { category } = useParams();
  const categoryTitle = findCategoryTitle(posts.at(0), category);

  return (
    <section className="">
      <header className="mb-12 mt-12 text-center">
        <p className="text-xs text-typography-tertiary uppercase mb-2">
          Category Archives:
        </p>
        <h1 className="text-2xl font-bold">{categoryTitle}</h1>
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

const Category = () => {
  const { category } = useParams();
  const CategoryWithData = withDataLoading(useCategory, [category])(
    CategoryPageTemplate
  );

  return <CategoryWithData />;
};

export default Category;
