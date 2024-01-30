import React from 'react'
import { Link } from 'react-router-dom'


const Error = () => {
  return (
    <div className="flex justify-center items-center h-screen text-richblack-5">
    <div className="text-center">
        <h1 className="text-4xl font-medium">404</h1>
        <p className="text-xl font-medium m-6">Sorry, the page you're looking for can't be found.</p>
        <Link to="/" className="cursor-pointer  rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50">Go Home</Link>
    </div>
</div>
  )
}

export default Error
