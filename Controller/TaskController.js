import { Task } from '../Model/TaskModel.js'



export const CreateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
      await Task.create({ title, description, user: req.user })

        res.status(201).json({
            success: true,
            message: "Task added Successfully",

        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllTask = async (req, res) => {
    try {
        const userId = req.user._id
        let task = await Task.find({ user: userId })

        res.status(201).json({
            success: true,
            task
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try {

        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'task not found'
            })
        }

        await task.deleteOne()

        res.status(201).json({
            success: true,
            message: 'task deleted',
            
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}