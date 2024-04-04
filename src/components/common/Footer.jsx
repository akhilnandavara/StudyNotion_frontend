import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {
  AiFillYoutube,
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Company = ["About", "careers", "Affilates"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Videos",
  "Projects",
  "Docs",
  "Workspaces",
];
const Support = ["HelpCenter"];
const Plans = ["Paid memberships", "For students", "Business solutions "];
const Community = ["Forums ", "Events", "Chapters"];
const Subjects = [
  "AI",
  "Cloud Computing",
  "Code Foundations",
  "Computer Science",
  "Cybersecurity",
  "Data Analytics",
  "Data Science",
  "Data Visualization",
  "Developer Tools",
  "DevOps",
  "Game Development",
  "IT",
  "Machine Learning",
  "Math",
  "Mobile Development",
  "Web Design",
  "Web Development",
];
const Languages = [
  "Bash",
  "C",
  "C++",
  "C#",
  "GO",
  "HTML & CSS",
  "Java",
  "JavaScript",
  "Kotlin",
  "PHP",
  "Python",
  "R",
  "Ruby",
  "SQL",
  "Swift",
];
const careerBuilding = [
  "Career paths",
  "Career services",
  "Interview prep",
  "Professional certification",
  "-",
  "Full Catalog",
  "Beta Content",
];
const bottomLeftSectionSontent = [
  "Privacy Policy",
  "| Cookie Policy |",
  "Terms",
];

const Footer = () => {
  return (
    <div className="bg-richblack-700 ">
      <div className="w-screen lg:w-11/12 lg:max-w-maxContent mx-auto text-richblack-300  py-[52px] ">
        <div className="flex flex-col mb-10  px-6  w-full lg:flex-row  ">

          {/* Section 1  */}
          <div className=" flex  flex-wrap text-xl  mb-10 lg:flex-row    justify-start gap-20 lg:w-[50%] ">
            <div className="flex flex-col gap-2">
              <img src={logo} alt="" loading = "lazy" />
              <div className="footer-headings">Company</div>
              {Company.map((ele, indexes) => {
                return (
                  <Link
                    // to={"/"}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
              <div className="flex flex-row gap-2">
                <AiFillFacebook />
                <AiFillGoogleCircle />
                <AiFillTwitterCircle />
                <AiFillYoutube />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="footer-headings">Resources</div>
              {Resources.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
              <div className="flex flex-col mt-5">
                <div className="footer-headings">Support</div>
                {Support.map((ele, indexes) => {
                  return (
                    <Link
                      to={`/${ele.toLowerCase()}`}
                      className="footer-subheading"
                      key={indexes}
                    >
                      {ele}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className=" hidden md:flex flex-col gap-2">
              <div className="footer-headings">Plans</div>
              {Plans.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
            </div>
            <div className=" hidden md:flex  flex-col gap-2">
              <div className="footer-headings ">Community</div>
              {Community.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Section 2 */}
          <div className="md:flex flex-wrap  hidden md:flex-row  justify-between  lg:justify-around gap-10 lg:pl-10  lg:w-[50%] lg:border-l-2 border-l-richblack-600 mb-10">
            <div className="flex flex-col justify-start gap-2">
              <div className="footer-headings">Subjects</div>
              {Subjects.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <div className="footer-headings">Languages</div>
              {Languages.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <div className="footer-headings">Career Building</div>
              {careerBuilding.map((ele, indexes) => {
                return (
                  <Link
                    // to={`/${ele.toLowerCase()}`}
                    className="footer-subheading"
                    key={indexes}
                  >
                    {ele}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center py-10 justify-between footer-subheadings border-t-2 border-t-richblack-600">
          <div className="flex flex-row gap-2 ">
            {bottomLeftSectionSontent.map((ele, indexes) => {
              return (
                <Link
                  // to={`/${ele.toLowerCase()}`}
                  className="footer-subheading"
                  key={indexes}
                >
                  {ele}
                </Link>
              );
            })}
          </div>
          <div className="text-center">Developed by <span className="text-richblue-300" >Akhil</span>  &copy; 2024 StudyNotion-EdutechLearning </div>
        </div>
      </div>
    </div>
  );
};


export default Footer;
