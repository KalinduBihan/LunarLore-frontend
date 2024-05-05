import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track signup status

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
    setIsSignedUp(true); // Set isSignedUp to true after successful signup
  };

  // Redirect to home page if signed up
  if (isSignedUp) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
