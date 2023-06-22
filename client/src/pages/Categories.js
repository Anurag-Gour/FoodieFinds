import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import "../style/Categories.css";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - FoodieFinds"}>
      <div className="item">
        {categories.map((c) => (
          <div className="card" key={c.name}>
            <div className="card-content">{c.name}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
