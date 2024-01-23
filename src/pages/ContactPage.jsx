import React from "react";
import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import ReviewSlider from "./ReviewSlider";

const ContactPage = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]"> <ContactDetails /></div> {/* Contact Details */}
        <div className="lg:w-[60%]"> <ContactUsForm /></div>
        {/* Contact Form */}
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
      <h1 className="text-4xl  text-center font-semibold text-white">Reviews of other learners</h1>
      <div className="w-11/12 mx-auto"><ReviewSlider /></div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
