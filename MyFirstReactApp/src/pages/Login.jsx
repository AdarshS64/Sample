import { useEffect, useRef, useState } from "react";
import loginImage from "../assets/kv-login_720.jpg";
import "./style.scss";
import Button from "../components/Button";
import logo from "../assets/kv-logo.png";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/LoginApi/api";

const Login = ({ handleSubmit }) => {
  const [count, setCount] = useState(0);
  const userNameref = useRef();
  const [text, setText] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [login, { isSuccess, data }] = useLoginMutation();

  // const navigate = navigator();

  // useEffect(() => {
  //   // if (userNameref.current){
  //   //   isInitialMount.current = false;
  //   // } else setColor("white");
  //   if (color == "white") {
  //     setColor("black");
  //   } else setColor("white");
  // }, [count]);

  useEffect(() => {
    userNameref.current.focus();
  }, []);

  const onChange = (e) => {
    if (e.target.value.length < 30) {
      setText(e.target.value);
      setErr("");
    } else {
      setErr("!!!character limit reached");
    }
  };

  const onPass = (e) => {
    setPass(e.target.value);
  };

  const options = [
    {
      key: 1,
      type: "text",
      label: "username",
      value: text,
      onChange: onChange,
      err: err,
      ref: userNameref,
    },
    {
      key: 2,
      type: "password",
      label: "password",
      value: pass,
      onChange: onPass,
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email: text, password: pass });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.token, "mew");
      localStorage.setItem("token", data.data.token);
      navigate("/employee");
    }
  }, [isSuccess, data]);

  // const handleCount = (e) => {
  //   e.preventDefault();
  //   // setTimeout(() => {
  //   //   console.log(count);
  //   //   setCount(count - 2);
  //   // }, 0);
  //   setCount(count + 5);
  // };

  return (
    <>
      <main>
        <div className="left-side">
          <div className="box">
            <span className="dot">
              <img src={loginImage} alt="KeyValue Systems logo" />
            </span>
          </div>
        </div>
        <div className="input-side">
          <form>
            <img src={logo} alt="KeyValue Systems logo" />
            {options.map((options) => {
              return (
                <TextField
                  type={options.type}
                  label={options.label}
                  value={options.value}
                  onChange={options.onChange}
                  // placeholder={options.label}
                  err={options.err ? options.err : ""}
                  {...(options.ref && {
                    ref: options.ref,
                  })}
                />
              );
            })}
            <Button value="Submit" handleSub={handleLogin} />
            {/* {count}
            <Button value=" add" type="" handleSub={handleCount} />
            <Button
              value="plus 100"
              type=""
              handleSub={(e) => {
                e.preventDefault(e);
                setCount((prev) => prev + 100);
              }}
            />
            <Button
              value="reset"
              type=""
              color={color}
              textcolor={color == "black" ? "white" : "black"}
              handleSub={(e) => {
                e.preventDefault(e);
                setCount((prev) => prev - prev);
              }}
            /> */}
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
