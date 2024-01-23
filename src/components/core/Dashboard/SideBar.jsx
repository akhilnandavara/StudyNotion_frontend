import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import { logout } from "../../../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";

const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
    );
  }

  return (
    <>
      <div className="lg:flex hidden -z-1 h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => {
            if (link.type && user.accountType !== link.type) {
              return null;
            }
            return (
              <SideBarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className=" mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">
          <div className="flex flex-col">
            <SideBarLink
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName={"VscSettingsGear"}
            />
            {/* Logout */}
            <button
              className="px-8 py-2 text-sm font-medium text-richblack-300"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you Sure ?",
                  text2: "You'll be logged out from your account",
                  btn1Text: "Log Out",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }>
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default SideBar;
