import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL, POST_CARD_FIELDS } from "./config";

const GET_RELATED_POSTS = `
  query GetRelatedPosts(
    $tags: [String!]
    $categories: [String!]
    $currentPostId: String!
    $limit: Int!
  ) {
    blogCollection(
      where: {
        OR: [
          { tags: {slug_in: $tags } }
          { category:{ slug_in: $categories } }
        ]
        AND: { sys: { id_not: $currentPostId } }
      }
      limit: $limit
    ) {
      items {
        ${POST_CARD_FIELDS}
      }
    }
  }
`;

const fetchRelatedPosts = async (tags, categories, currentPostId, limit) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_RELATED_POSTS,
      variables: {
        tags: tags,
        categories: categories,
        currentPostId: currentPostId,
        limit: limit,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useRelatedPosts = (tags, categories, currentPostId, limit = 3) => {
  return useQuery({
    queryKey: ["related-posts", tags, categories, currentPostId],
    queryFn: () => fetchRelatedPosts(tags, categories, currentPostId, limit),
  });
};
