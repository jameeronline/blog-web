import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, QUERY_URL } from "./config";

export const GET_PAGE = `
    query($page_slug: String!){
        staticPagesCollection(where: {
          slug: $page_slug
        }, limit: 1){
          items{
            title
            slug
            body{
              json
            }
            featureImage{
                url(transform: {width: 900})
            }
            sys{
                publishedAt
                id
            }
          }
        }
    }
`;

const fetchPage = async (slug) => {
  const response = await fetch(QUERY_URL, {
    ...QUERY_CONFIG,
    body: JSON.stringify({
      query: GET_PAGE,
      variables: { page_slug: slug },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  return data.data.staticPagesCollection.items.length > 0
    ? data.data.staticPagesCollection.items.at(0)
    : [];
};

export const usePage = (slug) => {
  console.log(slug);
  return useQuery({
    queryKey: ["get-static-page", slug],
    queryFn: () => fetchPage(slug),
  });
};
