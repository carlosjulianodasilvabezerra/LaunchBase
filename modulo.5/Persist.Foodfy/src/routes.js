const express = require('express')
const routes = express.Router()
const users = require('./app/controllers/users')
const recipes = require('./app/controllers/admin')
const chefs = require('./app/controllers/chefs')

routes.get('/', function(req, res){
  return res.redirect('/users')
})
routes.get('/users', users.index)
routes.get('/about', users.about)
routes.get('/recipes', users.recipes)
routes.get('/users/search', users.search)
routes.get('/chefs', users.chefs)
routes.get('/recipe/:id', users.show)



routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)


routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)














module.exports = routes