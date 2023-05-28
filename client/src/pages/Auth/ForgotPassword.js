import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../style/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [secretkey, setSecretKey] = useState("");
  const navigate = useNavigate();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newpassword,
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
    <Layout title={"Forgot Password - FoodieFinds"}>
      <section className="login">
        <div className="container">
          <h3 className="title">Reset Password</h3>
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
              <label htmlFor="secretkey">Email</label>
              <input
                value={secretkey}
                onChange={(e) => setSecretKey(e.target.value)}
                type="text"
                id="secretkey"
                placeholder="Secret Key"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newpassword">New Password</label>
              <input
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                id="newpassword"
                placeholder="New Password"
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
          <p className="additional-act">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
          <p className="additional-act">
            Already have an account? <Link to="/login">Click here</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
