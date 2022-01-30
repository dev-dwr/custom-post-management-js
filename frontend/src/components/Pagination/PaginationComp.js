import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import {getPosts} from "../../actions/posts";

const PaginationComp = ({currentPage}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector(state => state.postReducer)

  useEffect(() => {
    if(currentPage){
      dispatch(getPosts(currentPage));
    }
  }, [currentPage]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(currentPage) || 1} //current page
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default PaginationComp;
