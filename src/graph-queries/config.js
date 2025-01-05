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
