import express from "express";
import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/postsController.js';

const postRouter = express.Router();


postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/:id", getPost);
postRouter.patch("/:id/likePost", likePost);


export default postRouter;
