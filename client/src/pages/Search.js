import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
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
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <Box>
        <Typography variant="h4">
          Search Results : &nbsp;
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </Typography>
      </Box>
      <Grid container my={2} pl={3}>
        {values?.results.map((p) => (
          <Grid item md={3} display="flex" mb={2} key={p._id}>
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
    </Layout>
  );
};

export default Search;
