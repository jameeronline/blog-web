import React from "react";
import { useParams } from "react-router";

const Page = () => {
  const { page_slug } = useParams();
  return <div>Page {page_slug}</div>;
};

export default Page;
