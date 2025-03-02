import PropTypes from "prop-types";
import { motion } from "motion/react";

const PostCardWrapper = ({ children }) => {
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
      <div className="post-card">{children}</div>
    </motion.div>
  );
};

PostCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostCardWrapper;
