import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendEmil } from "../../util/serverUtils";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (!agreed) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Please agree to the privacy policy befor submitting the form.",
        confirmButtonText: "Back",
        confirmButtonColor: "#64bcbf",
      });
      return;
    }
    const response = await sendEmil(contactInfo);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Thnak you for contact us :)",
        confirmButtonText: "Done",
        confirmButtonColor: "#64bcbf",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Something went wrong, please try again",
        confirmButtonText: "Back",
        confirmButtonColor: "#64bcbf",
      });
    }
  };

  return (
    <>
      <div className="w-full h-[1100px] rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="h-full flex flex-col justify-start items-center my-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Please Contact Us for any Help{" "}
          </p>
        </div>
        <form onSubmit={handleClick} className="mt-10 w-2/7 mb-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-lg font-semibold leading-6"
              >
                First name:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="first-name"
                  value={contactInfo.firstName}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      firstName: e.target.value,
                    })
                  }
                  autoComplete="given-name"
                  className="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-lg font-semibold leading-6"
              >
                Last name:
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="text"
                  id="last-name"
                  value={contactInfo.lastName}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, lastName: e.target.value })
                  }
                  autoComplete="family-name"
                  className="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-lg font-semibold leading-6"
              >
                Company:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="company"
                  value={contactInfo.company}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, company: e.target.value })
                  }
                  autoComplete="organization"
                  className="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-lg font-semibold leading-6"
              >
                Email:
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="email"
                  id="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  autoComplete="email"
                  className="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-lg font-semibold leading-6"
              >
                Phone number:
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="tel"
                  id="phone-number"
                  value={contactInfo.phoneNumber}
                  onChange={(e) => {
                    const phoneNumber = e.target.value.replace(/[^0-9+]/g, "");
                    setContactInfo({
                      ...contactInfo,
                      phoneNumber: phoneNumber,
                    });
                  }}
                  autoComplete="tel"
                  pattern="[0-9+]*"
                  className="block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-lg font-semibold leading-6"
              >
                Message:
              </label>
              <div className="mt-2.5">
                <textarea
                  required
                  id="message"
                  value={contactInfo.message}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, message: e.target.value })
                  }
                  rows={4}
                  className="block w-full rounded-xl resize-none border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-lg"
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? "bg-cyan-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  )}
                  required
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <Link to="/policy" className="font-semibold text-cyan-600">
                  privacy&nbsp;policy.
                </Link>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-xl bg-cyan-600 text-center text-2xl py-2 font-semibold text-white shadow-sm hover:bg-cyan-800"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
