import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../style/DashboardTable.css";
import CategoryForm from "../../components/Forms/CategoryForm";
const CreateCategory = () => {
  // modal styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //states
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //modal opening/closing function
  const handleClose = () => setOpen(false);
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`, { duration: 4000 });
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //handle delete
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Create Category - Admin - FoodieFinds"}>
      <Grid container>
        <Grid item md={3} container justifyContent={{ xs: "center", md: "" }}>
          <AdminMenu />
        </Grid>
        <Grid item md={9} container justifyContent={{ xs: "center", md: "" }}>
          <h2>Manage Category</h2>
          <Box my={2} sx={{ width: "80%" }}>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              action={"ADD CATEGORY"}
            />
          </Box>
          <div className="categorytable-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <label>Name</label>
                  </th>
                  <th>
                    <label>Edit</label>
                  </th>
                  <th>
                    <label>Delete</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <>
                    <tr>
                      <td data-label="Name" key={c._id}>
                        {c.name}
                      </td>
                      <td data-label="Edit">
                        <button
                          className="btn-edit"
                          onClick={() => {
                            setOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit{" "}
                        </button>
                      </td>
                      <td data-label="Delete">
                        <button
                          className="btn-delete"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete{" "}
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                  action={"Edit"}
                />
              </Box>
            </Fade>
          </Modal>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateCategory;
