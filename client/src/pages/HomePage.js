import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
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
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
const HomePage = () => {
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories", {
        duration: 4000,
      });
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  //get all products
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
  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  // get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Home - FoodieFinds"}>
      <Grid container>
        <Grid item md={3} p={2}>
          <Typography component="h3" my={2}>
            Filter By Category
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            border="2px solid gray"
            borderRadius="1rem"
            p={2}
          >
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </Box>
          {/* price filter */}
          <Typography component="h3" my={2}>
            Filter By Price
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            border="2px solid gray"
            borderRadius="1rem"
            p={2}
          >
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </Box>
          <Box m={2}>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              borderRadius="1rem"
              p={2}
              // onClick={() => window.location.reload()}
              onClick={() => {
                setRadio([]);
                setChecked([]);
              }}
            >
              Reset Filter
            </Button>
          </Box>
        </Grid>
        <Grid item md={9}>
          <h2>All Products</h2>
          <Grid container my={2}>
            {products?.map((p) => (
              <Grid item md={3} display="flex" mb={2}>
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
                    >
                      More Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
