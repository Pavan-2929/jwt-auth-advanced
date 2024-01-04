import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {currentUser} = useSelector(state => state.user)

  const toggleHeader = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log(currentUser);
  // console.log(
  //   "profilePicture:",
  //   currentUser
  //     ? currentUser.profilePicture
  //     : "No profile picture"
  // );

  return (
    <header className=" p-3 sm:p-[0] text-[1.8rem] font-bold bg-gray-200">
      <div className="flex justify-around items-center flex-wrap">
        <h1>BookHeaven</h1>
        <button onClick={toggleHeader}>
          <FaBars className="block sm:hidden ml-[8rem] mr-[0rem]" />
        </button>

        <ul
          className={`sm:flex ${
            isMenuOpen ? "flex" : "hidden"
          } gap-14 text-[1.5rem] sm:text-2xl my-4`}
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile" className="hover:text-blue-500">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              "Sign In"
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
