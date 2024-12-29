import { Link } from "react-router";
import PropTypes from "prop-types";
import { sluggify } from "../utilities/functions";

const PostCard = ({ post }) => {
  const { image, title, description, category, tags, createdDate, author } =
    post;
  return (
    <div className="post-card">
      <figure className="mb-8">
        <img
          src={image}
          alt="Post Title"
          className="w-full aspect-video object-cover"
        />
      </figure>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-primary-600 text-sm">{createdDate}</p>
        <h1 className="font-bold text-2xl text-typography">
          <Link to={`/post/${sluggify(title)}`}>{title}</Link>
        </h1>
        <p className="text-typography-secondary">{description}</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Link
          to={`/blog/category/${sluggify(category)}`}
          className="inline-flex items-center px-2 py-1 text-sm font-medium text-secondary-800 bg-secondary-50 rounded-full"
        >
          {category}
        </Link>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog/tag/${sluggify(tag)}`}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-primary-800 bg-primary-50 rounded-full"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
