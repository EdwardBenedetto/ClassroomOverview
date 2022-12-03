const Post = require('../models/Post')
const Comment = require("../models/Comment");

module.exports = {
    getPostPage: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
            res.render('post.ejs', {post, user: req.user, comments:comments})
        }catch(err){
            console.log(err)
        }
    }
}