import React from "react";

const FeaturedHeader = () => {
  return (
    <div>
      <header className="w-full xl:container mx-auto px-4 border-b border-t border-typography-secondary/50 py-10">
        <h1 className="text-8xl font-bold mt-12 mb-6 text-center flex flex-col items-center">
          Welcome to our blog
          <span className="text-4xl font-normal mt-4 text-center text-typography-secondary">
            where we share insights and stories to inspire and inform.
          </span>
        </h1>
      </header>
    </div>
  );
};

export default FeaturedHeader;
