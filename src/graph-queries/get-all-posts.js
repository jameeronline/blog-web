import { useQuery } from "@tanstack/react-query";
import { POST_CARD_FIELDS, QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_ALL_POSTS = `
    query {
      blogCollection(
        where: {
          contentfulMetadata: {
            tags: {
              id_contains_some: ["blog"]
            }
          }
        }
      ) {
        items {
          ${POST_CARD_FIELDS}
        }
      }
    }
`;

const fetchAllPosts = async () => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({ query: GET_ALL_POSTS }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  //console.log(data);
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useFetchAllPosts = () => {
  return useQuery({
    queryKey: ["all-posts"],
    queryFn: fetchAllPosts,
  });
};
