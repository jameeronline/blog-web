export const QUERY_URL = `https://graphql.contentful.com/content/v1/spaces/${
  import.meta.env.VITE_CONTENTFUL_SPACE_ID
}`;

export const QUERY_CONFIG = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
  },
};

export const POST_CARD_FIELDS = `
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
`;

export const BLOG_TYPE_META = `{ contentfulMetadata: { tags: { id_contains_some: ["blog"] } } }`;

export const RQ_CONFIG = {
  staleTime: 3600000, // 1 hour in milliseconds
  cacheTime: 4200000, // 1 hour 10 minutes in milliseconds
};
