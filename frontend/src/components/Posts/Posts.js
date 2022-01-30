import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import Post from "./Post/Post.js"


const Posts = ({setCurrentId}) => {
  const {posts} = useSelector((state) => state.postReducer);
  const classes = useStyles();

  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
};

export default Posts;
