import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_RECENT_POSTS = `
    query {
      blogCollection(
        where: {
          contentfulMetadata: {
            tags: {
              id_contains_some: ["blog"]
            }
          }
        }
        limit: 9
      ) {
        items {
          title
          author {
            name
            slug
          }
          slug
          summary
          postThumbnail {
            url
          }
          tagsCollection {
            items {
              title
              slug
            }
          }
          categoryCollection {
            items {
              title
              slug
            }
          }
          sys {
            publishedAt
            id
          }
        }
      }
    }
`;

const fetchRecentPosts = async () => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({ query: GET_RECENT_POSTS }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  //console.log(data);
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useRecentPosts = () => {
  return useQuery({
    queryKey: ["recent-posts"],
    queryFn: fetchRecentPosts,
  });
};
