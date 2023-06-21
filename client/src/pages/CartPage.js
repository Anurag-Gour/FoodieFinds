import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../style/CartPage.css";
import { Box, Button } from "@mui/material";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const navigate = useNavigate();
  //states
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //total calculator
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h3 style={{ margin: "auto", textAlign: "center" }}>{`Hello ${
        auth?.token && auth?.user?.name
      }`}</h3>
      <h3 style={{ margin: "auto", textAlign: "center" }}>
        {cart?.length
          ? `You Have ${cart.length} items in your cart ${
              auth?.token ? "" : "please login to checkout"
            }`
          : " Your Cart Is Empty"}
      </h3>
      <h2 style={{ margin: "10px auto", textAlign: "center" }}>Your Cart</h2>
      <div className="small-container cart-page">
        <table className="cart-table">
          <tbody>
            <tr className=".cart-tr">
              <th className=".cart-th">Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cart?.map((p) => (
              <tr>
                <td>
                  <div className="cart-info">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div>
                      <p>{p.name}</p>
                      <small>Price ${p.price}</small>
                      <br />
                      <a href="#" onClick={() => removeCartItem(p._id)}>
                        Remove
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <input type="number" defaultValue={1} />
                </td>
                <td>${p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{totalPrice()}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>00.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{totalPrice()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {auth?.user?.address ? (
          <>
            <Box
              m={4}
              style={{ display: "flex", flexDirection: "column" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <h3>Deliver to address : {auth?.user?.address}</h3>
              <Button
                variant="contained"
                style={{ maxWidth: "450px" }}
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Change Delivery Address
              </Button>
            </Box>
          </>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <Button
                variant="contained"
                style={{ maxWidth: "450px" }}
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Change Delivery Address
              </Button>
            ) : (
              <Box
                m={4}
                style={{ display: "flex", flexDirection: "column" }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  style={{
                    backgroundColor: "#ecbb08",
                    color: "black",
                    maxWidth: "450px",
                  }}
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </Button>
              </Box>
            )}
          </div>
        )}
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <Button
              className="btn-hover color-5"
              style={{
                backgroundColor: "#24bf48",
                color: "black",
                maxWidth: "450px",
                "&:hover": {
                  backgroundColor: "#efefef",
                },
              }}
              onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
