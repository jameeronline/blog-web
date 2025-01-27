import { Link } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRelatedPosts } from "../graph-queries/get-related-posts";
import PostCard from "./post-card";

const RelatedPosts = ({ tags, categories, currentPostId }) => {
  console.log(tags);
  const {
    data: relatedPosts,
    isLoading,
    error,
  } = useRelatedPosts(tags, categories, currentPostId, 3);

  if (isLoading) return <div>Loading related posts...</div>;
  if (error) return null;
  if (!relatedPosts?.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <PostCard post={post} thumbnail="small" key={post?.sys.id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
