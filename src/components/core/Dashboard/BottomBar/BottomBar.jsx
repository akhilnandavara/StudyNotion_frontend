import React from "react";
import {  useSelector } from "react-redux";
import { sidebarLinks } from "../../../../data/dashboard-links";
import BottomBarLink from "./BottomBarLink";

const BottomBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex lg:hidden absolute bottom-0 z-10 w-full max-h-[4rem] items-center flex-row border-t-[1px] border-t-richblack-700 bg-richblack-800 py-5">
        <div className="flex flex-row w-full h-full items-center  justify-center">
          {sidebarLinks.map((link, index) => {
            if (link.type && user.accountType !== link.type) {
              return null;
            }
            return (
              <BottomBarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
          <BottomBarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName={"VscSettingsGear"}
          />
        </div>
      </div>
    </>
  );
};

export default BottomBar;
