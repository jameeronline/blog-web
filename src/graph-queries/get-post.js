import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_POST = `
    query($postID: String!){
        blog(id: $postID){
            title
            summary
            details{
                json
                links{
                  assets{
                      block{
                        sys{
                          id
                        }
                        url
                        title
                      }
                  }
                  entries{
                      inline{
                        sys{
                          id
                        }
                        ... on CodeBlock{
                          code
                          language
                        }
                      }
                  }
                }
            }
            author{
                name
                slug
                avatar{
                  url
                }
            }
            postThumbnail{
                url(transform: {width: 900})
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
  console.log("i");
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_POST,
      variables: { postID: id },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  console.log("2");
  const data = await response.json();
  //console.log(data);
  return data.data.blog; // Adjust based on your GraphQL query structure
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ["get-post", id],
    queryFn: () => fetchPost(id),
  });
};
