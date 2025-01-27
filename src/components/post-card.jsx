import { Link } from "react-router";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UITag from "./ui/ui-tag";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import { capitalizeString, formatDateString } from "@utilities/functions";

const PostCard = ({ post, thumbnail = "default" }) => {
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
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      initial={{ scale: 1, opacity: 0, translateY: "-40px" }}
      whileInView={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
    >
      <div className="post-card">
        <figure className="mb-8 overflow-hidden">
          <motion.div
            transition={{ duration: 0.3, ease: "easeInOut" }}
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.2, rotate: 2 }}
          >
            <LazyLoadImage
              src={postThumbnail.url}
              alt={title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>
        </figure>

        <div className="flex flex-col gap-3 mb-6">
          <p className="text-primary-600 text-sm flex items-center gap-2">
            {author && (
              <Link
                to={`/blog/author/${author?.slug}`}
                className="hover:underline hover:underline-offset-2"
              >
                <span>{author?.name}</span>
              </Link>
            )}
            <span className="leading-none">|</span>
            <span>{formatDateString(sys.publishedAt)}</span>
          </p>
          <h1 className="font-bold text-2xl text-typography flex justify-between items-baseline gap-3 transition-colors duration-300 hover:underline hover:underline-offset-2">
            <Link to={`/post/${slug}`}>
              <span>{title}</span>
            </Link>
            <ArrowUpRightIcon className="size-6 flex-none relative top-1" />
          </h1>
          <p className="line-clamp-2 text-typography-secondary">{summary}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categoryCollection.items.map(({ title, slug }) => (
            <Link key={slug} to={`/blog/category/${slug}`}>
              <UITag type="secondary">{title}</UITag>
            </Link>
          ))}

          {tagsCollection.items.map(({ title, slug }) => (
            <Link key={slug} to={`/blog/tag/${slug}`}>
              <UITag>{`#${title}`}</UITag>
            </Link>
          ))}
        </div>

        <div className="flex gap-2"></div>
      </div>
    </motion.div>
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
