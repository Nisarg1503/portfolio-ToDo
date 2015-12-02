var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var User = require('../models/user');
//var Businesscontact = require('../models/businesscontact');



//////////----
/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});


// Local Pages Load

/* Getting Business page */
router.get('/businesscontact', function(req, res, next) {
   res.render('businesscontact', {
        title: 'businesscontact',
        displayName: req.user ? req.user.displayName : '' });
});

/* Getting about us page */
router.get('/about', function(req, res, next) {
   res.render('about', {
        title: 'about',
        displayName: req.user ? req.user.displayName : '' });
});

/* Getting Projects page */
router.get('/projects', function(req, res, next) {
   res.render('projects', {
        title: 'projects',
        displayName: req.user ? req.user.displayName : '' });
});

/* Getting Services page */
router.get('/services', function(req, res, next) {
   res.render('services', {
        title: 'services',
        displayName: req.user ? req.user.displayName : '' });
});


/* Getting contact page */
router.get('/contact', function(req, res, next) {
   res.render('contact', {
        title: 'contact',
        displayName: req.user ? req.user.displayName : '' });
});


/* Show Todo List Page */
router.get('/todolist', function (req, res, next) {

        res.render('todolist', {
            title: 'Todos',
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '' 
        });

});

module.exports = router;
