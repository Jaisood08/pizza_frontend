import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../Common/Loader";
import Page404 from "../Common/Page404";
import { Link, useNavigate } from "react-router-dom";

function CakeInformation() {
  var params = useParams();
  var [cake, setCake] = useState();
  var [isLoading, setIsLoading] = useState(true);
  var [error, setError] = useState(false);
  var isloggedin = useSelector((state) => state.isloggedin);
  var user = useSelector((state) => state.user);

  var navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://apifromashu.herokuapp.com/api/cake/" + params.cakeid,
    }).then(
      (response) => {
        console.log("Cake Details Deetails :: ", response.data);
        setCake(response.data.data);
        setIsLoading(false);
      },
      (error) => {
        console.log("Cake Details Error :: ", error);
        setIsLoading(false);
        setError(true);
      }
    );
  }, []);

  function addToCart() {
    if (isloggedin) {
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
          if (response.data.data) {
            // navigate to cart
            navigate("/cart");
          }
        },
        (error) => {
          console.log("error from add to cart api", error);
        }
      );
    } else {
      navigate("/login");
    }
  }

  if (!isLoading) {
    if (!cake) {
      return <Page404 />;
    } else
      return (
        <div className="container mt-4">
          <h1>{cake.name}</h1>
          <section className="cake-details mb-5 pt-4 pb-4">
            <div className="col-md-12 row">
              <div className="col-md-5 mb-4 mb-md-0">
                <div className="mdb-lightbox">
                  <div className="row product-gallery mx-1">
                    <div className="col-12 mb-0">
                      <div className="view rounded z-depth-1 main-img">
                        <a href={cake.image} data-size="710x823">
                          <img
                            src={cake.image}
                            alt={cake.name}
                            className="img-fluid z-depth-1"
                            style={{ width: "100%" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <h5>{cake.name}</h5>
                <p className="mb-2 text-muted text-uppercase small">
                  {cake.reviews} reviews
                </p>

                <p>
                  <span className="mr-1">
                    <strong>₹{cake.price}</strong>
                  </span>
                </p>
                <p className="pt-1">{cake.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Flavour</strong>
                        </th>
                        <td>{cake.flavour}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Ingredients</strong>
                        </th>
                        <td>{cake.ingredients?.join()}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Occasion</strong>
                        </th>
                        <td>{cake.type}</td>
                      </tr>
                      <tr>
                        <th className="pl-0 w-25" scope="row">
                          <strong>Weight</strong>
                        </th>
                        <td>{cake.weight} kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                {/* <button type="button" className="btn btn-primary btn-md mr-1 mb-2">Buy now</button> */}
                {!isLoading && (
                  <button
                    onClick={addToCart}
                    type="button"
                    className="btn btn-light btn-md mr-1 mb-2"
                  >
                    <i className="fas fa-shopping-cart pr-2"></i>Add to cart
                  </button>
                )}
                {isLoading && (
                  <button
                    type="button"
                    className="btn btn-light btn-md mr-1 mb-2"
                    disabled
                  >
                    <i className="fas fa-shopping-cart pr-2"></i> Please wait...
                    Adding to cart
                  </button>
                )}
              </div>
              <div className="col-md-3">
                <img src="/safety.png" className="img-fluid"></img>
              </div>
            </div>
          </section>
        </div>
      );
  } else {
    return <Loader />;
  }
}

export default CakeInformation;
