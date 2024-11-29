// import React from 'react'

// function EditProfile() {
//   return (
//     <div>
//          <div className="container p-4">
//             <h2>Edit Profile</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Name</label>
//                 <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Address</label>
//                 <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Languages Spoken</label>
//                 <input type="text" className="form-control" name="languages" value={formData.languages} onChange={handleChange} />
//               </div>

//               <div className="form-group">
//                 <label>Service Category</label>
//                 <select className="form-control" name="serviceCategory" value={formData.serviceCategory} onChange={handleChange}>
//                   <option value="">Select Category</option>
//                   <option value="plumbing">Plumbing</option>
//                   <option value="electrical">Electrical</option>
//                   <option value="cleaning">Cleaning</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Experience (years)</label>
//                 <input type="number" className="form-control" name="experience" value={formData.experience} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Education</label>
//                 <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Availability</label>
//                 <input type="text" className="form-control" name="availability" value={formData.availability} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Certifications</label>
//                 <input type="text" className="form-control" name="certifications" value={formData.certifications} onChange={handleChange} />
//               </div>

//               <div className="form-group">
//                 <label>Basic Payment</label>
//                 <input type="number" className="form-control" name="basicPayment" value={formData.basicPayment} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Emergency Payment</label>
//                 <input type="number" className="form-control" name="emergencyPayment" value={formData.emergencyPayment} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Onsite Visit Charge</label>
//                 <input type="number" className="form-control" name="onsiteCharge" value={formData.onsiteCharge} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Advanced Service Charge</label>
//                 <input type="number" className="form-control" name="advancedCharge" value={formData.advancedCharge} onChange={handleChange} />
//               </div>

//               <button type="submit" className="btn btn-success mt-3">Save Changes</button>
//             </form>
//           </div> 


//     </div>
//   )
// }

// export default EditProfile