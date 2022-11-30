import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Summary.css";

const Summary = () => {
  const [orders, setOrders] = useState([]);
  let user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (!user.token) return;
    console.log(user);
    axios({
      url: "https://apifromashu.herokuapp.com/api/cakeorders",
      method: "get",
      headers: {
        Authorization: user.token,
      },
    }).then(
      (resp) => {
        console.log("My orders", resp.data);
        setOrders(resp.data.cakeorders);
      },
      (error) => {
        console.log("My order Failed", error);
      }
    );
  }, [user.token]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Order Details</h1>
      <table style={{ width: "80%" }}>
        <tr>
          <th>Sr.no</th>
          <th>Order id</th>
          <th>Date</th>
          <th>Total Price</th>
          <th>Completed</th>
        </tr>

        {orders.map((el, index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{el.orderid}</td>
              <td>{new Date(el.orderdate).toLocaleString()}</td>
              <td>{el.price}</td>
              <td>{el.compeleted ? "Yes" : "No"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Summary;
