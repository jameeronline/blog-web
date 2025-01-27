import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { POST_CARD_FIELDS, QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_ALL_POSTS = `
    query ($pageLength: Int!, $skip: Int!){
      blogCollection(
        where: {
          contentfulMetadata: {
            tags: {
              id_contains_some: ["blog"]
            }
          }
        }, limit: $pageLength, skip: $skip
      ) {
        total
        items {
          ${POST_CARD_FIELDS}
        }
      }
    }
`;

const fetchAllPosts = async (pageLength, currentPage) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_ALL_POSTS,
      variables: {
        pageLength: pageLength,
        skip: pageLength * currentPage,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const totalPosts = data.data.blogCollection.total;
  const posts = data.data.blogCollection.items;
  return { totalPosts, posts };
};

export const useFetchAllPosts = (pageLength, currentPage) => {
  return useQuery({
    queryKey: ["all-posts", currentPage],
    queryFn: () => fetchAllPosts(pageLength, currentPage),
    placeholderData: keepPreviousData,
  });
};
