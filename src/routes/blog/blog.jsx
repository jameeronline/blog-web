import { useState } from "react";
import { useSearchParams } from "react-router";
import PostGrid from "@components/post-grid";
import { useFetchAllPosts } from "@queries/get-all-posts";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //pagination length
  const [pageLength, setPagelength] = useState(6);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"))
      ? parseInt(searchParams.get("page")) - 1
      : 0
  );

  const { data, isLoading, isError, error } = useFetchAllPosts(
    pageLength,
    currentPage
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  //pagination handler
  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    setSearchParams({ page: newPage + 1 });
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    setSearchParams({ page: newPage + 1 });
  };

  const { posts, totalPosts } = data;

  return (
    <section className="">
      <header>
        <h1 className="text-2xl font-bold mt-12 mb-6">All Blog Posts</h1>
        <span>({totalPosts} items)</span>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={posts} />
      </div>
      <footer className="mt-10">
        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="flex items-center justify-center text-sm list-none md:gap-1 text-slate-700">
            <li>
              <button
                aria-label="Goto Previous Page"
                onClick={() => handlePreviousPage()}
                disabled={currentPage === 0}
                className="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-primary-50 hover:stroke-primary-500 hover:text-primary-500 focus:bg-primary-50 focus:stroke-primary-600 focus:text-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:stroke-gray-300"
              >
                <span className="order-2 sr-only">Prev</span>
                <ChevronLeftIcon className="size-4" />
              </button>
            </li>

            {Array.from(
              { length: Math.ceil(totalPosts / pageLength) },
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setCurrentPage(index);
                      setSearchParams({ page: index + 1 });
                    }}
                    aria-label={`Goto Page ${index + 1}`}
                    className={`items-center justify-center hidden border border-transparent h-10 gap-4 px-4 text-sm font-medium transition duration-300 focus-visible:outline-none md:inline-flex ${
                      currentPage === index
                        ? "border-b-primary-500 text-primary-500 hover:border-b-primary-600 hover:bg-primary-50 hover:text-primary-600 focus:border-b-primary-700 focus:bg-primary-50 focus:text-primary-700 pointer-events-none"
                        : "stroke-slate-700 text-slate-700 hover:bg-primary-50 hover:stroke-primary-500 hover:text-primary-500 focus:bg-primary-50 focus:stroke-primary-600 focus:text-primary-600"
                    }`}
                    aria-current={currentPage === index ? "true" : undefined}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => handleNextPage()}
                disabled={currentPage + 1 >= Math.ceil(totalPosts / pageLength)}
                aria-label="Goto Next Page"
                className="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-primary-50 hover:stroke-primary-500 hover:text-primary-500 focus:bg-primary-50 focus:stroke-primary-600 focus:text-primary-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:stroke-gray-300"
              >
                <span className="sr-only">Next </span>
                <ChevronRightIcon className="size-4" />
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </section>
  );
};

export default Blog;
