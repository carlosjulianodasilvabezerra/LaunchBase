const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const recipes = require('./public/js/data')


server.use(express.static('public')) // para ver arquivos img, css, js
server.set('view engine', 'njk') // setar engine e extensão de arquivo desejado
nunjucks.configure('views',{ // configura nunjucks para rodar arquivos pasta views
  express: server
})

server.get('/', function(req, res){
  return res.render('home', {recipes})
})

server.get('/about', function(req, res){
  return res.render('about')
})

server.get('/recipes', function(req, res){
  return res.render('recipes', {recipes})
})

server.get('/recipe/:index', function(req, res){
  const recipeIndex = req.params.index;
  
  res.render('recipe', {recipe: recipes[recipeIndex]})

})



server.listen(5000, function(){
  console.log('Server is running')
})