/* Required */
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const ejs = require("ejs");
const node = require("node-fetch");
const http = require("http");
const cookieParser = require("cookie-parser");
let port = 3000;
app.use(cookieParser());
const dotenv = require("dotenv");
dotenv.config();
const conn = require("./mongoose.js");
conn();
const morgan = require("morgan");
const User = require("./models/user.js");
const Link = require("./models/link.js")
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.listen(port, () => {
  console.log("mongoDB Bağlantı kuruldu");
});
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const server = http.createServer(app)
/* Uptime */

const interval = setInterval(() => {
Link.find({}, function(err,link){
 link.forEach(links => {
  node(links.link)
   console.log(`linkler  Aktif Tutuluyor Çiçek`)
})
})
},30000)
/* Servers */

app.get("/", async function (req, res) {
  let id = req.params.id;
  User.findById(id).then((result) => {
    if (result) {
      res.redirect("/login");
    } else {
      res.render("register");
    }
  });
});
app.get('/register',async function(req,res){
  res.render("register")
})
app.get("/login", async function (req, res) {
  res.render("login");
});

app.post("/register", async function (req, res) {
  User.find(
    { username: req.body.username, password: req.body.password },
    (user, err) => {
      if (user) {
        res.send("Böyle Bir Kullanıcı Zaten Bulunuyordu");
      } else {
        let user = new User({
          username: req.body.username,
          password: req.body.password,
        });
        user.save().then((result) => {
          res.redirect(`/login`);
        });
      }
    }
  );
});

app.post('/login',async function(req,res){
  User.findOne({ username:req.body.username , password:req.body.password }).then((result)=>{
    if(result){
      res.redirect(`/user/${result._id}`)
    }else{
      res.send(`Böyle Bir Kullanıcı Yok Kayıt Bölümüne Gitmek İçin <a href="/register">Tıkla</a>`)
    }
  })
})


app.get('/user/:id',(req,res)=>{
  let id = req.params.id
  User.findById(id).then((userResult)=>{
     res.render(`${__dirname}/views/pages/uptime.ejs`)
})
})
app.post('/link-ekle',async function(req,res){
  let id = req.params.id
  let token = Math.floor(Math.random() * 99999)
User.find(id).then((userResult)=>{
  let url = new Link({
    userId:userResult.username,
    link:req.body.link
  })
  console.log(userResult,id)
  url.save().then((result)=>{
    res.redirect(`/user/${result._id}`)
  })
})
})


