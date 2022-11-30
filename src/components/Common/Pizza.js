import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Pizza.css";

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
  } = props.Pizza;
  var user = useSelector((state) => state.user);

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
          <Link to={"/details/" + cakeid}>
            <img
              src={image}
              style={{ maxHeight: "250px", maxHeight: "250px" }}
            />
          </Link>
          <button type="button" class="btn btn-warning">
            <div class="cartButton">Add to Cart</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
