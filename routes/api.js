/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const console = require("zombie/lib/console");
const Book = require("../models/Book");
module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let books = await Book.find({});
      console.log(books);
      books = books.map((a) => {
        return {
          _id: a["_id"],
          title: a["title"],
          commentcount: a["commentcount"],
          comments: a["comments"],
        };
      });
      console.log(books);
      res.status(200).json(books);
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) return res.status(500).send("missing required field title");
      const body = {
        title: title,
      };
      let newBook = await Book.create(body);
      newBook = {
        _id: newBook["_id"],
        title: newBook["title"],
      };
      res.status(201).json(newBook);
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      let book = await Book.findOne({ _id: bookid });
      if (!book) return res.send("no book exists");
      book = {
        _id: book["_id"],
        title: book["title"],
        comments: book["comments"],
      };
      res.status(200).json(book);
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send("missing required field title");
      try {
        let cc = await Book.findOne({ _id: bookid });
        if (!cc) return res.send("no book exists");
        cc = cc["comments"].length;
        let newComment = await Book.findByIdAndUpdate(
          bookid,
          {
            $push: {
              comments: comment,
            },
            $set: {
              commentcount: cc + 1,
            },
          },
          { new: true, upsert: true }
        );
        newComment = {
          //{"comments":["test","423"],"_id":"64c6769b32648d0911b8be32","title":"tesyonok","commentcount":2,"__v":2}
          comments: newComment["comments"],
          _id: newComment["_id"],
          title: newComment["title"],
          commentcount: newComment["commentcount"],
          __v: newComment["__v"],
        };
        return res.json(newComment);
      } catch (error) {
        console.log(error);
        return "error";
      }
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
