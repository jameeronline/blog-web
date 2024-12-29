import React from "react";
import { useParams } from "react-router";

const Tag = () => {
  const { tag } = useParams();
  return (
    <div>
      <h1>Welcome to the {tag} Page</h1>
    </div>
  );
};

export default Tag;
