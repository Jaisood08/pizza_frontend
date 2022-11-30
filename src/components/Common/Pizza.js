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
    setLoading = () => {},
  } = props.Pizza;
  var user = useSelector((state) => state.user);

  const modifyCart = (type, cakeId) => {
    switch (type) {
      case "Remove_One":
        setLoading(true);
        axios({
          url: "https://apifromashu.herokuapp.com/api/removeonecakefromcart",
          method: "post",
          data: { cakeid: cakeId },
          headers: {
            Authorization: user.token,
          },
        }).then(
          (response) => {
            console.log("response from RemoveCake api is ", response.data);
            setLoading(false);
          },
          (error) => {
            console.log("error from RemoveCake api is ", error);
            setLoading(false);
          }
        );

        break;
      case "Remove":
        setLoading(true);
        axios({
          url: "https://apifromashu.herokuapp.com/api/removecakefromcart",
          method: "post",
          data: { cakeid: cakeId },
          headers: {
            Authorization: user.token,
          },
        }).then(
          (response) => {
            console.log("response from RemoveCake api is ", response.data);
            setLoading(false);
          },
          (error) => {
            console.log("error from RemoveCake api is ", error);
            setLoading(false);
          }
        );

        break;

      case "Add":
        setLoading(true);
        axios({
          method: "get",
          url: "https://apifromashu.herokuapp.com/api/cake/" + cakeId,
        }).then(
          (response) => {
            console.log("response from Add api is ", response.data);
            var cake = response.data.data;
            var requestobj = {
              name: cake.name,
              price: cake.price,
              image: cake.image,
              weight: cake.weight,
              cakeid: cake.cakeid,
            };
            // hit the api
            axios({
              url: "https://apifromashu.herokuapp.com/api/addcaketocart",
              method: "post",
              data: requestobj,
              headers: {
                Authorization: user.token,
              },
            }).then(
              (response) => {
                console.log("response from add to cart api", response.data);
                setLoading(false);
              },
              (error) => {
                console.log("error from add to cart api", error);
                setLoading(false);
              }
            );
          },
          (error) => {
            console.log("error from ADd api is ", error);
            setLoading(false);
          }
        );
        break;

      default:
        break;
    }
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
