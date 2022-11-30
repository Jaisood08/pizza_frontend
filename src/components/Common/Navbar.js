import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../reduxstore/store";
import { useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  var navigate = useNavigate();
  var isloggedin = useSelector((state) => state.isloggedin);
  var user = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch({
      type: "CHECK_LOGIN",
    });
  }, []);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link to="/">
          <div class="container">
            <div class="Title">Pizzeria</div>
            <img src="PizzeriaLogo.png" alt="Pizzeria" />
          </div>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/orderpizza">
                <div class="links">Order Pizza</div>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/buildurpizza">
                <div class="links">Build Ur Pizza</div>
              </Link>
            </li>
          </ul>

          {isloggedin ? (
            <div class="row" style={{ display: "contents" }}>
              <div class="col" style={{ textAlign: "end" }}>
                <div class="col">
                  <p>Hello {user.name}</p>
                </div>
                <button
                  onClick={() => {
                    store.dispatch({
                      type: "LOGOUT",
                    });
                    navigate("/login");
                  }}
                  type="button"
                  class="btn btn-danger"
                >
                  Logout
                </button>
                <Link to="/cart">
                  <button type="button" class="btn btn-warning">
                    <div class="cartButton">
                      <img src="shopping-cart.png" alt="cart" />
                      Shoping cart
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div class="row" style={{ display: "contents" }}>
              <div class="col">
                <Link to="/login">
                  <button type="button" class="btn btn-primary">
                    Login
                  </button>
                </Link>
                <Link to="/cart">
                  <button type="button" class="btn btn-warning">
                    <div class="cartButton">
                      <img src="shopping-cart.png" alt="cart" />
                      Shoping cart
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
