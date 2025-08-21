// UserRouter.js
import express from 'express';
import userController from '../Controller/UserController.js'; 

const router = express.Router();

router.post("/singup", userController.singUp); // Define route for signup
router.post("/login", userController.login); // Define route for login

export default router;
