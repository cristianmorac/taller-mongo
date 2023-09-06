import { Router } from "express";
import { userRouter } from "./user.router.js";
import { postRouter } from "./post.routes.js";


export const router = Router()

router.get('/info',(req, res)=> {
    res.json({
        msg: '/api/info'
    })
})

// todo: Add users and posts routes
// /api/users
router.use('/users', userRouter)
// /api/posts
router.use('/posts', postRouter)