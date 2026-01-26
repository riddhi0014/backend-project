

const asyncHandler=(fn)=>async(req,res,next)=>{
  try{
    await fn(req,res,next);
  }
  catch(err){
   res.status(err.code || 500).json({
      success:false,
      message:err.message || "Internal Server Error",
   });
  }
}

export {asyncHandler}

// const asyncHandler=(requestHandler)=>{           //another way to write the wrapper fucntion i.e asyncHandler
//   Promise.resolve(requestHandler(req,res,next))
//   .catch((err)=>next(err));
// }
