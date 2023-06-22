import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Grid } from "@mui/material";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Order details - User - FoodieFinds"}>
      <Grid container>
        <Grid item md={3}>
          <UserMenu />
        </Grid>
        <Grid item md={8} m={1}>
          <h2 style={{ textAlign: "center", fontFamily: "fantasy" }}>
            All orders
          </h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col"> date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((o, i) => {
                  return (
                    <tr key={o._id}>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Orders;
