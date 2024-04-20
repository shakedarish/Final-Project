import React, { useState } from "react";
import EditButton from "../EditButton";
const Login = ({ isConnected, closeModal }) => {
  const [email, setEmil] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleSubmit = () => {
    console.log(`emil: ${email}, pass: ${pass}`);
    isConnected(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-10 rounded-lg relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="space-y-6">
          <div className="flex flex-row justify-center">
            <h2 className="text-2xl font-semibold"> Welcome VidWizard</h2>
            <img src="favicon.ico" alt="Logo" className="h-8 ml-4 " />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmil(e.target.value)}
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password:
              </label>
              <input
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {signUp && (
              <div>
                <label
                  htmlFor="user name"
                  className="block text-sm font-bold text-gray-700"
                >
                  User name:
                </label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="userName"
                  id="userName"
                  name="userName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <div className="flex justify-center items-center">
              <EditButton
                type="submit"
                text={signUp ? "Sign up" : "Login"}
                additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black w-1/2 mt-6"
              />
            </div>
          </form>
          <div className="text-center">
            <p className="text-m text-black">
              {signUp ? "Have an account?" : "Don't have an account?"}
              <button
                onClick={() => {
                  setSignUp(!signUp);
                }}
                className="text-cyan-600 hover:text-cyan-400 font-medium"
              >
                <p className="ml-1">{signUp ? "Login" : "Sign Up"}</p>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
