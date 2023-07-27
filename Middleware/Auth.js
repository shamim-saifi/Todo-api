import jwt from 'jsonwebtoken';
import { User } from "../Model/UserModel.js"

 const isAuth = async (req, res, next) => {

    const { token }=req.cookies;

    if(!token){
        return res.status(400).json({
            success:false,
            message:'Loign first'
        })
    }
   
    const decoded=jwt.verify(token,process.env.JWT);

    req.user = await User.findById(decoded._id);
    next()
}
export default isAuth;

