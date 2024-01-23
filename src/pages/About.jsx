import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import banner from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/About/StatsComponent";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForm from "../components/core/About/ContactForm";
import ReviewSlider from "./ReviewSlider";
import Footer from "../components/common/Footer";
const About = () => {
  return (
    <div>
      {/* section 1 */}
      <section className="bg-richblack-800 max-h-[350px]">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <header className=" text-richblack-5 w-[80%] py-14 flex flex-col items-center mx-auto ">
            Driving Innovation in Online Education for a
            <HighLightText text={"Brighter Future"} />
            <p className="text-richblack-300">
              Studynotion is at the forefront of driving innovation in online
              education. re passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="flex gap-2  flex-row  justify-center w-[40%] px-4 mx-auto">
            <img src={aboutus1} alt="image1" loading = "lazy"/>
            <img src={aboutus2} alt="image2" loading = "lazy"/>
            <img src={aboutus3} alt="image3" loading = "lazy"/>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="mt-[10%] lg:px-[90px] py-[120px]">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <Quote />
        </div>
      </section>
      {/* section 3 */}
      <section>
        <div className="w-11/12 max-w-maxContent mx-auto">
          {/* founding Story  */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:py-20 lg:px-20 ">
            {/* founding Story left Div  */}
            <div className="lg:w-[50%] flex flex-col gap-4 ">
              <h3 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                Our Founding Story{" "}
              </h3>
              <p className="text-richblack-300 text-sm font-[500]  ">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-richblack-300 text-sm font-[500] ">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* founding Story Right Div   */}
            <div className="lg:w-[50%] ">
              <img src={banner} alt=""
              loading = "lazy" />
            </div>
          </div>

          {/* vision and mission  */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-24 py-10 lg:py-32 lg:px-20 ">
            {/* vision left div  */}
            <div className=" flex flex-col gap-6 " >
              <h3 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]">
                Our Vision{" "}
              </h3>

              <p className="text-richblack-300 text-sm font-[500]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* mission right div  */}
            <div className="flex flex-col gap-6 ">
           <div  className="font-semibold text-2xl">
                <HighLightText text={"Our Mission"}/>
           </div>
             
              <p className="text-richblack-300 text-sm font-[500]">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <StatsComponent/>

      {/* Section 5 */}
      <section className="w-11/12 max-w-maxContent  mx-auto flex flex-col  items-center justify-between gap-10 ">
      <LearningGrid/>
      <ContactForm/>
      </section>

      {/* REviews slider */}
      <div className="relative mx-auto my-10 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
      <h1 className="text-4xl  text-center font-semibold text-white">Reviews of other learners</h1>
      <div className="w-11/12 mx-auto"><ReviewSlider /></div>
      </div>
      <Footer/>     
      
    </div>
  );
};

export default About;
