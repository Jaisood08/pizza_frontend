import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../../reduxstore/store";
import { useEffect, useState } from "react";
import Loader from "../Common/Loader";

const Cart = () => {
  var user = useSelector((state) => state.user);
  var cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!cart || !cart.data) {
      if (user.token) {
        UpdateCart();
      }
    }
  }, [user]);

  const UpdateCart = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/showCart`,
      method: "get",
      headers: {
        authorization: "Bearer " + user.token,
      },
    }).then(
      (response) => {
        console.log("UpdateCart response from api is ", response.data);
        store.dispatch({
          type: "ADD_TO_CART",
          payload: response.data,
        });
      },
      (error) => {
        console.log("error from api is ", error);
      }
    );
  };

  const addtocart = (id, Q) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/addToCart`,
      method: "post",
      headers: {
        authorization: "Bearer " + user.token,
      },
      data: { pizzaId: id, quantity: Q },
    }).then(
      (response) => {
        console.log(response.data);
        UpdateCart();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removecart = (id) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/removeCart`,
      method: "post",
      headers: {
        authorization: "Bearer " + user.token,
      },
      data: { pizzaId: id },
    }).then(
      (response) => {
        console.log(response.data);
        UpdateCart();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (!cart || !cart.data) return <Loader />;
  else {
    if (cart.data.length == 0) {
      return <h2 style={{ textAlign: "center" }}>Empty Cart</h2>;
    } else {
      console.log(cart);
      return (
        <div>
          <table
            class="table table-striped"
            style={{ width: "80vw", margin: "auto" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Customize</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.data.map((P, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img src={P.pizza.image} alt={P.pizza.name} />
                    </td>
                    <td>
                      <div>{P.pizza.name}</div>
                    </td>
                    <td>
                      <input
                        onChange={(e) => {
                          addtocart(P.pizza._id, e.target.value);
                          console.log(e.target.value);
                        }}
                        value={P.quantity}
                        type="number"
                      />
                      <div style={{ margin: "3px auto" }}>
                        <button
                          onClick={() => {
                            removecart(P.pizza._id);
                          }}
                          class="btn btn-danger"
                        >
                          X
                        </button>
                      </div>
                    </td>
                    <td>
                      {P.customize &&
                        P.customize.map((ing) => {
                          return (
                            <div>
                              ({ing.tname},{ing.price}),
                            </div>
                          );
                        })}
                      <div style={{ margin: "3px auto" }}>
                        <button
                          onClick={() => {
                            navigate(`/buildurpizza?_id=${P.pizza._id}`);
                          }}
                          class="btn btn-success"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{price + P.pizza.price * P.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default Cart;
