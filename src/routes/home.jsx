//react-router
import { Link, Outlet } from "react-router";
import { useLocation } from "react-router";

//API call to get the posts
import { useRecentPosts } from "../graph-queries/recent-posts";
import { useFeaturedPosts } from "../graph-queries/get-featured-posts";

//components
import PostGrid from "../components/post-grid";
//import FeaturedHeader from "../components/featured-header";
import FeaturedPostCard from "../components/featured-post";
import UIButton from "../components/ui/ui-button";

// const posts = [
//   {
//     id: 1,
//     image: Image1,
//     title: "Understanding React Hooks",
//     description:
//       "A comprehensive guide to understanding and using React Hooks in your projects.",
//     category: "Frontend Development",
//     tags: ["React", "Hooks", "JavaScript"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "John Doe",
//   },
//   {
//     id: 2,
//     image: Image2,
//     title: "CSS Grid Layout",
//     description: "Learn how to create complex layouts easily with CSS Grid.",
//     category: "Frontend Development",
//     tags: ["CSS", "Grid", "Web Design"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Jane Smith",
//   },
//   {
//     id: 3,
//     image: Image3,
//     title: "JavaScript ES6 Features",
//     description:
//       "An overview of the new features introduced in JavaScript ES6.",
//     category: "Frontend Development",
//     tags: ["JavaScript", "ES6", "Programming"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Alice Johnson",
//   },
//   {
//     id: 4,
//     image: Image4,
//     title: "Building Responsive Websites",
//     description:
//       "Tips and tricks for building responsive websites that look great on any device.",
//     category: "Frontend Development",
//     tags: ["Responsive Design", "CSS", "HTML"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Bob Brown",
//   },
//   {
//     id: 5,
//     image: Image5,
//     title: "Introduction to TypeScript",
//     description: "A beginner's guide to getting started with TypeScript.",
//     category: "Frontend Development",
//     tags: ["TypeScript", "JavaScript", "Programming"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Charlie Davis",
//   },
//   {
//     id: 6,
//     image: Image6,
//     title: "State Management with Redux",
//     description:
//       "Learn how to manage state in your React applications using Redux.",
//     category: "Frontend Development",
//     tags: ["Redux", "React", "State Management"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Diana Evans",
//   },
//   {
//     id: 7,
//     image: Image7,
//     title: "Next.js for Server-Side Rendering",
//     description:
//       "An introduction to using Next.js for server-side rendering in React applications.",
//     category: "Frontend Development",
//     tags: ["Next.js", "React", "SSR"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Ethan Foster",
//   },
//   {
//     id: 8,
//     image: Image8,
//     title: "Tailwind CSS for Rapid UI Development",
//     description:
//       "How to use Tailwind CSS to quickly build modern and responsive user interfaces.",
//     category: "Frontend Development",
//     tags: ["Tailwind CSS", "CSS", "UI Design"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "Fiona Green",
//   },
//   {
//     id: 9,
//     image: Image9,
//     title: "Testing React Applications",
//     description:
//       "Best practices for testing your React applications using popular testing libraries.",
//     category: "Frontend Development",
//     tags: ["Testing", "React", "JavaScript"],
//     createdDate: "Sunday, 1 Jan 2025",
//     author: "George Harris",
//   },
// ];

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
    return <div>Loading...</div>;
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
      {/* <section>
        <FeaturedHeader />
      </section> */}
      {/* FEATURED POSTS */}
      <section>
        <header>
          <h1 className="text-2xl font-bold mt-12 mb-6">Featured Posts</h1>
        </header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-8 lg:grid-cols-12">
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
      {/* RECENT POSTS */}
      <section>
        <header>
          <h2 className="text-2xl font-bold mt-12 mb-6">Recent Posts</h2>
        </header>
        <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <PostGrid posts={recentPosts} />
        </div>

        <footer className="flex justify-center mt-10">
          <Link to="/blog">
            <UIButton>Read More Posts</UIButton>
          </Link>
        </footer>
      </section>
    </>
  );
};

export default Home;
