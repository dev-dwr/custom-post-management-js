import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  const {page} = req.query;
  try {
    const LIMIT = 5;
    const startIndex = (Number(page) -1 ) * LIMIT //starting index of post on specific page 
    const total = await Post.countDocuments({});

    const posts = await Post.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)// sort_id: -1 -> latest post, skip: -> skipping fetching more than we need posts
    res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//query -> /posts?page=1 (query:page = 1)
//params -> posts/123/:id params: id=123
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    //converting to regex, because it is easier to search for mongodb
    const title = new RegExp(searchQuery, "i"); //i stands for ignore case. (the same as toLowerCase)

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({data: posts});
  } catch (err) {
    res.status(404).json({message: err.message})
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
  const post = new Post({
    ...postReq,
    author: req.userId,
    createdAt: new Date().toISOString(),
  });

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
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
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


export const commentPost = async (req, res) => {
  const {id} = req.params;
  const {commentValue} = req.body;
  console.log(commentValue);
  try{
     
  const post = await Post.findById(id);
  
  post.comments.push(commentValue);

  const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});
  res.json(updatedPost);
  }catch(err){
    console.log(err)
  }
}