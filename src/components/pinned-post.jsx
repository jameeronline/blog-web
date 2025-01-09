import { Link } from "react-router";
import PropTypes from "prop-types";
import {
  capitalizeString,
  formatDateString,
  slugify,
} from "../utilities/functions";
import UITag from "./ui/ui-tag";
import { tv } from "tailwind-variants";

const PinnedPost = ({ post, size = "DEFAULT" }) => {
  const featuredPostClasses = tv({
    slots: {
      base: "grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12",
      title: "font-bold text-typography text-2xl ",
      image: "col-span-4 lg:col-span-6",
      body: "col-span-4 lg:col-span-6",
      tagWrapper: "flex gap-2",
    },
    variants: {
      size: {
        small: {
          base: "flex gap-6",
          title: "text-lg line-clamp-1",
          image: "mb-8 flex-shrink-0 w-1/2",
          tagWrapper: "hidden",
        },
      },
    },
  });

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

  //destruct class
  const {
    base,
    title: titleClass,
    image,
    body,
    tagWrapper,
  } = featuredPostClasses({
    size,
  });

  return (
    <article className={base()}>
      <figure className={image()}>
        <img
          src={postThumbnail.url}
          alt={`Thumbnail for ${title}`}
          className="w-full aspect-[21/9] object-cover"
        />
      </figure>

      <div className={body()}>
        <header className="flex flex-col gap-3 mb-6">
          <p className="text-primary-600 text-sm flex items-center gap-2">
            {author && (
              <Link to={`/blog/author/${author?.slug}`}>
                <span>{author?.name}</span>
              </Link>
            )}
            <span className="leading-none" aria-hidden="true">
              |
            </span>
            <time dateTime={sys.publishedAt}>
              {formatDateString(sys.publishedAt)}
            </time>
          </p>
          <h2 className={titleClass()} title={title}>
            <Link to={`/post/${slug}`} state={{ id: sys.id }}>
              <span>{title}</span>
            </Link>
          </h2>
          <p className="line-clamp-3 text-typography-secondary">{summary}</p>
        </header>

        <div className="flex gap-2 mb-4">
          {categoryCollection.items.map(({ title, slug }) => (
            <Link key={slug} to={`/blog/category/${slug}`}>
              <UITag type="secondary">{title}</UITag>
            </Link>
          ))}
        </div>

        <div className={tagWrapper()}>
          {tagsCollection.items.map(({ title, slug }) => (
            <Link key={slug} to={`/blog/tag/${slug}`}>
              <UITag>{title}</UITag>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

PinnedPost.propTypes = {
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

export default PinnedPost;
