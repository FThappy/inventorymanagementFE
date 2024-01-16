/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { login } from "../../api/apiLogin.ts";
import { loginSuccess } from "../../redux/currentUser.ts";

type MessageError = {
  info: string;
  code: string;
};
type currentUserProps = {
  username: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<MessageError | null>();
  const dispatch = useDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // login(dispatch, { username, password });
    const key = CryptoJS.enc.Latin1.parse("1234567812345678");
    const iv = CryptoJS.enc.Latin1.parse("1234567812345678");
    const _password = await CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString();

    console.log(_password);

    try {
      const res = await login(username, _password);
      const payload: currentUserProps = {
        username: res.data.user.UserName,
        email: res.data.user.email,
        role: res.data.user.Role,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      };
      dispatch(loginSuccess(payload));
      setError(null);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data);
    }
  };

  return (
    <div className="login_container">
      <input
        style={{ padding: 10, marginBottom: 20, width: "48%" }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20, width: "48%" }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{
          padding: 10,
          width: "49.5%",
          backgroundColor: "teal",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Login
      </button>
      {error && <h3 style={{ color: "white" }}>{error.info}</h3>}
    </div>
  );
};

export default Login;
