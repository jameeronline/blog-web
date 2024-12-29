import { useQuery } from "@tanstack/react-query";

export const GET_RECENT_POSTS = `
    query($postID: String!){
        blog(id: $postID){
            title
            summary
            details{
                json
            }
            author{
                name
            }
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
`;

const fetchPost = async (id) => {
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
      body: JSON.stringify({
        query: GET_RECENT_POSTS,
        variables: { postID: id },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  //console.log(data);
  return data.data.blog; // Adjust based on your GraphQL query structure
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ["recent-posts"],
    queryFn: () => fetchPost(id),
  });
};
