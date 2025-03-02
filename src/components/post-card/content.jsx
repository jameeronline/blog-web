import PropTypes from "prop-types";

const PostCardContent = ({ summary }) => {
  return <p className="line-clamp-2 text-typography-secondary">{summary}</p>;
};

PostCardContent.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default PostCardContent;
