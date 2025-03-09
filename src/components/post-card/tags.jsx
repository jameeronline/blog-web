import { Link } from "react-router";
import PropTypes from "prop-types";
import UITag from "../ui/ui-tag";

const PostCardTags = ({ categories, tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(({ title, slug }, index) => (
        <Link key={slug} to={`/blog/category/${slug}`}>
          <UITag type="secondary" index={index}>
            {title}
          </UITag>
        </Link>
      ))}

      {tags.map(({ title, slug }, index) => (
        <Link key={slug} to={`/blog/tag/${slug}`}>
          <UITag type="tertiary" index={index}>{`${title}`}</UITag>
        </Link>
      ))}
    </div>
  );
};

PostCardTags.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostCardTags;
