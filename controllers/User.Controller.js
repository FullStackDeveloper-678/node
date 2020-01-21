var mongoose = require('mongoose'),
    passport = require('passport');
const User = mongoose.model('User');

exports.register = (req, res) => {
    if (!req.body.username || !req.body.hash) {
        return res.status(400).json({message: "All fields required"});
    }
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ useranme: "user already exists" });
        } else {
            const user = new User(req.body);
            user.setPassword(req.body.hash);
            user.save((err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    const token = user.generateJwt();
                    res.status(200).json("Registered successfully");
                }
            }); 
        }
    });
};

exports.login = (req, res) => {
    if (!req.body.username || !req.body.hash) {
        return res.status(400).json(req.body.username);
    }
    passport.authenticate("local", (err, user, info) => {
        let token;
        if (err) {
            return res.status(500).json(err);
        }
        if (user) {
            token = user.generateJwt();
            res.status(200).json({token});
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};
exports.update = (req,res) => {
    var role = req.type;
    var userId = req.userId;
    if (role == 0){
        User.findById(req.params.id, function(err, user) {
            if (!user)
                res.status(404).send("data is not found");
            else
                Object.assign(user, req.body);
                user.setPassword(req.body.hash);
                user.save().then(user => {
                    res.json('user updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    }
    else{
        if (userId == req.params.id){
            User.findById(req.params.id, function(err, user) {
                if (!user)
                    res.status(404).send("data is not found");
                else
                    Object.assign(user, req.body);
                    user.setPassword(req.body.hash);
                    user.save().then(user => {
                        res.json('user updated!');
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            });
        }
        else {
             res.json('You are not owner of this profile. So you cannot update');
        }
    }    
};
exports.delete = (req,res) => {
    var userId = req.userId;
    var role = req.type;
    if (role == 0){
        User.findByIdAndRemove({_id: req.params.id}, function(err, business){
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
    }
    else if(role == 2){
        if(userId == req.params.id){
            User.findByIdAndRemove({_id: req.params.id}, function(err, business){
                if(err) res.json(err);
                else res.json('Successfully removed');
            });
        }
        else {
            res.json('You are not owner of this profile. You are not permited');
        }
    }
    else{
        res.json('you are not permited , cannot delete !');
    }
};
exports.findById = (req,res) => {
    var role = req.type;
    if (role == 0){
        User.findById(req.params.id, function(err, user) {
            if (!user)
                res.status(500).send("data is not found");
            else
                res.status(200).json(user);    
        });
    }
    else{
        res.json('you are not admin , cannot access !');
    }
}