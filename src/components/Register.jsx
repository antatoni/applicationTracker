import { useState } from "react";
import Header from "./Header";
import { supabase } from "../database/supabase";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (email, pass) => {
    try {
      const { data: userData, error: signUpError } = await supabase.auth.signUp(
        {
          email: email,
          password: pass,
        },
      );
      if (signUpError) {
        console.error(`Problem with signup! ${signUpError.message}`);
        return;
      }

      if (userData.user) {
        const { data: userRowData, error: userError } = await supabase
          .from("users")
          .insert([{ UID: userData.user.id, email: userData.user.email }]);

        if (userError) {
          console.error(
            `Problem with inserting user into DB :${userError.message}`,
          );
          return;
        }
      }

      alert(`Successful register!`);
      router("/");
    } catch (error) {
      console.error(`Problem with signin up user ! : ${error.message}`);
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
              onChange={(e) => handleEmailChange(e)}
              className="border-2 text-center text-2xl font-bold"
            />
            <input
              type="password"
              placeholder="Enter password please..."
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              className="border-2 text-center text-2xl font-bold"
            />
            <button
              className="transition-all-2ms m-2 content-center rounded-lg border-2 border-black bg-[#013086] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#023d8a70]"
              onClick={() => handleSubmit(email, password)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
