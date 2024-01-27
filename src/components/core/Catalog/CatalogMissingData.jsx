import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiconnector";
import { useParams } from "react-router-dom";
import { categories } from "../../../services/apis"
import Footer from "../../common/Footer";



export default function CatalogMissinDataPage() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);


  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_Data = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0];
      setCatalogPageData(category_Data);
    };
    getCategories();
  }, [catalogName]);



  
  
  if(loading ){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
        

  return (
    <div className="flex flex-col justify-end">
    {/* Hero section */}
    <div className="box-content bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">
          {`Home / Catalog / `}
          <span className="text-yellow-25">
            {catalogPageData?.name}
          </span>
        </p>
        <p className="text-3xl text-richblack-5">
          {catalogPageData?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.description}
        </p>
      </div>
    </div>

    {/* Section 1 */}
     {/* flex min-h-[260px] flex-col justify-center */}
    <div className="mx-auto max-w-maxContentTab  box-content w-11/12 px-4 py-12 lg:max-w-maxContent ">
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

       
      <div className=" h-full flex flex-col md:flex-row gap-4 mx-auto ">
          <div className="bg-richblack-800 rounded-md p-6 md:w-[25%] min-h-[6rem]"></div>
          <div className="bg-richblack-800 rounded-md p-6 md:w-[25%] min-h-[6rem]"></div>
          <div className="bg-richblack-800 rounded-md p-6 md:w-[25%] min-h-[6rem]"></div>
          <div className="bg-richblack-800 rounded-md p-6 md:w-[25%] min-h-[6rem]"></div>


      </div>
      
    
  </div>
    <Footer />
  </div>
  );
}
