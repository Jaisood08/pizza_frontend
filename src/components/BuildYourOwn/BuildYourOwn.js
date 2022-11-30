import { useEffect, useState } from "react";
import axios from "axios";

const BuildYourOwn = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [resp, setResp] = useState("");

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/getAllIngredients`,
      method: "get",
    }).then(
      (response) => {
        console.log("response from api is ", response.data.data);
        setIngredientsList(response.data.data);
      },
      (error) => {
        setResp(error.message);
        console.log("error from api is ", error);
      }
    );
  }, []);

  return (
    <div>
      <p style={{ textAlign: "center", fontSize: "large" }}>
        Pizzeria now gives you options to build your own pizza.Customize your
        pizza by choosing ingredients from the list given below.
      </p>
      <table
        class="table table-striped"
        style={{ maxWidth: "76vw", margin: "auto" }}
      >
        <tbody>
          {ingredientsList.map((I) => {
            return (
              <tr>
                <td style={{ verticalAlign: "middle" }}>
                  <img src={I.image} alt="" />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <b>
                    {I.tname} ₹{I.price}
                  </b>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <input type="checkbox" />
                  <label style={{ fontWeight: 500, color: "#ffc107" }}>
                    Add
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "76vw",
          margin: "auto",
          border: "1px solid black",
          marginBottom: "5px",
        }}
      >
        <div style={{ color: "#050089" }}>
          <h3>
            <b>Total Cost :</b>
          </h3>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <button
            style={{
              padding: "10px",
              margin: "auto",
              backgroundColor: "black",
              color: "#ffc107",
              border: "1px solid #ffc107",
              marginBottom: "10px",
            }}
          >
            Build Ur Pizza
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildYourOwn;
