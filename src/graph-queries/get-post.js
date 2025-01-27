import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_POST = `
    query($postSlug: String!){
        blogCollection(where: {
          slug: $postSlug
        }, limit: 1){
          items{
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
    }
`;

const fetchPost = async (slug) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_POST,
      variables: { postSlug: slug },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.blogCollection.items.length > 0
    ? data.data.blogCollection.items.at(0)
    : [];
};

export const usePost = (slug) => {
  console.log(slug);
  return useQuery({
    queryKey: ["get-post", slug],
    queryFn: () => fetchPost(slug),
  });
};
