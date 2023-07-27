import  Express  from "express";
import { CreateTask, deleteTask, getAllTask } from "../Controller/TaskController.js";
import isAuth from "../Middleware/Auth.js";

const router = Express.Router();

router.post('/createtask',isAuth,CreateTask)
router.get('/getalltask',isAuth,getAllTask)
router.delete('/deletetask/:id',isAuth,deleteTask)

export default router;