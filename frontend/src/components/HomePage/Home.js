import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts.js";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts.js";
import Navbar from "../Navbar/Navbar.js";
import PaginationComp from "../Pagination/PaginationComp";
import { Paper, AppBar, TextField, Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const history = useHistory();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const currentPage = query.get("page") || 1; //read URL and check if we have page parameter in there
  const search = query.get("searchQuery");
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState([]);


  const searchPost = () => {
    if(searchValue.trim() || tags){
      const searchQuery = {searchValue, tags: tags.join(',')}//convert array to String with comma separator
      dispatch(getPostsBySearch(searchQuery))
      history.push(`posts/search?searchQuery=${searchValue || 'none'}&tags=${tags.join(',')}`)
    } else{
      history.push("/")
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){ // keyCode for 13 is "Enter" so it checks whether we pressed enter
      searchPost()
    }
  }
  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Navbar />
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Posts"
                fullWidth
                onKeyPress={handleKeyPress}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <ChipInput
              style={{margin:'10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label = "Search Tags"
              variant="outlined"
              />
              <Button variant="contained" onClick = {searchPost} className={classes.searchButton} color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <PaginationComp currentPage={currentPage}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
