import mongoose from "mongoose";


export const DB =()=>{
    mongoose.connect(process.env.MONGO_URL).then((e)=>{
        console.log(`Db connected to ${e.connection.host}`)
    }).catch((err)=>{
        console.log(`error ${err}`)
    })
}