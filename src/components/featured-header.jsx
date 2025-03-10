import React from "react";
import { Link } from "react-router";

const FeaturedHeader = () => {
  return (
    <section className="py-16">
      <div className="text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="font-extrabold text-2xl md:text-4xl lg:text-6xl lg:leading-[1.3]">
            <span>
              Discover the Latest Trends and Techniques in{" "}
              <span className="bg-gradient-to-r from-primary-500 to-tertiary-500 text-transparent bg-clip-text">
                Web Development
              </span>
            </span>
          </h1>
          <p className="text-balance text-zinc-600 lg:text-lg">
            A Blog for Web Developers Seeking Growth, Innovation, and Career
            Excellence. Explore tutorials, tips, and insights to enhance your
            web development journey.
          </p>
        </div>
        <div className="inline-flex gap-8 items-center mt-10">
          <Link
            to="/newsletter"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-700 text-white hover:bg-primary-900/90 h-12 rounded-md px-6"
          >
            Join the Newsletter
          </Link>
          <Link
            to="/blog"
            className="underline underline-offset-2 text-typography-primary hover:text-primary-600 transition-colors duration-300"
          >
            More Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHeader;
