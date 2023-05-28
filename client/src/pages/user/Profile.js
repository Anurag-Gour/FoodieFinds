import React from "react";
import Layout from "../../components/Layout/Layout";
import { Grid } from "@mui/material";
import UserMenu from "../../components/Layout/UserMenu";

const Profile = () => {
  return (
    <Layout title={"Order details - User - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <UserMenu />
        </Grid>
        <Grid item md={9}>
          <h2>Profile</h2>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
