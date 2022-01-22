import axios from "axios";


const API = axios.create({baseURL: "http://localhost:5001"});

API.interceptors.request.use(req => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("auth/signin", formData);
export const signUp = (formData) => API.post("auth/signup", formData);
export const verifyEmail = () => API.get("/auth/verify/:confirmationToken")