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
          <div className="card">
            <div
              className="pos1"
              style={{
                backgroundImage: "url(https://picsum.photos/200/300)",
              }}
            >
              <div className="abv abv1">{c.name}</div>
            </div>
            <h2>{c.name}</h2>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
