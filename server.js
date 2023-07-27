import Express from "express";
import { DB } from './Db/DataBase.js';
import UserRoute from "../backend/Routes/UserRoutes.js";
import TaskRoute from "../backend/Routes/TaskRoutes.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config({path:"./config/config.env"})

DB()
const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST",  "DELETE"],
     credentials: true
    }))


app.use('/user/api',UserRoute) 
app.use('/task/api',TaskRoute) 



app.listen(process.env.PORT, () => {
    console.log(`running port is ${process.env.PORT}`)
})