import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconButton'
import {buyCourse} from '../../../../services/operations/studentFeatureApi'
import { useNavigate } from 'react-router-dom'
import { MdCurrencyRupee } from 'react-icons/md'

const CartTotal = () => {
  const {total,cart}=useSelector((state)=>state.cart)
  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleBuyCourse=()=>{
    const course=cart.map((course)=>course._id)
    buyCourse(token,user,course,navigate,dispatch)
  }

  return (
    <di className="md:min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <div className="mb-1 text-sm font-medium text-richblack-300">Total:</div>
      <div className="mb-6 text-3xl font-medium text-yellow-100 flex items-center"><MdCurrencyRupee />{total}</div>

      <IconBtn
      text={"Buy Now"}
      customClasses="w-full justify-center"
      className="bg-yellow-5"
      onclick={handleBuyCourse}
      />

       
    </di>
  )
}

export default CartTotal
