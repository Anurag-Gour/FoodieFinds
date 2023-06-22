import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Grid container>
        <Grid item md={4} p={1} container justifyContent="center">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height="300"
            width={"350px"}
            style={{ border: "1px solid slategray" }}
          />
        </Grid>
        <Grid item md={8}>
          <h1 className="text-center">Product Details</h1>
          <h4>Name : {product.name}</h4>
          <h4>Description : {product.description}</h4>
          <h4>Price : {product.price}</h4>
          <h4>Category : {product?.category?.name}</h4>
          <Button size="small" variant="contained" sx={{ maxWidth: "50%" }}>
            ADD TO CART
          </Button>
        </Grid>
      </Grid>
      <Box>
        <h2>Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <Box>
          <Grid container justifyContent="center">
            {relatedProducts?.map((p) => (
              <Grid item md={4} display="flex" mb={2} key={p._id}>
                <Card
                  key={p._id}
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
        </Box>
      </Box>
    </Layout>
  );
};
export default ProductDetails;
