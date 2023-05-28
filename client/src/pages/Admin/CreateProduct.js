import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import PhotoSharpIcon from "@mui/icons-material/PhotoSharp";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  //states
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(true);

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
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      console.log(productData);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Create Product - Admin - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <AdminMenu />
        </Grid>
        <Grid item md={9}>
          Create Product
          <Box m={2}>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Box>
          <Box m={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="product-photo"
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <label htmlFor="product-photo">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddSharpIcon />}
                endIcon={<PhotoSharpIcon />}
              >
                {photo ? photo.name : "Upload Photo"}
              </Button>
            </label>
          </Box>
          <Box>
            {photo && (
              <Box>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                />
              </Box>
            )}
          </Box>
          <Box m={2} sx={{ maxWidth: "70%", color: "black" }}>
            <input
              style={{
                border: "1px solid slategray",
                borderRadius: "1rem",
                padding: "1rem",
              }}
              type="text"
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box m={2} sx={{ maxWidth: "70%" }}>
            <textarea
              style={{
                border: "1px solid slategray",
                borderRadius: "1rem",
                padding: "1rem",
              }}
              type="text"
              value={description}
              placeholder="Product description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box m={2} sx={{ maxWidth: "70%" }}>
            <input
              style={{
                border: "1px solid slategray",
                borderRadius: "1rem",
                padding: "1rem",
              }}
              type="number"
              value={price}
              placeholder="Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
          <Box m={2} sx={{ maxWidth: "70%" }}>
            <input
              style={{
                border: "1px solid slategray",
                borderRadius: "1rem",
                padding: "1rem",
              }}
              type="number"
              value={quantity}
              placeholder="Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
          <Box
            m={2}
            sx={{
              maxWidth: "70%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Shipping Possible :
            <select
              onChange={(value) => {
                if (value === "0") {
                  setShipping(false);
                }
              }}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Box>
          <Box
            m={2}
            sx={{
              maxWidth: "70%",
            }}
          >
            <Button variant="contained" color="success" onClick={handleCreate}>
              Create Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateProduct;
