import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='mx-auto'>
    <div className='text-center'>
        <h2 className='text-richblack-5 font-semibold text-4xl'>Get in Touch</h2>
        <p className='text-sm font-medium text-richblack-300'>We&apos;d love to here for you, Please fill out this form.</p>
    </div >
    <div className='mt-12 mx-auto'>
        <ContactUsForm/>

    </div>
    </div>
  )
}

export default ContactForm
