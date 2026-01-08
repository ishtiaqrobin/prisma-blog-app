import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import { auth } from "./../../lib/auth";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

type IOptions = {
  page: number | string;
  limit: number | string;
  sortOrder?: string;
  sortBy?: string;
};

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await PostService.createPost(req.body, user?.id as string);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const tags = (req.query.tags as string)
      ? (req.query.tags as string).split(",")
      : [];

    // true or false
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    const options = paginationSortingHelper(req.query as IOptions);

    const { page, limit, skip, sortBy, sortOrder } = options;

    const result = await PostService.getAllPosts({
      search: search as string,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch posts",
      details: error,
    });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
