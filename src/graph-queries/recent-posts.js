import { useQuery } from "@tanstack/react-query";

export const GET_RECENT_POSTS = `
    query{
        blogCollection(where: {
            contentfulMetadata: {
            tags: {
                id_contains_some: ["blog"]
            }
            }
        } limit: 9){
            items{
            title
            author{
                name
            }
            slug
            summary
            postThumbnail{
                url
            }
            tagsCollection{
                items{
                    title
                    slug
                }
            }
            categoryCollection{
                items{
                    title
                    slug
                }
            }
            sys{
                publishedAt
                id
            }
            }
        }
    }
`;

const fetchRecentPosts = async () => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${
      import.meta.env.VITE_CONTENTFUL_SPACE_ID
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: GET_RECENT_POSTS }),
    }
  );

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
