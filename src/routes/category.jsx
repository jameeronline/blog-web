import React from "react";
import { useParams } from "react-router";

const Category = () => {
  const { category } = useParams();
  return (
    <div>
      <h1>Welcome to the {category} Page</h1>
    </div>
  );
};

export default Category;
