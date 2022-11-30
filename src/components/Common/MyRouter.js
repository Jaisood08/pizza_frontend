import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Login from "../User/Login";
import Signup from "../User/Signup";

import Navbar from "../Common/Navbar";
import Home from "../Home/Home";
import BuildYourOwn from "../BuildYourOwn/BuildYourOwn";
import Cart from "../Product/Cart";
import About from "../About/About";

import Page404 from "../Common/Page404";

const MyRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<About />} />

          <Route path="/orderpizza" element={<Home />} />

          <Route path="/buildurpizza" element={<BuildYourOwn />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
        <div style={{ width: "100%", border: "1px solid #ffc107" }}>
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "#ffc107",
            }}
          >
            Copyrights @ 2017 Pizzeria . All rights reserved
          </p>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default MyRouter;
