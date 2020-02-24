const express = require ('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

//usamos para poder habilitar o express a ler o req.body
server.use(express.urlencoded({ extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method')) // sempre colocar antes do server.use(routes)
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(5000, function(){
  console.log("Server is running!")
}) 