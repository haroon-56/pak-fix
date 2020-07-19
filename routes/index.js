const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Comment=require('../models/comment');
const {ensureAuthenticated}= require('../config/auth');
const {ensureAuthenticated1}= require('../config/auth');

//Welcome page...
router.get("/", (req, res) => {
    Comment.find((err, docs) => {
      if (err) {
        console.log("Errror in get data ");
      } else {
        res.render("first", { comments: docs });
      }
    });
  });
  router.post("/feedback", async (req, res) => {
    try {
      if (!req.body) {
        console.log("body is empty");
      } else {
        let data = { ...req.body };
        console.log(data);
        Comment.create(data);
        res.render('first'); }
    } catch (error) {
      console.log("error");
    }
  });

router.get('/contact', (req, res) => res.render('contact'));

router.get('/about', (req, res) => res.render('about'));

router.get('/contactus', (req, res) => res.render('contactus'));

router.get("/feedback", (req, res) => {
  Comment.find((err, docs) => {
    if (err) {
      console.log("Errror in get data ");
    } else {
      res.render("feedback", { comments: docs });
    }
  });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log('Errror in get data ');
        }
        else {
            // console.log(' here    ',docs)
            res.render('dashboard', { users: docs });
        }
    });
});


module.exports = router;
