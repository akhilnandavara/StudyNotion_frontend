import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

export default function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: thumbnailImg, price: currentPrice } = course;

  const handleAddToCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Your the instructor cant buy this course");
      return;
    }
    if (token && !cart.includes(course._id)) {
      dispatch(addToCart(course));
    }

    if (!token) {
      setConfirmationModal({
        text1: "Do you want login",
        text2: "Please login to purchase this course",
        btn1Text: "Login",
        btn2Text: "cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
    >
      <img
        src={thumbnailImg}
        alt="Thumbnail"
        loading = "lazy"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />
      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {currentPrice}
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="yellowButton"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : () => handleBuyCourse()
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>

          {!course?.studentsEnrolled.includes(user?._id) && (
            <button className="blackButton" onClick={() => handleAddToCart()}>
              Add to cart
            </button>
          )}
        </div>
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div className={``}>
          <p className={`my-2 text-xl font-semibold `}>This course includes:</p>
          <div className="flex flex-col gap-3  text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, index) => (
              <p className="flex gap-2 items-center" key={index}>
                <BsFillCaretRightFill />
                <p>{item}</p>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => toast.success("Course link copied..")}
            className={`mx-auto flex  justify-center items-center gap-2 py-6 text-yellow-100`}
          >
            <span>
              {" "}
              <FaShareSquare size={15} /> Share
            </span>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
