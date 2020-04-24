const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");

      return {
        ...state,
        authError: "Login Failed",
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      console.log("signup success");
      return {
        ...state,
        authError: action.err.message,
      };
    case "SAME_USERNAME":
      return {
        ...state,
        authError: "This username is used please choose different.",
      };

    default:
      return state;
  }
};

export default authReducer;
