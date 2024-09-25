const express = require("express");
const postRouter = express.Router();
const { v4: uuidv4 } = require("uuid");

let mockPostList = [];
postRouter.get("/post-list", (req, res, next) => {
  res.status(200).json({
    data: mockPostList,
  });
});

postRouter.post("/add-post", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  if (!title || !content) {
    res.status(400).json({ error: "title and content is required" });
  }

  const postInfo = {
    id: uuidv4(),
    title: title,
    content: content,
    description: description,
  };
  mockPostList.push(postInfo);
  res.status(200).json({ message: "Post Created!", post: postInfo });
});

postRouter.put("/update-post/:id", (req, res, next) => {
  const pid = req.params.id;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedContent = req.body.content;

  // 遍歷陣列，找到對應的 post 並修改其屬性
  mockPostList.forEach((postInfo) => {
    if (postInfo.id !== pid) {
      res.status(400).json({ error: "Failed to find post." });
      next();
    }

    postInfo.title = updatedTitle;
    postInfo.description = updatedDescription;
    postInfo.content = updatedContent;
  });

  const updatePostInfo = {
    id: pid,
    title: updatedTitle,
    content: updatedContent,
    description: updatedDescription,
  };

  res.status(200).json({ message: "Post Updated!", post: updatePostInfo });
});
postRouter.delete("/delete-post/:id", (req, res, next) => {
  const pid = req.params.id;

  // 遍歷陣列，找到對應的 post 並修改其屬性
  mockPostList.forEach((postInfo) => {
    if (postInfo.id !== pid) {
      res.status(400).json({ error: "Failed to find post." });
      next();
    }
  });

  mockPostList = mockPostList.filter((postInfo) => postInfo.id !== pid);

  res.status(200).json({ message: "Post Deleted!", post_id: pid });
});

module.exports = postRouter;
