var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.get('/', function (req, res, next) {
    res.render('index');
});

/*router.get('/', function (req, res, next) {

    User.findOne({ firstName: "Francisco" }, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
            res.render('message', {email: doc.email});
    });
});


router.post('/', function (req, res, nest) {
    var email = req.body.email;

    var user = new User({
        firstName: 'Francisco',
        lastname: 'Freitas',
        password: '123',
        email: email
    });
    user.save(function (err, result) { });

    res.redirect('/');
})*/

module.exports = router;
