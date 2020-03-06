const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({extended:true}))
server.use(express.static('public')) // para ver arquivos img, css, js
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk') // setar engine e extensão de arquivo desejado

nunjucks.configure('src/app/views',{ // configura nunjucks para rodar arquivos pasta views
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(5000, function(){
  console.log('Server is running')
})