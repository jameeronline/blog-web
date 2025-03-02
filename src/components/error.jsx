import { Link, useRouteError, useNavigate } from "react-router";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ErrorFallBackIcon from "../assets/svg/error-fallback.svg?react";

const Error = ({ error, resetErrorBoundary }) => {
  //const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full gap-6 text-primary-600">
      <ErrorFallBackIcon className="w-80 h-80 mx-auto" />

      <header className="flex gap-4 flex-col items-center">
        <h1 className="text-2xl md:text-6xl font-bold text-primary-600">
          <span>Oops!</span>
        </h1>
        <h2 className="text-lg md:text-2xl text-typography-primary">
          <span> Sorry, an unexpected error has occurred.</span>
        </h2>
      </header>

      <p className="max-w-screen-sm mx-auto text-sm text-typography-secondary text-center md:text-lg">
        Please refresh the page or try again later. If the issue persists,
        contact support.
      </p>

      <div className="flex gap-2 justify-center items-center mt-10">
        {/* <Link
          onClick={() => navigate(-1)}
          className="items-center gap-2 hover:bg-gray-50 inline-flex transition-colors duration-300 px-6 py-3 rounded-full"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Link> */}

        <Link
          to="/"
          className="no-underline inline-flex gap-3 items-center bg-primary-600 hover:bg-primary-800 transition-colors duration-300 px-6 py-3 rounded-full text-white"
          aria-label="Go to Home"
        >
          <HomeIcon className="size-6" />
          Back to Home
        </Link>
        <button
          onClick={() => resetErrorBoundary()}
          className="no-underline inline-flex gap-3 items-center bg-primary-600 hover:bg-primary-800 transition-colors duration-300 px-6 py-3 rounded-full text-white"
          aria-label="Go to Home"
        >
          <HomeIcon className="size-6" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default Error;
