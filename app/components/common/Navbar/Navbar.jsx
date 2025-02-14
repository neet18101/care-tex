import Link from "next/link";
import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Topbar />
      <div className="shadow">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className=" bg-white-900 container w-full mx-auto px-3 py-2 flex justify-between items-center  ">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M80 160h352M80 256h352M80 352h352"
                />
              </svg>
            </button>
            <Link href="/">
              <img src="/assets/care-text-logo.png" alt="logo" width="150px" />
            </Link>
            <nav
              className={`lg:flex lg:items-center lg:space-x-6 absolute lg:relative  left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent p-4 lg:p-0 ${
                menuOpen ? "block" : "hidden"
              }`}
            >
              <ul className="lg:flex lg:space-x-6">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#f59f8b]  text-black text-lg font-semibold"
                  >
                    Home
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-[#f59f8b] text-black text-lg font-semibold"
                  >
                    Product
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      viewBox="0 0 12 7.41"
                    >
                      <path
                        d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                        opacity="0.7"
                      />
                    </svg>
                  </Link>
                  <ul className="z-10 absolute left-0 w-[200px] mt-2 bg-white text-black rounded shadow-lg opacity-0 invisible translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <li className="px-4 py-2 hover:bg-[#f59f8b] hover:text-[#fff]">
                      <Link href="/shop/new-arrivals/male">New Arrivals</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#f59f8b] hover:text-[#fff]">
                      <Link href="/shop/trending-products/male">
                        Trending Products
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#f59f8b] hover:text-[#fff]">
                      <Link href="/shop/best-seller/male">Best Seller</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:text-[#f59f8b]  text-black text-lg font-semibold"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about-us"
                    className="hover:text-[#f59f8b]  text-black text-lg font-semibold"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/product-details/ginerva-top">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M338.29 338.29L448 448"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
