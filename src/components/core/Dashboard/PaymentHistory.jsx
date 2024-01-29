import React, { useEffect, useState } from 'react'
import { getPaymentHistory } from '../../../services/operations/studentFeatureApi'
import { useSelector } from 'react-redux'
import {formatDate} from '../../../services/operations/formatDate'

export default function PaymentHistory() {
    const [paymentsDetails,setPaymentDetails]=useState([])
    const {token}=useSelector((state)=>state.auth)
    useEffect(()=>{
      const paymentHistoryData=async()=>{
        const res=await getPaymentHistory(token)
        setPaymentDetails(res)
      }
      paymentHistoryData()
    },[])

  return (
    <>
    <div className='mt-4'>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">Payment History</h1>
    <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
Course purcharse History
    </p>
    {console.log("paymentsDetails",paymentsDetails)}
    { paymentsDetails?.length>0 ? (
      <div className="my-8  text-richblack-5 grid grid-cols-1">
         <div className="flex flex-wrap rounded-t-lg items-center bg-richblack-500 ">
              <p className="w-[50%] md:w-[40%] px-5 py-3">Order Id </p>
              <p className="w-[15%] md:w-[20%] px-2 py-3">Amount</p>
              <p className="w-[15%] md:w-[20%] px-2 py-3">Status</p>
              <p className="w-[20%] md:w-[20%] px-2 py-3">Date</p>
            </div>
            {
              paymentsDetails.map((payment,index,arr)=>(
                <div className={`flex flex-wrap items-center   border border-richblack-700 ${ index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`} key={index}>
                  <div className='w-[50%] md:w-[40%] px-5  py-3'>{payment.orderId}</div>
                  <div className='w-[15%] md:w-[20%] px-2 py-3'>{payment.amount}</div>
                  <div className={`w-[15%] md:w-[20%] px-2 py-3 ${payment.status==="Success"?"text-caribbeangreen-100":"text-pink-200"}` }>{payment.status}</div>
                  <div className='w-[20%] md:w-[20%] px-2 py-3'>{formatDate(payment.paidAt)}</div>
                </div>
              ))
            }
      </div>
    ) : (
      <p className="my-14 text-center text-3xl text-richblack-100">
        Your History  Not Found
      </p>
    )}
    </div>
  </>
  )
}
