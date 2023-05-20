import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addTask,
  getmyTask,
  updateTask,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, addTask);
router.get("/get", isAuthenticated, getmyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
