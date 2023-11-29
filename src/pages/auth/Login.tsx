import { Login, LoginForm } from "react-admin";
import ForgotPasswordButton from "./ForgetPassword";

export const LoginPage = (props) => {
  return (
    <Login {...props}>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "20px", margin: 0 }}>
          Login
        </h1>
        <LoginForm {...props} />
        <ForgotPasswordButton />
      </div>
    </Login>
  );
};
