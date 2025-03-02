import { Link, useNavigate } from "react-router";
import UIButton from "./ui/ui-button";

import { HomeIcon } from "@heroicons/react/24/solid";

//svg icon with svgr
import NoDataIcon from "../assets/svg/no-data.svg?react";
import NoDataFoundIcon from "../assets/svg/no-data-found.svg?react";

const NoData = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full gap-6 text-primary-600">
      <NoDataFoundIcon className="w-80 h-80 mx-auto" />

      <header className="flex gap-4 flex-col items-center">
        <h1 className="text-6xl font-bold text-primary-600">
          <span>Oops!</span>
        </h1>
        <h2 className="text-2xl text-typography-secondary">
          <span>No Results Found.</span>
        </h2>
      </header>

      <p className="max-w-screen-sm mx-auto text-lg text-slate-500 text-center">
        No data available at the moment. Please check back later.
      </p>

      {children}

      <div className="flex gap-2 justify-center mt-10">
        {/* <Link onClick={() => navigate(-1)} className="h-10">
          Back
        </Link> */}

        <Link
          to="/"
          className="no-underline inline-flex gap-3 items-center bg-primary-600 hover:bg-primary-800 transition-colors duration-300 px-6 py-3 rounded-full text-white"
          aria-label="Go to Home"
        >
          <HomeIcon className="size-6" />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NoData;
