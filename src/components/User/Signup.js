import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    areacode: "",
    address: "",
    mobile: "",
  });
  const [resp, setResp] = useState("");

  const getUser = (e, type) => {
    switch (type) {
      case "Name":
        setUser((user) => {
          return { ...user, name: e.target.value };
        });
        break;
      case "Email":
        setUser((user) => {
          return { ...user, email: e.target.value };
        });
        break;
      case "Password":
        setUser((user) => {
          return { ...user, password: e.target.value };
        });
        break;
      case "Areacode":
        setUser((user) => {
          return { ...user, areacode: e.target.value };
        });
        break;
      case "Address":
        setUser((user) => {
          return { ...user, address: e.target.value };
        });
        break;
      case "Mobile":
        setUser((user) => {
          return { ...user, mobile: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  const callApi = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/user/add`,
      method: "post",
      data: user,
    }).then(
      (response) => {
        console.log("response from api is ", response.data);
        setResp(response.data.message);
      },
      (error) => {
        setResp(error.error);
        console.log("error from api is ", error);
      }
    );
  };

  return (
    <div>
      <hr />
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2>Signup</h2>

        <input
          onChange={(e) => {
            getUser(e, "Name");
          }}
          placeholder="Name"
        ></input>
        <input
          onChange={(e) => {
            getUser(e, "Email");
          }}
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => {
            getUser(e, "Password");
          }}
          type="password"
          placeholder="Password"
        ></input>
        <input
          onChange={(e) => {
            getUser(e, "Areacode");
          }}
          type="Areacode"
          placeholder="Areacode"
        ></input>
        <input
          onChange={(e) => {
            getUser(e, "Address");
          }}
          type="Address"
          placeholder="Address"
        ></input>
        <input
          onChange={(e) => {
            getUser(e, "Mobile");
          }}
          type="Mobile"
          placeholder="Mobile"
        ></input>

        <br />
        <button onClick={callApi}>Signup</button>
        <br />
        <h3>{resp}</h3>
        <Link to="/login"> Login Here</Link>
      </div>
      <hr />
    </div>
  );
};

export default Signup;
