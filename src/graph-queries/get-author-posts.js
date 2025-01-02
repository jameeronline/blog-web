import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_AUTHOR_POSTS = `
  query ($author: String!) {
    blogCollection(
    where: {
      AND: [
      { author: { slug: $author } },
      { contentfulMetadata: { tags: { id_contains_some: ["blog"] } } }
      ]
    },
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

const fetchPosts = async (author) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_AUTHOR_POSTS,
      variables: { author: author },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.blogCollection.items; // Adjust based on your GraphQL query structure
};

export const useAuthor = (author) => {
  return useQuery({
    queryKey: ["author-posts", author],
    queryFn: () => fetchPosts(author),
  });
};
