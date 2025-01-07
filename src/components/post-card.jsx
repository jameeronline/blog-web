import { Link } from "react-router";
import PropTypes from "prop-types";
import {
  capitalizeString,
  formatDateString,
  slugify,
} from "../utilities/functions";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostCard = ({ post }) => {
  const {
    author,
    title,
    slug,
    postThumbnail,
    summary,
    categoryCollection,
    tagsCollection,
    sys,
  } = post;
  return (
    <div className="post-card">
      <figure className="mb-8">
        <LazyLoadImage
          src={postThumbnail.url}
          alt={title}
          effect="opacity"
          className="w-full aspect-video object-cover"
        />
      </figure>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-primary-600 text-sm flex items-center gap-2">
          {author && (
            <Link to={`/blog/author/${author?.slug}`}>
              <span>{author?.name}</span>
            </Link>
          )}
          <span className="leading-none">|</span>
          <span>{formatDateString(sys.publishedAt)}</span>
        </p>
        <h1 className="font-bold text-2xl text-typography">
          <Link to={`/post/${slug}`} state={{ id: sys.id }}>
            <span>{title}</span>
          </Link>
        </h1>
        <p className="line-clamp-2 text-typography-secondary">{summary}</p>
      </div>

      <div className="flex gap-2 mb-4">
        {categoryCollection.items.map(({ title, slug }) => (
          <Link
            key={slug}
            to={`/blog/category/${slug}`}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-secondary-800 bg-secondary-50 hover:bg-secondary-100/80 hover:text-secondary-900 transition-colors duration-300 rounded-full"
          >
            {title}
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        {tagsCollection.items.map(({ title, slug }) => (
          <Link
            key={slug}
            to={`/blog/tag/${slug}`}
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-primary-800 bg-primary-50 hover:bg-primary-100/80 hover:text-primary-900 transition-colors duration-300 rounded-full"
          >
            {capitalizeString(title)}
          </Link>
        ))}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    postThumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    categoryCollection: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    tagsCollection: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    sys: PropTypes.shape({
      publishedAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
