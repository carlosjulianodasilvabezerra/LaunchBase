const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

server.use(express.static('public')) // para ver arquivos img, css, js
server.set('view engine', 'njk') // setar engine e extensão de arquivo desejado

nunjucks.configure('views',{ // configura nunjucks para rodar arquivos pasta views
  express: server
})

server.get('/', function(req, res){
  return res.render('about')
})

server.get('/conteudos', function(req, res){
  return res.render('conteudos')
})

server.use(function(req, res) {
  res.status(404).render("not-found")
})

server.listen(5000, function(){
  console.log('Server is running')
})
