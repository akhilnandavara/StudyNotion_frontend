import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/profileDropDown";
import LineMenu from "../core/Auth/lineMenu";



function Navbar() {
  const { token } = useSelector((state) => state.auth); //fetch token from auth reducer using useSelector hook;
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation(); // location is used for location.pathname;

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res?.data?.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  function matchRoute(route) {
    // if route is matched with (current route) then return true and color of text turn yellow otherwise white;
    return matchPath({ path: route }, location.pathname);
  }


  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          {" "}
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={32}
            loading="lazy"
          />{" "}
        </Link>{" "}
        {/* Logo */}
        <nav className="hidden md:block">
          {" "}
          {/* Navigation links */}
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={` flex items-center gap-2 relative group  cursor-pointer  ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                      <BsChevronDown /> {/*   "Catalog \/"   */}
                      <div className=" cursor-pointer absolute left-[50%] top-[50%] z-[1000]  w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 hidden  group-hover:translate-y-[1.65em] group-hover:flex lg:w-[300px] transition-all duration-300 ">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        <div className="absolute -left-[20%] top-0 -z-11 h-6 w-[60%] translate-x-[60%] translate-y-[-50%] opacity-0 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center spinner"></p>
                        ) : subLinks?.length ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={` ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } `}
                    >
                      {" "}
                      {link.title}{" "}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user &&
            user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && user?.accountType !== ACCOUNT_TYPE.ADMIN && ( // if user is present(login) and user is not instructor then we show cart icon in place of login and signup;
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />{" "}
                {/* icon of cart */}
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}{" "}
                    {/* no of item(courses) present in cart , we take it absolute because we want to overlap it over cart icon */}
                  </span>
                )}
              </Link>
            )}
          {/* if token === null then user are not login so we show login icon and sign icon  */}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                {" "}
                Log in{" "}
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                {" "}
                Sign up{" "}
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}{" "}
          {/* added profile dropdown if token is not equal to null means user is present*/}
        </div>


        {/* Menu bar in small Device */}
        <div className="text-richblack-5 flex items-center gap-x-4 md:hidden">
      {/* cart in small device */}
        {user &&
            user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && user?.accountType !== ACCOUNT_TYPE.ADMIN && ( // if user is present(login) and user is not instructor then we show cart icon in place of login and signup;
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-xl text-richblack-100" />{" "}
                {/* icon of cart */}
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}{" "}
                    {/* no of item(courses) present in cart , we take it absolute because we want to overlap it over cart icon */}
                  </span>
                )}
              </Link>
            )}
          {
            <button className="relative" onClick={() => setOpen(true)}>
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                {open && <LineMenu token={token}  setOpen={setOpen} />}
            </button>
          }
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
