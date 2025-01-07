import PropTypes from "prop-types";
import PostCard from "./post-card";

const PostGrid = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <div key={post.sys.id} className="col-span-4">
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
};

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default PostGrid;
