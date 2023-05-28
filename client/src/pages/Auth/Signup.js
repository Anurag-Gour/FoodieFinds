import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../style/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [secretkey, setSecretKey] = useState("");
  const navigate = useNavigate();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          secretkey,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, { duration: 4000 });
        navigate("/login");
      } else {
        toast.error(res.data.message, { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Signup - FoodieFinds"}>
      <section className="login">
        <div className="container">
          <h3 className="title">Sign up with</h3>
          <div className="social-login">
            <button>
              <i className="fa fa-twitter" />
              Twitter
            </button>
            <button>
              <i className="fa fa-google" />
              Google
            </button>
          </div>
          <p className="separator">
            <span>&nbsp;</span>Or<span>&nbsp;</span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="secretkey">Secret Key</label>
              <input
                value={secretkey}
                onChange={(e) => setSecretKey(e.target.value)}
                type="test"
                id="secretkey"
                placeholder="Add a secret key to rest password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                placeholder="Phone"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                placeholder="Address"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className="additional-act">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
