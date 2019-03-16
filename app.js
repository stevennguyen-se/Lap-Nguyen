var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodeEmailer = require("nodemailer");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/", function(req, res) {

    var transporter = nodeEmailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lapnguyen.noname@gmail.com',
            pass: 'Lap123456'
        }
    });

    var emailText = '';
    emailText = "From ( " + req.body.email + " ): " + req.body.message;
    var mailOptions = {
        from: '"Steven Nguyen" <lapnguyen.noname@gmail.com>',
        to: 'stevennguyen.se@gmail.com',
        subject: 'From stevennguyen.herokuapp.com - ' + req.body.title,
        text: emailText
        };

    var mailOptions2 = {
        from: '"Steven Nguyen" <lapnguyen.noname@gmail.com>',
        to: req.body.email,
        subject: 'Thank you for your email to stevennguyen.herokuapp.com',
        text: "Your Email has been sent successfully! I will get back to you soon."
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
        else {
            transporter.sendMail(mailOptions2);

            res.redirect("/");
        }
    });
});

// WEB PROJECTS
app.get("/webprojects", function(req, res) {
    res.render("webProjects");
});

app.get("/webprojects/11", function(req, res) {
    res.render("projects/11/index");
});

app.get("/webprojects/12", function(req, res) {
    res.render("projects/12/index");
});

app.get("/webprojects/13", function(req, res) {
    res.render("projects/13/index");
});

app.get("/webprojects/14", function(req, res) {
    res.render("projects/14/index");
});

app.get("/webprojects/15", function(req, res) {
    res.render("projects/15/index");
});

app.get("/webprojects/25", function(req, res) {
    res.render("projects/25/index");
});

app.get("/webprojects/31", function(req, res) {
    res.render("projects/31/index");
});

// MOBILE PROJECT
app.get("/mobileprojects", function(req, res) {
    res.render("mobileProjects");
});

// GAME PROJECTS
app.get("/gameprojects", function(req, res) {
    res.render("gameProjects");
});

// RESEARCH PROJECTS
app.get("/researchprojects", function(req, res) {
    res.render("researchProjects");
});

app.get("/*", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("The server has started! " + process.env.PORT + " " + process.env.IP);
});
