import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    console.log(`Login: ${email}`);
    setIsLoggedIn(true); // Set isLoggedIn to true after successful login
  };

  // Redirect to home page if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
