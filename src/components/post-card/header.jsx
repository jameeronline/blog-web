import { Link } from "react-router";
import PropTypes from "prop-types";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const PostCardHeader = ({ title, slug }) => {
  return (
    <h1 className="font-bold text-2xl text-typography flex justify-between items-baseline gap-3 transition-colors duration-300 line-clamp-3 hover:underline hover:underline-offset-2">
      <Link to={`/post/${slug}`} title={title}>
        <span>{title}</span>
      </Link>
      <ArrowUpRightIcon className="size-6 flex-none relative top-1" />
    </h1>
  );
};

PostCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default PostCardHeader;
