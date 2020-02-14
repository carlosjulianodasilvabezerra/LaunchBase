const express = require ('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res){
  const data = {
    avatar_url: "https://avatars2.githubusercontent.com/u/6643122?s=400&v=4",
    name: "Mayk Brito",
    role: "Instrutor - Rocketseat",
    description: "Programador full-stack focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a href='https://rocketseat.com.br'target='_blank'>Rocketseat</a>.",
    links:[
      {name: "Github", url:"https://github.com/maykbrito/"},
      {name: "Linkedin", url:"https://www.linkedin.com/in/maykbrito/"},
      {name: "Twitter", url:"https://twitter.com/maykbrito/"},
    ]
  }
  return res.render('about', { data })
})

server.get("/portfolio", function(req, res){
  return res.render('portfolio', {items: videos})
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
    
  })
    if(!video){
      return res.send("video not found")
    }
    return res.render("video", {item: video})
})

server.listen(5000, function(){
  console.log("Server is running!")
})