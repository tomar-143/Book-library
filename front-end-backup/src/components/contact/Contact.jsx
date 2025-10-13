import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const Contact = () => {
  const [feedback, setFeedback] = useState({
    username: '',
    email_id: '',
    rating: '',
    feedbackcontent: ''
  })

  const handler=(e)=>{
    const {name,value}=e.target;
    setFeedback({...feedback,[name]:value})

  }
  const handleFeedback=async(e)=>{
      e.preventDefault();
       console.log(feedback);
   try{
      const res=await axios.post("http://localhost:4004/api/feedback",feedback)
      console.log(res);
      if(res.status===201)
      {
        toast.success(res.data.message)
      }
      
   
   }
   catch(err)
   {
    console.log(err);
    
   }
    

  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
            <Toaster />
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-dark text-white text-center">
              <h4 className="mb-0">📚 Feedback Form</h4>
              <p className="small mb-0">
                We value your feedback on our Book Management System
              </p>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleFeedback}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required=""
                    name='username'
                    onChange={handler}
                  />
                </div>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@email.com"
                    required=""
                    name='email_id'
                    onChange={handler}
                  />
                </div>
                {/* Rating */}
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">
                    Rate Your Experience
                  </label>
                  <select className="form-select" id="rating" required="" name='rating'
                    onChange={handler}>
                    <option value="" disabled="" selected="">
                      Select rating
                    </option>
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Poor</option>
                    <option value={1}>⭐ Very Bad</option>
                  </select>
                </div>
                {/* Feedback */}
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">
                    Your Feedback
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    rows={4}
                    placeholder="Write your feedback here..."
                    required=""
                    defaultValue={""}
                    name='feedbackcontent'
                    onChange={handler}
                  />
                </div>
                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-dark btn-lg">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center small text-muted">
              Thank you for helping us improve!
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
