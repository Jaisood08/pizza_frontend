import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  let cart = useSelector((state) => {
    return state.cart;
  });

  let user = useSelector((state) => {
    return state.user;
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: user.name,
    address: "",
    city: "",
    pincode: "",
    phone: "",
    cakes: [],
    price: 0,
  });

  const navigate = useNavigate();

  const order = () => {
    console.log(user, cart);

    const data = {
      ...deliveryDetails,
      cakes: cart.cakes,
      price: cart.cartDetails.price,
    };

    axios({
      url: "https://apifromashu.herokuapp.com/api/addcakeorder",
      method: "post",
      data: data,
      headers: {
        Authorization: user.token,
      },
    }).then(
      (res) => {
        if (res.data.order) {
          console.log("Orderd placed Succesfully ", res.data);
          navigate("/checkout/success");
        } else {
          console.log("Orderd placed Failed ", res.data);
          navigate("/checkout/failed");
        }
      },
      (error) => {
        console.log("Orderd placed Failed ", error);
        navigate("/checkout/failed");
      }
    );
  };

  function getDeliveryDetails(type, v) {
    switch (type) {
      case "name":
        setDeliveryDetails((state) => {
          return { ...state, name: v.target.value };
        });
        break;
      case "address":
        setDeliveryDetails((state) => {
          return { ...state, address: v.target.value };
        });
        break;
      case "city":
        setDeliveryDetails((state) => {
          return { ...state, city: v.target.value };
        });
        break;
      case "pincode":
        setDeliveryDetails((state) => {
          return { ...state, pincode: v.target.value };
        });
        break;
      case "phone":
        setDeliveryDetails((state) => {
          return { ...state, phone: v.target.value };
        });
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <hr />
        <h1>Checkout Componenet</h1>
        <input
          onChange={(e) => {
            getDeliveryDetails("name", e);
          }}
          placeholder="Name"
          value={user.name}
        />
        <input
          onChange={(e) => {
            getDeliveryDetails("address", e);
          }}
          placeholder="Address"
        />
        <input
          onChange={(e) => {
            getDeliveryDetails("city", e);
          }}
          placeholder="City"
        />
        <input
          onChange={(e) => {
            getDeliveryDetails("pincode", e);
          }}
          placeholder="Pincode"
        />
        <input
          onChange={(e) => {
            getDeliveryDetails("phone", e);
          }}
          placeholder="Phone"
        />

        <br />
        <button onClick={order} class="btn btn-success">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Checkout;
