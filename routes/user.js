import  express  from "express";
import {logout,  register, getProfile, login} from "../controllers/user.js";
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/login",login);

router.get("/logout",logout);

router.post("/new",register);

router.get("/me",isAuthenticated, getProfile);

export default router; 