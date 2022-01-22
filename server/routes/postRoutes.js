import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/postsController.js";

import auth from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.patch("/:id", auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.get("/:id", getPost);
postRouter.patch("/:id/likePost", auth, likePost);

export default postRouter;
