const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }

        } 
        try{
            await User.findByIdAndUpdate(req.params.id, {$set: req.body    });
            res.status(200).json("Account has been update")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can update only your account! ");
    }
});
//delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
       
        try{
             await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been delete")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can delete only your account! ");
    }
});
// get a user
router.get("/", async(req, res) =>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId) 
        : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
});
// get all users
router.get("/all/:id", async(req, res) =>{
    
    try{
        
        await User.find({}, function(err, users) {
        users = users.filter(user=>user._id != req.params.id ); 
        const {password, updatedAt, ...other} = users;
        res.status(200).json(other);
    })
    }catch(err){
        return res.status(500).json(err);
    }
});
//follow a user
router.put("/:id/follow", async(req, res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followings.includes(req.body.userId)){
                await user.updateOne({$push: {followings: req.body.userId}});
                await currentUser.updateOne({$push: {followers: req.params.id}});
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("you allready follow this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant follow yourself")
    }
})
//unfollow a user

router.put("/:id/unfollow", async(req, res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followings: req.body.userId}});
                await currentUser.updateOne({$pull: {followers: req.params.id}});
                res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json(" you dont follow this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant unfollow yourself")
    }
})
module.exports = router;