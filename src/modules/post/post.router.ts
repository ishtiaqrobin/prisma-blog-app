import express, { Router } from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

// Public Route - Get All Posts
router.get("/", PostController.getAllPosts);

// Protected Route - Get Post By Id
router.get("/:postId", PostController.getPostById);

// Protected Route - Create Post
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  PostController.createPost
);

export const postRouter: Router = router;
