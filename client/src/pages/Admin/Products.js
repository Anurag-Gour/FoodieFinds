import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  //states
  const [products, setProducts] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching products", {
        duration: 4000,
      });
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Products - Admin - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <AdminMenu />
        </Grid>
        <Grid item xs={12} md={9} m={{ xs: 4, md: 0 }}>
          <h2>Products List</h2>
          <Grid container my={2}>
            {products?.map((p) => (
              <Grid item md={3} display="flex" mb={2} key={p._id}>
                <Link to={`/dashboard/admin/update-product/${p.slug}`}>
                  <Card
                    sx={{ width: "200px", height: "300px" }}
                    display="flex"
                    style={{ border: "1px solid slategray" }}
                  >
                    <CardMedia
                      sx={{ height: 200 }}
                      image={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      title={p.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {p.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {p.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Products;
