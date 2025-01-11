import withDataLoading from "../components/hoc-dataloding";
import PostGrid from "../components/post-grid";

const RecentPostPage = ({ posts }) => {
  return (
    <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
      <PostGrid posts={posts} />
    </div>
  );
};

const HOCPage = withDataLoading(RecentPostPage);

export default HOCPage;
