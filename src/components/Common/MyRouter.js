import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Login from "../User/Login";
import Signup from "../User/Signup";

import Home from "../Home/Home";
import BuildYourOwn from "../BuildYourOwn/BuildYourOwn";

import Navbar from "../Common/Navbar";
import Page404 from "../Common/Page404";
import Checkout from "../Common/Checkout";
import Summary from "../Common/Summary";
import Success from "../Common/Success";
import Failed from "../Common/Failed";

import Search from "../Product/Search";
import CakeInformation from "../Product/CakeInformation";
import CakeAdd from "../Product/CakeAdd";
import Cart from "../Product/Cart";
import Orders from "../Product/Orders";

const MyRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/buildurpizza" element={<BuildYourOwn />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/search" element={<Search />} />

          <Route path="/addcake" element={<CakeAdd />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/checkout" element={<Outlet />}>
            <Route path="" element={<Checkout />} />
            <Route path="summary" element={<Summary />} />
            <Route path="failed" element={<Failed />} />
            <Route path="success" element={<Success />} />
          </Route>

          <Route path="/details/:cakeid" element={<CakeInformation />} />

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
