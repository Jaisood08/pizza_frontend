import axios from "axios";
import { useSelector } from "react-redux";
import "./Pizza.css";
import { Link, useNavigate } from "react-router-dom";
import store from "../../reduxstore/store";
import { useEffect, useState } from "react";

const Pizza = (props) => {
  const {
    description,
    image,
    ingredients,
    name,
    price,
    topping,
    type,
    id: cakeid,
    _id,
  } = props.Pizza;
  var user = useSelector((state) => state.user);
  var cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    UpdateCart();
  }, []);

  const UpdateCart = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/showCart`,
      method: "get",
      headers: {
        authorization: "Bearer " + user.token,
      },
    }).then(
      (response) => {
        console.log("UpdateCartresponse from api is ", response.data);
        store.dispatch({
          type: "ADD_TO_CART",
          payload: response.data,
        });

        const findcart = response.data.data.find((P) => {
          return P.pizza._id == _id;
        });

        if (findcart) {
          setQuantity((Q) => findcart.quantity);
        } else {
          setQuantity((Q) => 0);
        }
      },
      (error) => {
        console.log("error from api is ", error);
      }
    );
  };

  const addtocart = (id) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/addToCart`,
      method: "post",
      headers: {
        authorization: "Bearer " + user.token,
      },
      data: { pizzaId: id, quantity: quantity + 1 },
    }).then(
      (response) => {
        console.log(response.data);
        setQuantity((Q) => Q + 1);
        UpdateCart();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div
      class="card h-100 border-secondary  mb-3 text-center"
      style={{ boxShadow: "10px 10px 13px -2px #888" }}
    >
      <div class="row">
        <div class="col-3 p-4">
          <h3>{name}</h3>
          {type == "veg" ? <div class="veg"></div> : <div class="nonVeg"></div>}
          <p style={{ fontWeight: "650" }}>₹ {price}</p>
        </div>
        <div class="col-5">
          <div style={{ textAlign: "left" }}>
            <p>{description}</p>
            <p>
              <b>Ingredients :</b>
              {ingredients.join(",")}
            </p>
            <p>
              <b>Topping :</b>
              {topping.join(",")}
            </p>
          </div>
        </div>
        <div class="col-4" style={{ margin: "auto" }}>
          <img src={image} style={{ maxHeight: "250px", maxHeight: "250px" }} />

          {quantity == 0 ? (
            <button
              onClick={() => {
                if (!user.token) {
                  navigate("/login");
                } else {
                  addtocart(_id);
                }
              }}
              type="button"
              class="btn btn-warning"
            >
              <div class="cartButton">Add to Cart</div>{" "}
            </button>
          ) : (
            <button
              onClick={() => {
                if (!user.token) {
                  navigate("/login");
                } else {
                  navigate(`/buildurpizza?_id=${_id}`);
                }
              }}
              type="button"
              class="btn btn-warning"
            >
              <div class="cartButton">Customize this pizza</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pizza;
