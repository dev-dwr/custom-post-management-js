import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/auth", authRouter);
app.use("/posts", postRouter);


const CONNECTION_URL = 'mongodb+srv://dev-dwr:alamakota@cluster0.fekry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`))
