import { useEffect, useState } from "react";
import axios from "axios";
import Cake from "../Common/Cake";

const ApiCakeList = () => {
  const [cakeList, setCakeList] = useState([]);
  const [resp, setResp] = useState("");

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/pizza/getAll`,
      method: "get",
    }).then(
      (response) => {
        console.log("response from api is ", response.data.data);
        setCakeList(response.data.data);
      },
      (error) => {
        setResp(error.message);
        console.log("error from api is ", error);
      }
    );
  }, []);
  return (
    <div>
      <br />
      {cakeList.length == 0 && (
        <div>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      <div class="row row-cols-1 row-cols-md-2 g-3 p-5">
        {cakeList.map((cakeIt) => {
          return (
            <div class="col">
              <Cake key={cakeIt.cakeid} Cake={cakeIt} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiCakeList;
