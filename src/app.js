import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express();

app.use(cors(
  {
    origin:process.env.CLIENT_URL,
    credentials:true,
  }
))

app.use(express.json({limit:'16kb'})); //without this, we cannot parse json data from frontend i.e there will be no req.body.
app.use(express.static("public"));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(cookieParser());


//routes import
import userRoutes from "./routes/user.routes.js"
//routes declaration
app.use('/api/v1/users',userRoutes); //userRoutes=Routes to search now



export {app}

