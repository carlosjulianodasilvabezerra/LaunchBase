const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const data = require('./public/js/data')

server.use(express.static('public')) // para ver arquivos img, css, js
server.set('view engine', 'njk') // setar engine e extensão de arquivo desejado

nunjucks.configure('views',{ // configura nunjucks para rodar arquivos pasta views
  express: server
})

server.get('/', function(req, res){
  const data = {
    title:"Rocketseat",
    logo_url:"https://camo.githubusercontent.com/e3a00cb35e63ebc807f3d6c3178e1f17c24a70f3/68747470733a2f2f726f636b6574736561742e636f6d2e62722f7374617469632f6f672e706e67",
    info1:"Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível.",
    info2:"Uma startup criada para educar, inspirar e conectar programadores e empreendedores.",
    tectitle:"As principais tecnologias utilizadas são:",
    tecnologias:[
      {name: "Node JS"},
      {name: "React Native"},
      {name: "React JS"}
    ]
  }
  return res.render('about', {data})
})

server.get('/conteudos', function(req, res){
  return res.render('conteudos', {items: data})
})

server.get('/conteudos/:id', function(req, res){
  const id = req.params.id

  const conteudo = data.find(function(conteudo){
    return conteudo.id == id
  })

  if(!conteudo){
    return res.send("Course not found!")
  }
  return res.render("conteudo", {item: conteudo})
})

server.use(function(req, res) {
  res.status(404).render("not-found")
})

server.listen(5000, function(){
  console.log('Server is running')
})
