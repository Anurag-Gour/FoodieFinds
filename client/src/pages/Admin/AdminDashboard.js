import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Grid } from "@mui/material";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <AdminMenu />
        </Grid>
        <Grid item md={9}>
          <h3>Admin Name : {auth?.user?.name}</h3>
          <h3>Admin Email : {auth?.user?.email}</h3>
          <h3>Admin Phone : {auth?.user?.phone}</h3>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
