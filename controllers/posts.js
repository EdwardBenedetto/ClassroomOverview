const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");
// const cloudinary = require("../middleware/cloudinary")

module.exports = {
  getProfile: async (req, res) => {
    // console.log(req.user)
    try {
      const postItems = await Post.find({ userId: req.user.id });
      // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
      res.render("dashboard.ejs", { post: postItems, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.file);
    console.log('body is: ', req.body)
    console.log(JSON.parse(req.body.foundBook))
    let foundBook = JSON.parse(req.body.foundBook)
    let author = foundBook.authors
    if (!author || author.length == 0) {
      author = 'unknown'
    } else {
      author = author.join(', ')
    }

    try {
      await Post.create({
          post: req.body.post,
        bookTitle: foundBook.title,
        bookAuthor: author,
        bookThumbnail: foundBook.thumbnail,
        postBody: req.body.postBody,
        userName: req.user.firstNameChild,
        userId: req.user.id,
      });
      console.log("Post has been added!");
      req.user.bookCount += 1
            if (req.body.postBody) {
        console.log((req.body.postBody).split(' '))
        console.log(((req.body.postBody).split(' ')).length, req.user.wordCount)
        let words = (req.body.postBody).split(' ')
        req.user.wordCount += words.length
      }
           await req.user.save()
      res.redirect("/post");

    } catch (err) {
      console.log(err);
    }
  },
  // markComplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: true
  //         })
  //         console.log('Marked Complete')
  //         res.json('Marked Complete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // markIncomplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: false
  //         })
  //         console.log('Marked Incomplete')
  //         res.json('Marked Incomplete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },

  deletePost: async (req, res) => {
    try {
      // await Post.findOneAndDelete({_id:req.body.postIdFromJSFile})
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post");
      // res.json('Deleted It')
    } catch (err) {
      console.log(err);
    }
  },
};
