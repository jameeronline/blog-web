import { useQuery } from "@tanstack/react-query";
import { POST_CARD_FIELDS, QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_CATEGORY_POSTS = `
  query ($category: String!) {
    blogCollection(
    where: {
      AND: [
      { category: { slug: $category } },
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

const fetchPosts = async (category) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_CATEGORY_POSTS,
      variables: { category: category },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useCategory = (category) => {
  return useQuery({
    queryKey: ["category-posts", category],
    queryFn: () => fetchPosts(category),
  });
};
