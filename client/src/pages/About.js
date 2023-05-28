import React from "react";
import Layout from "../components/Layout/Layout";
import "../style/About.css";
const About = () => {
  return (
    <Layout title={"About us - FoodieFinds"}>
      <div>
        <section className="main">
          <div className="main__desc">
            <h1>HUNGRY ? FoodieFinds !</h1>
            <p style={{ textAlign: "center" }}>
              Your one-stop shop for all things food
            </p>
          </div>
          <img
            src="/images/nameLogo.png"
            alt="brandLogo"
            className="main__image"
          />
        </section>
        <section className="excellence">
          <p className="tag rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.776"
              height="17.184"
              viewBox="0 0 25.776 17.184"
            >
              <path
                id="Icon_awesome-eye"
                data-name="Icon awesome-eye"
                d="M25.62,12.439A14.353,14.353,0,0,0,12.888,4.5,14.355,14.355,0,0,0,.156,12.439a1.448,1.448,0,0,0,0,1.306,14.353,14.353,0,0,0,12.732,7.939A14.355,14.355,0,0,0,25.62,13.745,1.448,1.448,0,0,0,25.62,12.439Zm-12.732,7.1a6.444,6.444,0,1,1,6.444-6.444A6.444,6.444,0,0,1,12.888,19.536Zm0-10.74a4.265,4.265,0,0,0-1.133.17,2.141,2.141,0,0,1-2.994,2.994A4.286,4.286,0,1,0,12.888,8.8Z"
                transform="translate(0 -4.5)"
                fill="#722ed1"
              />
            </svg>
            &nbsp;Why FoodieFinds ?
          </p>
          <h2>Get actionable insights from Big Data in 3 steps</h2>
          <p className="excellence__desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <div className="excellence__items">
            <div className="excellence__item">
              <div className="background-success excellence__icon flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height="16.437"
                  viewBox="0 0 16 16.437"
                >
                  <g id="timeline" transform="translate(-0.219)">
                    <g id="Group_15" data-name="Group 15">
                      <path
                        id="Path_618"
                        data-name="Path 618"
                        d="M14.568,0H13.541V7.7H12V8.732h1.541v7.7h1.027V13.355h1.541V12.328H14.568V4.109h1.541V3.082H14.568Z"
                        transform="translate(-5.836)"
                        fill="#52c41a"
                      />
                      <rect
                        id="Rectangle_370"
                        data-name="Rectangle 370"
                        width={5}
                        height={5}
                        rx={1}
                        transform="translate(11.219 1.219)"
                        fill="#52c41a"
                      />
                      <rect
                        id="Rectangle_371"
                        data-name="Rectangle 371"
                        width={5}
                        height={5}
                        rx={1}
                        transform="translate(11.219 10.219)"
                        fill="#52c41a"
                      />
                      <rect
                        id="Rectangle_372"
                        data-name="Rectangle 372"
                        width={5}
                        height={6}
                        rx={1}
                        transform="translate(0.219 5.219)"
                        fill="#52c41a"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3>
                Data
                <br />
                in real-time
              </h3>
              <p>
                Collect data in real-time from multiple channels and move it
                into a data lake, in its original format.
              </p>
            </div>
            <div className="excellence__item">
              <div className="background-danger excellence__icon flex items-center justify-center">
                <svg
                  id="newsletter-dev"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.092"
                  height="16.092"
                  viewBox="0 0 16.092 16.092"
                >
                  <g id="Group_19" data-name="Group 19">
                    <path
                      id="Path_628"
                      data-name="Path 628"
                      d="M4.111,7.973V1.006h9.052V7.973l2.907-1.615-1.9-1.115V.5a.5.5,0,0,0-.5-.5H3.608a.5.5,0,0,0-.5.5V5.241L1.188,6.35Z"
                      transform="translate(-0.591)"
                      fill="#f5222d"
                    />
                    <path
                      id="Path_629"
                      data-name="Path 629"
                      d="M8.29,18.589a.5.5,0,0,1-.488,0L0,14.255v8.42a.5.5,0,0,0,.5.5H15.589a.5.5,0,0,0,.5-.5v-8.42Z"
                      transform="translate(0 -7.087)"
                      fill="#f5222d"
                    />
                    <path
                      id="Path_630"
                      data-name="Path 630"
                      d="M11.011,10.025,9.147,8.161a.5.5,0,0,1,0-.711l1.864-1.864.711.711L10.214,7.806l1.509,1.509Z"
                      transform="translate(-4.474 -2.777)"
                      fill="#f5222d"
                    />
                    <path
                      id="Path_631"
                      data-name="Path 631"
                      d="M18.3,10.025l-.711-.711,1.509-1.509L17.586,6.3l.711-.711L20.161,7.45a.5.5,0,0,1,0,.711Z"
                      transform="translate(-8.743 -2.777)"
                      fill="#f5222d"
                    />
                  </g>
                </svg>
              </div>
              <h3>
                Powerful
                <br />
                algorithms
              </h3>
              <p>
                With the help of powerful algorithms, quality rules &amp;
                techniques, obtain simplified &amp; enriched data.
              </p>
            </div>
            <div className="excellence__item">
              <div className="background-info excellence__icon flex items-center justify-center">
                <svg
                  id="chart-bar-33"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.32"
                  height="17.32"
                  viewBox="0 0 17.32 17.32"
                >
                  <g id="Group_18" data-name="Group 18">
                    <path
                      id="Path_624"
                      data-name="Path 624"
                      d="M15.789,17H12.541a.541.541,0,0,0-.541.541v7.036a.541.541,0,0,0,.541.541h3.248a.541.541,0,0,0,.541-.541V17.541A.541.541,0,0,0,15.789,17Z"
                      transform="translate(-5.505 -7.799)"
                      fill="#1890ff"
                    />
                    <path
                      id="Path_625"
                      data-name="Path 625"
                      d="M3.789,23H.541A.541.541,0,0,0,0,23.541V27.33a.541.541,0,0,0,.541.541H3.789a.541.541,0,0,0,.541-.541V23.541A.541.541,0,0,0,3.789,23Z"
                      transform="translate(0 -10.551)"
                      fill="#1890ff"
                    />
                    <path
                      id="Path_626"
                      data-name="Path 626"
                      d="M27.789,11H24.541a.541.541,0,0,0-.541.541V21.825a.541.541,0,0,0,.541.541h3.248a.541.541,0,0,0,.541-.541V11.541A.541.541,0,0,0,27.789,11Z"
                      transform="translate(-11.01 -5.046)"
                      fill="#1890ff"
                    />
                    <path
                      id="Path_627"
                      data-name="Path 627"
                      d="M11.088,6.5a.54.54,0,0,0,.383-.159L15.96,1.848V4.33h1.083V.541A.541.541,0,0,0,16.5,0H12.712V1.083h2.482L11.088,5.189,8.765,2.865a.541.541,0,0,0-.765,0L5.293,5.571l.765.765L8.382,4.013l2.324,2.324A.54.54,0,0,0,11.088,6.5Z"
                      transform="translate(-2.428)"
                      fill="#1890ff"
                    />
                  </g>
                </svg>
              </div>
              <h3>
                Valuable business
                <br />
                insights
              </h3>
              <p>
                Collect processed &amp; cleansed data that is ready to be
                analyzed to gather valuable business insights.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
