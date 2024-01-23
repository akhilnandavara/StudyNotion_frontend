import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown, AiOutlineMenu } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { FcAbout } from "react-icons/fc";
import { IoIosContact } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authApi";
import { apiConnector } from "../../../services/apiconnector";
import { categories } from "../../../services/apis";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function LineMenu({ token, setOpen }) {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subLinks, setSubLinks] = useState();
  const [loading, setLoading] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const ref = useRef();

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

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      className="absolute top-0 right-0 z-[1000] w-[200px] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
    >
      {token && (
        <div className="flex flex-col items-center gap-4 my-4">
          <h1 className="text-richblack-300">Account</h1>
          <div
            className="flex items-center gap-x-1  "
            onClick={() => setOpenDashboard(true)}
          >
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              loading="lazy"
              className="aspect-square w-[40px] rounded-full object-cover"
            />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>
        </div>
      )}
      {/* Dasboard  */}
      {openDashboard && (
        <div className="transition-all duration-300">
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center  justify-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 ">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
        </div>
      )}

      {/* Section2 category courses */}
      <div>
        {!loading && subLinks?.length ? (
          <>
            <h1 className="text-yellow-50 my-2 text-xl font-bold">Courses</h1>
            {subLinks?.map((subLink, i) => (
              <Link
                to={`/catalog/${subLink.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                key={i}
              >
                <p
                  className="w-full px-10 text-end py-[10px]  text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  onClick={() => setOpen(false)}
                >
                  {subLink.name}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-center text-richblack-100">No Courses Found</p>
        )}
      </div>

      {/* Sectionn 3 about-contact-logout */}
      <div className="flex flex-col w-full  items-center">
        <Link to="/about" onClick={() => setOpen(false)}>
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <FcAbout className="text-lg" />
            About
          </div>
        </Link>

        <Link to="/contact" onClick={() => setOpen(false)}>
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <IoIosContact className="text-lg" />
            Contact
          </div>
        </Link>

        {/* Logout button */}
        <div>
          {token && (
            <div
              onClick={() => {
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100   hover:bg-richblack-700 hover:text-richblack-25"
            >
              <VscSignOut className="text-lg" />
              Logout
            </div>
          )}
        </div>

        {/* Login Button */}
        {token === null && (
          <>
            <Link to="/login">
              <button className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
