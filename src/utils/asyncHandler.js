

// const asyncHandler=(fn)=>async(req,res,next)=>{         //another way to write the wrapper fucntion i.e asyncHandler
//   try{
//     await fn(req,res,next);
//   }
//   catch(err){
//    res.status(err.code || 500).json({
//       success:false,
//       message:err.message || "Internal Server Error",
//    });
//   }
// }


const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export { asyncHandler }

//asyncHandler is a higher order function which takes a request handler function as input and returns a new function that wraps the original function in a promise. If the original function throws an error or returns a rejected promise, the error is caught and passed to the next middleware using next(err). This allows us to handle errors in a centralized way without having to write try-catch blocks in every async route handler.
//asyncHandler is used to wrap asynchronous route handlers in Express.js applications to ensure that any errors are properly propagated to the error-handling middleware.
//error handling middleware example: