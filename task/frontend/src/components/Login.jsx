import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    console.log("data", data);

    try {
      const response = await axios.post("http://localhost:8080/user/login", data);
      console.log("Response: ", response);

      //console.log("Response: ", response.data.token);
      //console.log("Response: ", response.data.existingUser)

      const token = response.data.token
      const existingUserInfo = response.data.existingUser
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('userinfo', JSON.stringify(existingUserInfo))

      //console.log(" token",token)
      //console.log(" info",existingUserInfo)



      if (response.status === 200) {
        alert('loged in Succesfully')
        navigate('/showuser')
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup"); 
  };

  return (
    <div className="login-container bg-info-subtle">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <div className="profile-icon">
          <i className="fa fa-user-circle"></i>
        </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <button
            type="button"
            className="signup-button"
            onClick={handleSignupClick}
          >
           if you don't have Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
