import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../style/Auth.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, { duration: 4000 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
          <h3 className="title">Login with</h3>
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
            <button type="submit">Login</button>
          </form>
          <p className="additional-act">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
          <p className="additional-act">
            Forgot Password? <Link to="/forgotpassword">Click here</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
