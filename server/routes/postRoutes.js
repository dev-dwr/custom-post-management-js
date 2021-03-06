import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  getPostsBySearch,
  commentPost
} from "../controllers/postsController.js";

import auth from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.get("/search", getPostsBySearch);
postRouter.get("/:id", getPost);
postRouter.get("/", getPosts);
postRouter.post("/", createPost); //////////////

postRouter.post("/:id/commentPost", auth, commentPost);

postRouter.patch("/:id", auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.get("/:id", getPost);
postRouter.patch("/:id/likePost", auth, likePost);


export default postRouter;
