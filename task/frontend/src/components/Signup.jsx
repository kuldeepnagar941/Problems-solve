import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, dateOfBirth, email, password };
    console.log(" Data:", data);

    try {
      const response = await axios.post("http://localhost:8080/user/singup", data);
      console.log("Response: ", response);
      if(response.status===201){
        alert("Account created Succesfully")
        navigate('/login')
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  return (
    <div className="login-container bg-info-subtle">
      <div className="login-box">
        <h2 className="login-title">SIGN UP</h2>
        <div className="profile-icon">
          <i className="fa fa-user-circle"></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <i className="fa fa-user icon"></i>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-calendar icon"></i>
            <input
              type="date"
              className="input-field"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-envelope icon"></i>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock icon"></i>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            SIGN UP
          </button>
        </form>
        <button
          type="button"
          className="navigate-button"
          onClick={handleLoginClick}>
          if you Account have-LOGIN
        </button>
      </div>
    </div>
  );
};

export default Signup;
