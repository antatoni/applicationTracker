import { useState, useContext } from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionStorage";
import { authService } from "../services/authService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useNavigate();
  const { setSession } = useContext(SessionContext);

  const handleSubmit = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long !");
      return;
    }

    setLoading(true);
    try {
      const data = await authService.register(email, password);
      setSession({ token: data.token, UserUid: data.UserUid });
      router("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="relative min-h-screen">
        <Header></Header>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto flex flex-col gap-10 rounded-2xl border-1 bg-gradient-to-b from-[#ADE8F4] via-[#0096C7] to-[#03045E] p-8">
            <input
              type="email"
              placeholder="Enter email please..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 text-center text-2xl font-bold"
            />
            <input
              type="password"
              placeholder="Enter password please..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 text-center text-2xl font-bold"
            />
            <input
              type="password"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 text-center text-2xl font-bold"
            />
            {error && <p className="text-center text-red-500">{error}</p>}
            <button
              disabled={loading}
              className="transition-all-2ms m-2 content-center rounded-lg border-2 border-black bg-[#013086] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#023d8a70]"
              onClick={() => handleSubmit()}
            >
              {loading ? "Registering..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
