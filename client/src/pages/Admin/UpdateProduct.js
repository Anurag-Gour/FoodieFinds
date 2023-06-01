import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import PhotoSharpIcon from "@mui/icons-material/PhotoSharp";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const params = useParams();
  //states
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(true);
  const [id, setId] = useState("");
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPhoto(data.product.photo);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating products", {
        duration: 4000,
      });
    }
  };
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
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error("Error in updating product");
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Type YES if you want to delete this product ? "
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
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
        <Grid item xs={12} md={9} m={{ xs: 4, md: 0 }}>
          <h2>Update Product</h2>
          <Box m={2}>
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
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
          <Box m={2}>
            {photo ? (
              <Box>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  style={{ border: "1px solid slategray" }}
                />
              </Box>
            ) : (
              <Box>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                  alt="product_photo"
                  height={"200px"}
                  style={{ border: "1px solid slategray" }}
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
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Shipping Possible :
            <select
              style={{
                backgroundColor: "#525150",
                borderRadius: "0.5rem",
                color: "white",
                width: "100px",
                padding: "5px 5px",
              }}
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
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Update Product
            </Button>
          </Box>
          <Box
            m={2}
            sx={{
              maxWidth: "70%",
            }}
          >
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UpdateProduct;
