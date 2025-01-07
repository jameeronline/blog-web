import { Link, useRouteError, useNavigate } from "react-router";
import UIButton from "../components/ui/ui-button";
import { HomeIcon } from "@heroicons/react/24/solid";

const NotFound = ({ message }) => {
  //const error = useRouteError();
  //const navigate = useNavigate();
  //console.error(error);

  return (
    <div id="error-page" className="text-center prose mx-auto">
      <h1 className="mb-4 flex flex-col gap-2">
        <span className="text-6xl text-primary-500">Oops!</span>
        <span>404 Page Not Found</span>
      </h1>
      <p className="text-lg text-slate-500">
        <span>{message ?? `Page Not Found`}</span>
      </p>

      <div className="flex gap-2 justify-center mt-10">
        {/* <Button onClick={() => navigate(-1)} className="h-10">
          <Undo2 />
          Back
        </Button> */}
        <Link to="/" className="no-underline">
          <UIButton>
            <HomeIcon className="size-6" />
            Back to Home
          </UIButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
