import Header from "./Header";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionStorage";
import { authService } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const { setSession } = useContext(SessionContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await authService.login(email, password);
      setSession({ token: data.token, userUid: data.UserUid });
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
              type="text"
              placeholder="Enter email please..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 text-center text-xl"
            />
            <input
              type="password"
              placeholder="Enter password please..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-1 text-center text-xl"
            />
            {error && <p className="text-center text-red-500">{error}</p>}
            <button
              disabled={loading}
              className="transition-all-2ms m-2 content-center rounded-lg border-2 border-black bg-[#013086] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#023d8a70]"
              onClick={() => handleSubmit()}
            >
              {loading ? "Logging in ..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
