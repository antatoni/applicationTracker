import { useState } from "react";
import Header from "./Header";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {};
  return (
    <>
      <Header></Header>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-10 rounded-2xl border-1 bg-[#ADE8F4] p-8">
          <input
            type="text"
            placeholder="Enter email please..."
            value={email}
            onChange={(e) => handleEmailChange(e)}
            className="border-1 text-center text-xl"
          />
          <input
            type="password"
            placeholder="Enter password please..."
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            className="border-1 text-center text-xl"
          />
          <button
            className="transition-all-2ms m-2 content-center rounded-lg border-2 bg-[#0077B6] p-2 text-center text-2xl font-semibold duration-300 hover:bg-[#023E8A]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default Register;
