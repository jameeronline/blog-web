//react-router
import { Link, Outlet } from "react-router";
import { useLocation } from "react-router";

//API call to get the posts
import { useRecentPosts } from "@queries/recent-posts";
import { useFeaturedPosts } from "@queries/get-featured-posts";

//components
import PostGrid from "@components/post-grid";
import FeaturedHeader from "@components/featured-header";
import FeaturedPostCard from "@components/featured-post";
import UIButton from "@components/ui/ui-button";
import PinnedPost from "@components/pinned-post";
import { Spinner } from "@components/spinner";
import EnhancedGreeting from "@components/hoc-button";

const Home = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  const {
    data: featuredPosts,
    isLoading: isLoadingFeaturedPosts,
    isError: isErrorFeaturedPost,
    error: errorFeaturedPosts,
  } = useFeaturedPosts();
  const {
    data: recentPosts,
    isLoading: isLoadingRecentPosts,
    isError: isErrorRecentPosts,
    error: errorRecentPosts,
  } = useRecentPosts();

  if (!isRootPath) {
    return <Outlet />;
  }

  if (isLoadingFeaturedPosts || isLoadingRecentPosts) {
    return <Spinner />;
  }

  if (isErrorFeaturedPost || isErrorRecentPosts) {
    return (
      <div>
        Error fetching data{" "}
        {JSON.stringify(errorFeaturedPosts) || JSON.stringify(errorRecentPosts)}
      </div>
    );
  }

  return (
    <>
      <FeaturedHeader />
      <section>
        <header>
          <h1 className="text-2xl font-bold mt-12 mb-6">Featured Posts</h1>
        </header>
        <div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <FeaturedPostCard post={featuredPosts[0]} />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <FeaturedPostCard post={featuredPosts[1]} size="small" />
            <FeaturedPostCard post={featuredPosts[2]} size="small" />
            <FeaturedPostCard post={featuredPosts[0]} size="small" />
          </div>
        </div>
      </section>

      {/* PINNED POSTS */}
      <section className="p-6 my-8 md:my-10 bg-primary-50">
        <PinnedPost post={featuredPosts[0]} />
      </section>

      {/* RECENT POSTS */}
      <section>
        <header>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        </header>
        <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <PostGrid posts={recentPosts} />
        </div>

        {/* <footer className="flex justify-center mt-10">
          <Link to="/blog">
            <UIButton>Read More Posts</UIButton>
          </Link>
        </footer> */}
      </section>
    </>
  );
};

export default Home;
