import { Link } from "react-router";
import PropTypes from "prop-types";
import { formatDateString } from "@utilities/functions";
import { useConfig } from "@/context/config-context";

const PostCardMeta = ({ author, publishedAt }) => {
  const { showAuthor } = useConfig();
  return (
    <p className="text-primary-600 text-sm flex items-center gap-2">
      {showAuthor && (
        <>
          {author && (
            <Link
              to={`/blog/author/${author.slug}`}
              className="hover:underline hover:underline-offset-2"
            >
              <span>{author.name}</span>
            </Link>
          )}
          <span className="leading-none">|</span>
        </>
      )}
      <span>{formatDateString(publishedAt)}</span>
    </p>
  );
};

PostCardMeta.propTypes = {
  author: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  publishedAt: PropTypes.string.isRequired,
};

export default PostCardMeta;
