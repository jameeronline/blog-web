import PropTypes from "prop-types";
import {
  PostCardWrapper,
  PostCardThumbnail,
  PostCardMeta,
  PostCardHeader,
  PostCardContent,
  PostCardTags,
} from "./post-card/index";

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
    <PostCardWrapper>
      <PostCardThumbnail src={postThumbnail.url} alt={title} />
      <div className="flex flex-col gap-3 mb-6">
        <PostCardMeta author={author} publishedAt={sys.publishedAt} />
        <PostCardHeader title={title} slug={slug} />
        <PostCardContent summary={summary} />
      </div>
      <PostCardTags
        categories={categoryCollection.items}
        tags={tagsCollection.items}
      />
    </PostCardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
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
