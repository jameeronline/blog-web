import PropTypes from "prop-types";
import ArticleSummary from "./blog-preview";

const ArticleGrid = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <div key={post.sys.id} className="col-span-4">
          <ArticleSummary post={post} />
        </div>
      ))}
    </>
  );
};

ArticleGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ArticleGrid;
