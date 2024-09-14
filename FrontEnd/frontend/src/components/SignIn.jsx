import React from 'react';

export default function SignIn({log,setLog}){

    return(<>
       <div className=" h-screen w-full flex justify-center items-center">
        <div className="h-[90vh] w-[60vw]  sm:block hidden">
          <img
            className="h-full w-full object-contain"
            src="signIn.png"
            alt=""
          />{" "}
        </div>
        <div className=" h-[65vh] md:h-[90vh] md:w-[35vw] w-[100vw] flex justify-center items-center ">
          <form
            className="h-[50%] w-[80%] gap-6 rounded-lg shadow-[0_0_10px_2px_rgb(211,211,201)]  flex py-5 px-6 flex-col"
            action=""
          >
            <div className="flex justify-between items-center">
              <p className=" text-2xl md:text-3xl font-bold text-[#5a155a] flex gap-3">
                Let us Know <p className="text-red-500">!</p>
              </p>
              {/* <div onClick={()=>{setLog(!log);}} className="text-lg cursor-pointer font-semibold underline text-center flex ">
                Sign <p className="text-red-500">In</p>
              </div> */}
            </div>

           
            <input className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text" placeholder="Email" />
            <input className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="password" placeholder="Password" />
            <button className="duration-200 h-[50px] rounded-xl text-white font-semibold w-full hover:text-[#491149] hover:bg-white hover:border  hover:border-[#491149] bg-[#491149]">Sign In</button>
            <button onClick={()=>{setLog(!log);}} className="duration-200 h-[50px] rounded-xl text-[#491149] border hover:text-white hover:bg-[#491149] border-[#491149] font-semibold w-full bg-white">Sign Up</button>


          </form>
        </div>
      </div>
    
    
    </>)
}