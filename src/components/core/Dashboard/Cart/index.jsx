import React from "react";
import { useSelector } from "react-redux";
import CourseCart from "./CourseCart";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="mb-14 mt-6 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems.length?totalItems:"No"} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <CourseCart />
          <CartTotal />
        </div>
      ) : (
        <p className="my-14 text-center text-3xl text-richblack-100">
          Your cart is Empty
        </p>
      )}
    </>
  );
};

export default Cart;
