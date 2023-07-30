import Express from "express";
import { DB } from './Db/DataBase.js';
import UserRoute from "./Routes/UserRoutes.js";
import TaskRoute from "./Routes/TaskRoutes.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'

import path from "path";

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


app.use('/api/user',UserRoute)  
app.use('/api/task',TaskRoute) 

app.use(Express.static(path.join(__dirname,'build')))

app.get('*',(req,res)=>{
    res.sendFile(__dirname,'build/index.html')
})

app.listen(process.env.PORT, () => {
    console.log(`running port is ${process.env.PORT}`)
})