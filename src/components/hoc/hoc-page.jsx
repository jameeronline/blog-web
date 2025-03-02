import withDataLoading from "@/components/hoc/hoc-data-loading";
import PostGrid from "@components/post-grid";
import { useRecentPosts } from "@/graph-queries/recent-posts";
import { useFeaturedPosts } from "@/graph-queries/get-featured-posts";
import { usePinnedPosts } from "@/graph-queries/get-pinned-posts";
import { useCategory } from "@/graph-queries/get-category-posts";

const category = "frontend-development";

const RecentPostPage = ({ posts }) => {
  return (
    <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
      <PostGrid posts={posts} />
    </div>
  );
};

const HOCPage = withDataLoading(usePinnedPosts)(RecentPostPage);

export default HOCPage;
