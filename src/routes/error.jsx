import { Link, useRouteError, useNavigate } from "react-router";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div id="error-page" className="text-center prose mx-auto">
      <h1 className="text-6xl mb-4">
        <span className="text-primary-500">Oops!</span> <br />
        Sorry, an unexpected error has occurred.
      </h1>
      <p className="text-lg text-slate-500">
        {error.statusText || error.message}
      </p>

      <div className="flex gap-2 justify-center mt-10">
        <Link onClick={() => navigate(-1)} className="h-10">
          <Undo2 />
          Back
        </Link>
        <Link asChild className="h-10">
          <Link to="/" className="no-underline">
            <House /> Back to Home
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default Error;
