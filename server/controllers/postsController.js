import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const postReq = req.body;

  const post = new Post({...postReq, author: "PAPI", createdAt: new Date().toISOString() })

  try {
      await post.save();

      res.status(201).json(post);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, author, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const updatedPost = { title, author, message, tags, selectedFile, _id: id };

  try {
    await Post.findByIdAndUpdate(id, updatePost, { new: true });
  } catch (err) {
    res.status(409).json({ message: error.message });
  }

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  try {
    await Post.findByIdAndRemove(id);
  } catch (er) {
    res.status(409).json({ message: error.message });
  }
  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  console.log("req user id " + req.userId);
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No post with id: ${id}` });
  }

  try {
    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      //dislike post
      //removing userId from likes array
      //return array of all likes beside current User Like
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res
      .status(404)
      .json({ message: `An error occured while liking a post: ${err}` });
  }
};
