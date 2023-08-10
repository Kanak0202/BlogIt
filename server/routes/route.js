import express from "express";

import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken,getAllPosts);
router.get('/post/:id', getPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

export default router;