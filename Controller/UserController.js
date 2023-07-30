import { User } from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const Signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'user Already Exist'
            })
        }
        const hasPassword = await bcrypt.hash(password, 10)
        let data = await User.create({ name, email, password: hasPassword })
        const token = jwt.sign({ _id: data._id }, process.env.JWT)
        res
            .status(201)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
                sameSite:"none",
                secure:true,
            })
            .json({
                success: true,
                message: 'user created',
                data
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'invalid email and password'

            });
        }
        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: 'invalid email and password'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT)
        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
                sameSite:"none",
                secure:true,
            })
            .json({
                success: true,
                message: `wellcome ${user.name}`,
                user
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const Logout = async (req, res) => {

    try {
        res
            .status(200)
            .cookie("token", null, {
               
                expires: new Date(Date.now()),
                // sameSite:"none",
                // secure:true,
            })
            .json({
                success: true,
                user: req.user,

            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getForm = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};