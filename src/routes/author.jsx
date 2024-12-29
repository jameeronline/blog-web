import React from "react";
import { useParams } from "react-router";

const Author = () => {
  const { auhor } = useParams();

  return (
    <div>
      <h1>Welcome to the {author} Page</h1>
    </div>
  );
};

export default Author;
