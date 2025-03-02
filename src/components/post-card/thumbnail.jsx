import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const PostCardThumbnail = ({ src, alt }) => {
  return (
    <figure className="mb-8 overflow-hidden">
      <motion.div
        transition={{ duration: 0.3, ease: "easeInOut" }}
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.2, rotate: 2 }}
      >
        <LazyLoadImage
          src={src}
          alt={alt}
          className="w-full aspect-video object-cover"
        />
      </motion.div>
    </figure>
  );
};

PostCardThumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default PostCardThumbnail;
