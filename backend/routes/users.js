const router = require('express').Router(); //for the routes we are creating
let User = require('../models/user.model'); //importing user model

//handling the get requests
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    //new user is added using save method
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;