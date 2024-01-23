import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const BottomBarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
    to={link.path}
    className = {`relative w-full h-full px-4 py-4 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300" } transition-all duration-200`}
    >
      <span className={`absolute left-0 bottom-0 w-full h-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0" }`}></span>
      <div className="flex flex-wrap  items-center justify-center gap-x-2">
        <Icon className="text-xl md:lg"/>
        <span className="hidden md:block">{link.name}</span>
      </div>
    </NavLink>
  )
};

export default BottomBarLink ;
