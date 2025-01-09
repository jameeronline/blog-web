import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL, POST_CARD_FIELDS } from "./config";

export const GET_PINNED_POSTS = `
  query {
    blogCollection(
    where: {
      AND: [
        { pinnedPost: true },
        { contentfulMetadata: { tags: { id_contains_some: ["blog"] } } }
      ]
    },
    limit: 4
    ) {
    items {
      ${POST_CARD_FIELDS}
    }
    }
  }
`;

const fetchPinnedPosts = async () => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_PINNED_POSTS,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const usePinnedPosts = () => {
  return useQuery({
    queryKey: ["pinned-posts"],
    queryFn: fetchPinnedPosts,
  });
};
