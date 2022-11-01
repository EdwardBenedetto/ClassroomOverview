const Post = require('../models/Post')

module.exports = {
    getFeed: async (req,res)=>{
        try{
          //const isLogged = req.isAuthenticated();
            const post = await Post.find()
                .sort({ createdAt: 'desc' })
                .lean()
            res.render('feed.ejs', {post: post, user: req.user})
        }catch(err){
            console.log(err)
        }
    }
}