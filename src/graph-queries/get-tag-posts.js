import { useQuery } from "@tanstack/react-query";
import { POST_CARD_FIELDS, QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_TAG_POSTS = `
  query ($tag: String!) {
    blogCollection(
    where: {
      AND: [
      { tags: { slug: $tag } },
      { contentfulMetadata: { tags: { id_contains_some: ["blog"] } } }
      ]
    },
    limit: 9
    ) {
    items {
      ${POST_CARD_FIELDS}
    }
    }
  }
`;

const fetchPosts = async (tag) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_TAG_POSTS,
      variables: { tag: tag },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useTag = (tag) => {
  return useQuery({
    queryKey: ["tag-posts", tag],
    queryFn: () => fetchPosts(tag),
  });
};
