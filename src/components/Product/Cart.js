import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cake from "../Common/Cake";
import Loader from "../Common/Loader";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cakeList, setCakeList] = useState([]);
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState({ price: 0, quantity: 0 });
  var user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function finaliseCart() {
    dispatch({
      type: "FINAL_CART",
      payload: { cakes: cakeList, cartDetails },
    });
  }

  useEffect(() => {
    if (user.token) {
      axios({
        url: "https://apifromashu.herokuapp.com/api/cakecart",
        method: "get",
        headers: {
          Authorization: user.token,
        },
      }).then(
        (response) => {
          console.log("response from api is ", response.data);
          setCakeList(response.data.data);

          let tempPrice = 0;
          let tempQuantity = 0;

          response.data.data.forEach((element) => {
            tempPrice += element.quantity * element.price;
            tempQuantity += element.quantity;
          });

          setCartDetails((state) => {
            return { ...state, price: tempPrice, quantity: tempQuantity };
          });
          setLoading(false);
        },
        (error) => {
          setResp(error.message);
          console.log("error from api is ", error);
          setLoading(false);
        }
      );
    }
  }, [user, loading]);

  if (loading) {
    return <Loader />;
  } else
    return (
      <div>
        <div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Your Cart</h1>

            <div class="row ">
              {cakeList.map((cakeIt) => {
                return (
                  <div class="col">
                    <Cake
                      key={cakeIt.cakeid}
                      Cake={{
                        Name: cakeIt.name,
                        URL: cakeIt.image,
                        Price: cakeIt.price,
                        cakeid: cakeIt.cakeid,
                        quantity: cakeIt.quantity,
                        setLoading: setLoading,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <table style={{ border: "1px solid black", minWidth: "200px" }}>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Quantity</th>
                <th style={{ border: "1px solid black" }}>Total Price</th>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>
                  {cartDetails.quantity}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {cartDetails.price}
                </td>
              </tr>
            </table>

            <Link to="/checkout">
              <button
                onClick={() => {
                  finaliseCart();
                }}
                class="btn btn-primary"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Cart;
