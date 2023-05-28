import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Grid } from "@mui/material";
import Layout from "../../components/Layout/Layout";

const UserDetails = () => {
  return (
    <Layout title={"Users details - Admin - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <AdminMenu />
        </Grid>
        <Grid item md={9}>
          User Details
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserDetails;
