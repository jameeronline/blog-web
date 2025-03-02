import { Link, useRouteError, useNavigate } from "react-router";
import UIButton from "@components/ui/ui-button";

//heroicons
import { HomeIcon } from "@heroicons/react/24/outline";

//svg icon with svgr
import NotFoundIcon from "../assets/svg/404.svg?react";

const NotFound = ({ message = "Page Not Found" }) => {
  //const error = useRouteError();
  const navigate = useNavigate();
  //console.error(error);

  return (
    <div className="flex justify-center items-center h-full">
      <div id="error-page" className="text-center">
        <div className="mb-4 flex flex-col gap-8 text-primary-500">
          <NotFoundIcon className="w-80 h-80 mx-auto" />

          <header className="flex gap-4 flex-col items-center">
            <h1 className="text-6xl font-bold text-primary-600">
              <span>404</span>
            </h1>
            <h2 className="text-2xl text-typography-secondary">
              <span>{message}</span>
            </h2>
          </header>

          <p className="max-w-screen-sm mx-auto text-lg text-slate-500 text-center">
            The Page you are looking for might have been removed had its name
            changed or its temporarily unavailable.
          </p>
        </div>

        <div className="flex gap-4 justify-center items-center mt-10">
          {/* <Link
            onClick={() => navigate(-1)}
            className="inline-flex px-4 py-2"
            aria-label="Go Back"
          >
            Back
          </Link> */}
          <Link
            to="/"
            className="no-underline inline-flex gap-3 items-center bg-primary-600 hover:bg-primary-800 transition-colors duration-300 px-6 py-3 rounded-full text-white"
            aria-label="Go to Home"
          >
            <HomeIcon className="size-6" />
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
