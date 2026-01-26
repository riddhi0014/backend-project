import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(

  upload.fields([          //we have injected multer middleware here. So before registering the user, middleware se milte jaana.
  //middleware will add more into the req object, like req.files
    { name: 'avatar', maxCount: 1},
    {name:'coverImages', maxCount: 1}]),
  
  registerUser); //registerUser is a controller function


export default router;