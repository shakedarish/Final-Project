import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            &copy; 2024 Our Website. All rights reserved - Shaked & Sean.
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/about-us" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
