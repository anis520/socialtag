import Post from "../models/Post.js";
import asynchandler from "express-async-handler";

/**
 * @DESC user post
 * @ROUTE /api/v1/post
 * @method POST
 * @access private
 */
export const createpostController = asynchandler(async (req, res) => {
  // get data
  const { posterId, text } = req.body;

  //check valied user
  if (posterId == req.me_id) {
    return res.status(400).json({ message: "Invalid post data" });
  }

  console.log(posterId == req.me._id);

  // create new post data
  const post = await Post.create({
    posterId,
    text,
    photo: req.file.filename,
    posterId,
  });
  const postbypopulate = await Post.findById(post._id).populate("posterId");

  if (Post) {
    return res
      .status(201)
      .json({ message: "post  successful", post: postbypopulate });
  } else {
    return res.status(400).json({ message: "Invalid post data" });
  }
});

/**
 * @DESC get user post
 * @ROUTE /api/v1/post
 * @method GET
 * @access private
 */
export const getallpostController = asynchandler(async (req, res) => {
  // create new post data
  const post = await Post.find().populate("posterId");

  if (post) {
    return res.status(201).json({ post });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @DESC update post data
 * @ROUTE /api/v1/post
 * @method PUT
 * @access private
 */
export const updatepostController = asynchandler(async (req, res) => {
  /// get data
  const { postId, likeId } = req.body;
  console.log(postId, likeId);

  // find user post
  const post = await Post.findById(postId);

  if (post.like.includes(likeId)) {
    let like = post.like.filter((e) => e != likeId);

    //update post
    const postUpdate = await Post.findByIdAndUpdate(
      postId,
      { like },
      { new: true }
    ).populate("posterId");

    if (postUpdate) {
      return res.status(200).json({ post: postUpdate });
    } else {
      return res.status(400).json({ message: "something worong failed" });
    }
  }

  let like = post.like;
  like.push(likeId);

  //update post
  const postrUpdate = await Post.findByIdAndUpdate(
    postId,
    { like },
    { new: true }
  ).populate("posterId");

  if (postrUpdate) {
    return res.status(200).json({ post: postrUpdate });
  } else {
    return res.status(400).json({ message: "some thing worng" });
  }
});
