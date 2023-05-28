import React from "react";
import Layout from "../../components/Layout/Layout";
import { Grid } from "@mui/material";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User Dashboard - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <UserMenu />
        </Grid>
        <Grid item md={9}>
          <h3>User Name : {auth?.user?.name}</h3>
          <h3>User Email : {auth?.user?.email}</h3>
          <h3>User Address : {auth?.user?.address}</h3>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserDashboard;
