import React from "react";
import Layout from "../components/Layout/Layout";
import "../style/Pagenotfound.css";
import { Link } from "react-router-dom";
const Pagenotfound = () => {
  return (
    <Layout title={"Page Not Found - FoodieFinds"}>
      <div className="section">
        <h1 className="error">404</h1>
        <div className="page">
          Ooops!!! The page you are looking for is not found
        </div>
        <Link to="/" className="back-home">
          Back to home
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
