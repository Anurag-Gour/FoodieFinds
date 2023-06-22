import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Box>
        <Typography textAlign={"center"} component={"h2"}>
          Category : {category.name} - {products.length} product found
        </Typography>
      </Box>
      <Grid container p={4}>
        {products?.map((p) => (
          <Grid item md={3} display="flex" mb={2} key={p._id}>
            <Card
              sx={{ width: "200px" }}
              display="flex"
              style={{ border: "1px solid slategray" }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                title={p.name}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  Add to Cart
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ bgcolor: "slategray" }}
                  onClick={() => {
                    navigate(`/product/${p.slug}`);
                  }}
                >
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default CategoryProducts;
