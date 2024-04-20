import React, { useState } from "react";
import EditButton from "../EditButton";
const Login = ({ isConnected, closeModal }) => {
  const [email, setEmil] = useState("");
  const [pass, setPass] = useState("");

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
        //className="bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50 p-10 rounded-lg relative w-full max-w-md"
        className="bg-white p-10 rounded-lg relative w-full max-w-md"
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
            <div className="flex justify-between items-center">
              {/* <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button> */}
              <EditButton
                type="submit"
                text="Login"
                additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black w-full mt-6"
              />
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-black">
              Don't have an account?
              <button
                onClick={() => {
                  /* Implement sign-up logic */
                }}
                className="text-cyan-600 hover:text-indigo-800 font-medium"
              >
                <p className="ml-1"> Sign Up</p>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
