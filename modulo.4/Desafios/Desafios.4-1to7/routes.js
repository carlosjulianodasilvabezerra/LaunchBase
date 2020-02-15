const express = require('express')
const routes = express.Router()
const teacher = require('./teacher')

routes.get('/', function(req, res){
  return res.redirect('/teachers')
})

routes.get('/teachers/create', function(req, res){
  return res.render('teachers/create')
})

routes.post('/teachers', teacher.post)

routes.get('/teachers', function(req, res){
  return res.render('teachers/index')
})









module.exports = routes