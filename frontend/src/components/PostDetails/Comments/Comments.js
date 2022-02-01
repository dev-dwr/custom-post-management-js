import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {commentPost} from "../../../actions/posts";

import useStyles from "./styles.js";

const Comments = ({ post }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const commentsRef = useRef();

  const handleComment = async () => {
    const userComment = `${user.result.name}: ${comment}`;
    const postCommentBelongTo = post._id;
    const newComments = await dispatch(commentPost(userComment, postCommentBelongTo));
    setComments(newComments)
    setComment("");

    commentsRef.current.scrollIntoView({behavior: 'smooth'})
  };
  
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}</strong>:
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
