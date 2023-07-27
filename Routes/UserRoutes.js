import Express from "express";
import { Login, Logout, Signup, getForm } from "../Controller/UserController.js";
import  isAuth  from "../Middleware/Auth.js";

const router = Express.Router();


router.post('/signup', Signup);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/me', isAuth, getForm);


export default router;