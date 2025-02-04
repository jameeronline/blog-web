import { Link, useRouteError, useNavigate } from "react-router";
import UIButton from "@components/ui/ui-button";
import { HomeIcon } from "@heroicons/react/24/solid";

const NotFound = ({ message }) => {
  //const error = useRouteError();
  //const navigate = useNavigate();
  //console.error(error);

  return (
    <div className="flex justify-center items-center h-full">
      <div id="error-page" className="text-center">
        <h1 className="mb-4 flex flex-col gap-2">
          <span className="text-8xl font-bold text-primary-600">Oops! 404</span>
        </h1>
        <h2 className="text-4xl text-typography-secondary">
          <span>Page Not Found</span>
        </h2>
        {/* <p className="text-lg text-typography-secondary">
          <span>{message ?? `Page Not Found`}</span>
        </p> */}

        <div className="flex gap-2 justify-center mt-10">
          <Link onClick={() => navigate(-1)} className="h-10">
            Back
          </Link>
          <Link to="/" className="no-underline">
            <UIButton>
              <HomeIcon className="size-6" />
              Home
            </UIButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
