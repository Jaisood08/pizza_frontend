export default function jay(
  state = { isloggedin: false, user: {}, cart: {} },
  action
) {
  switch (action.type) {
    case "LOGIN":
      state = { ...state };
      state.isloggedin = true;
      state.user = action.payload;
      console.log(action, state);
      return state;
      break;
    case "LOGOUT":
      state = { ...state };
      state.isloggedin = false;
      state.user = {};
      localStorage.removeItem("user");
      console.log(action, state);
      return state;
      break;
    case "CHECK_LOGIN":
      console.log(action, state);
      var temp = localStorage.getItem("user");
      temp = JSON.parse(temp);
      if (!temp) return state;
      console.log(temp);
      state = { ...state };
      state.isloggedin = true;
      state.user = temp;
      console.log(action, state);
      return state;
      break;
    case "ADD_TO_CART":
      state = { ...state };
      state.cart = action.payload;
      console.log(action, state);
      return state;
      break;
    case "FINAL_CART":
      state = { ...state };
      state.cart = action.payload;
      console.log(action, state);
      return state;
      break;
    default:
      return state;
      break;
  }
}
