//get author details
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

const GET_AUTHOR_DETAILS = `
    query($slug: String){
        authorCollection(where: {
            slug: $slug
        }){
            items{
            name
            avatar{
                url
            }
            socialX
            socialGithub
            socialLinkedIn
            jobPosition
            description{
                json
            }
            }
        }
    }
`;

const fetchAuthor = async (slug) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_AUTHOR_DETAILS,
      variables: { slug: slug },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.authorCollection.items; // Adjust based on your GraphQL query structure
};

export const useAuthorDetails = (slug) => {
  return useQuery({
    queryKey: ["get-author-details", slug],
    queryFn: () => fetchAuthor(slug),
  });
};
