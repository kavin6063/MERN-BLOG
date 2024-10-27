import React, { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full md:w-56  bg-white text-black  dark:bg-[#0E0E10] border-r dark:border-[#1C1C21] md:min-h-screen min-h-0 md:rounded-r-md rounded-b-md p-4">
      <div className="space-y-2">
        {/* Sidebar item group */}
        <Link to="/dashboard?tab=profile">
          <div
            className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-slate-100  dark:hover:bg-[#1C1C21] ${
              tab === "profile"
                ? " dark:text-white bg-slate-100  dark:bg-[#1C1C21]"
                : ""
            }`}
          >
            <HiUser className="dark:text-white mr-3" size={20} />
            <span className="dark:text-[#ACACAC] font-medium">Profile</span>
          </div>
        </Link>
        <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-slate-100  dark:hover:bg-[#1C1C21]">
          <HiArrowSmRight className="dark:text-white mr-3" size={20} />
          <span className="dark:text-[#ACACAC] font-medium">Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
