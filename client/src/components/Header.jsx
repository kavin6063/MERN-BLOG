import React, { useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <Navbar className="border-b-2  dark:bg-[#0E0E10] dark:border-[#1C1C21]">
      {/* editable */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white "
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          JS
        </span>
        Connect
      </Link>
      {/* editable */}
      <form>
        <div className="relative hidden md:inline-block">
          <input type="text" placeholder="Search..." className="search-input" />
          <AiOutlineSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={15}
          />
        </div>
      </form>
      <Button className="w-12 h-10 md:hidden " pill color="gray">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <div className="relative inline-block">
            {/* Label with Avatar */}
            <div
              onClick={toggleDropdown}
              className="flex items-center cursor-pointer p-[5.5px] rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-[#1C1C21]"
            >
              <img
                src={currentUser.profilePicture}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0E0E10] dark:border-[#1C1C21] rounded-lg shadow-lg z-10">
                {/* Dropdown Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="block text-sm font-semibold">
                    {currentUser.username}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">
                    {currentUser.email}
                  </span>
                </div>

                {/* Dropdown Items */}
                <Link to="/dashboard?tab=profile">
                  <div className="px-4 py-2 hover:bg-[#F1F5F9] dark:hover:bg-[#1C1C21] cursor-pointer text-gray-800 dark:text-gray-300 rounded-t-lg">
                    Profile
                  </div>
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-600"></div>

                <div className="px-4 py-2 hover:bg-[#F1F5F9] dark:hover:bg-[#1C1C21] cursor-pointer text-gray-800 dark:text-gray-300 rounded-b-lg">
                  Sign out
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={Link} to="/">
          Home
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={Link} to="/about">
          About
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={Link} to="/projects">
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
