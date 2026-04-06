// import React from 'react'
// import './css/Login.css'
// import { Icon } from '@iconify/react';

// const Login = () => {

//   function regForm() {
//     console.warn("Hello");
//     var iBox = document.getElementById('image-box')
//     iBox.style.right = 0
//     // iBox.style.left = "auto";
//     iBox.style.borderRadius = " 0 10px 10px 0"
//   }

//   function loggForm() {
//     console.warn("Hello");
//     var iBox = document.getElementById('image-box')
//     iBox.style.left = 0
//     iBox.style.right = "auto";
//     iBox.style.borderRadius = " 10px 0px 0px 10px"
//   }
//   let flag = 0;
//   var iBox = document.getElementById('image-box')

//   return (
//     <div className='container' >
//       <div className="login-box">

//         <div className="image-box" id='image-box'>

//         </div>


//         <div className="left-box box">
//           <div className="heading">
//             <span className="text-center">Register</span>
//           </div>

//           <div className="main">
//             <form>
//               {/* Registration form */}
//               <div className="form">
//                 <div className="input-container">
//                   <input type="text" required="" />
//                   <label>First Name</label>
//                 </div>
//                 <div className="input-container">
//                   <input type="text" required="" />
//                   <label>Middle Name</label>
//                 </div>
//                 <div className="input-container">
//                   <input type="text" required="" />
//                   <label>Last Name</label>
//                 </div>
//                 <div className="input-container">
//                   <input type="text" required="" />
//                   <label>Phone Number</label>
//                 </div>
//                 <div className="input-container">
//                   <input type="text" required="" />
//                   <label>Email </label>
//                 </div>
//                 <div className="input-container">
//                   <input type="mail" required="" />
//                   <label>Password</label>
//                 </div>
//                 <div className="input-container">
//                   <input type="mail" required="" />
//                   <label>Confirm Password</label>
//                 </div>
//               </div>

//             </form>
//           </div>

//           <div className="footer">
//             <button type="button" class="btn" >submit</button>
//             <p className='reg-t'>Already have an account ? <button type="button" className='reg-text' onClick={() => loggForm()}>Login</button></p>
//           </div>
//         </div>

//         <div className="right-box box">
//           {/* Login form */}
//           <form>
//             <span className="text-center">login</span>
//             <div className="input-container">
//               <input type="text" required="" />
//               <label>Phone Number</label>
//             </div>
//             <div className="input-container">
//               <input type="mail" required="" />
//               <label>Password</label>
//             </div>
//             <a className='f-pass' href="">forgot password ?</a>
//             <button type="button" class="btn" >submit</button>
//             <p className='reg-t2'>Don't have an account ? <button type="button" className='reg-text' onClick={() => regForm()}>Register</button></p>
//           </form>
//         </div>




//       </div>
//     </div>
//   )
// }

// export default Login
