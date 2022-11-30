import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import store from "../../reduxstore/store";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [resp, setResp] = useState("");
  const [userLogged, setuserLogged] = useState({});

  const navigate = useNavigate();

  const getUser = (e, type) => {
    switch (type) {
      case "email":
        setUser((user) => {
          return { ...user, email: e.target.value };
        });
        break;

      case "password":
        setUser((user) => {
          return { ...user, password: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  const userLogin = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      method: "post",
      data: user,
    }).then(
      (response) => {
        console.log("response from api is ", response.data);
        setResp("Logged In Succesfully");
        setuserLogged(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        store.dispatch({
          type: "LOGIN",
          payload: response.data,
        });
        navigate("/");
      },
      (error) => {
        setResp(error.message);
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
        <h2>Login</h2>
        <input
          onChange={(e) => getUser(e, "email")}
          placeholder="Email"
        ></input>
        <input
          type="password"
          onChange={(e) => getUser(e, "password")}
          placeholder="Password"
        ></input>
        <br />
        <button onClick={userLogin}>Login</button>
        <br />
        <h3>{resp}</h3>
        {/*
        resp != "" && <pre>{JSON.stringify(userLogged, null, 2)}</pre>
        */}
        <Link to="/signup"> Signup Up Here </Link>
      </div>
      <hr />
    </div>
  );
};

export default Login;
