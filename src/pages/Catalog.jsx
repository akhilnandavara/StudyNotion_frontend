import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";

import { getFullcatalogData } from "../services/operations/PageAndComponenApi";
import CourseDataCard from "../components/core/Catalog/Course_Card";
import { useDispatch, useSelector } from "react-redux";

import { hideLoading, showLoading } from "react-redux-loading-bar";
import CatalogMissinDataPage from "../components/core/Catalog/CatalogMissingData";
import Error from "./Error";
import { setLoading } from "../slices/profileSlice";



export default function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [catalogPageData, setcatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const dispatch=useDispatch()

  // fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
     
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)?.[0]?._id;
          setCategoryId(category_id);
     
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        dispatch(setLoading(true))
        dispatch(showLoading())
        const res = await getFullcatalogData(categoryId);
        setcatalogPageData(res);
      } catch (error) {
        console.error("Error while getCategoryData", error);
      }
      dispatch(setLoading(false))
      dispatch(hideLoading())
    };
    if (categoryId) {
      getCategoryData();
    }
  }, [categoryId]);
  
  if(loading&&categoryId!==undefined&&!catalogPageData){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  
  if(!loading&&categoryId!==undefined&&!catalogPageData?.success) return <CatalogMissinDataPage />
  if(!loading && categoryId===undefined) return <Error />
        

  return (
    <div className="text-richblack-5 ">
      {/* Hero section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div> 
      </div>

      {/* Section 1 */}
      <div className=" mx-auto w-11/12 box-content  max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">Courses to get your started</p>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-25"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-25"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2  */}
      <div className="mx-auto box-content w-11/12  max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </p>
        <div className="py-8">
          
          <CourseSlider
            courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-11/12 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid  gap-6 grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              .slice(0, 4)
              .map((course, index) => (
                
                <CourseDataCard course={course} key={index} Height={"h-[10rem] w-[15rem] lg:h-[20rem] lg:w-[40rem]"} />))
              }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
