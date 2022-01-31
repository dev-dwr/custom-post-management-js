import axios from "axios";


const API = axios.create({baseURL: "http://localhost:5001"});

//this is going to happened on each of our request
API.interceptors.request.use(req => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.searchValue || 'none'}&tags=${searchQuery.tags}`)

export const signIn = (formData) => API.post("auth/signin", formData);
export const signUp = (formData) => API.post("auth/signup", formData);
export const verifyEmail = () => API.get("/auth/verify/:confirmationToken")