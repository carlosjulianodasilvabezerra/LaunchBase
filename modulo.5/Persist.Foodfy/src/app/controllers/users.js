const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res){
    const { filter } = req.query
    
    if (filter) {
      Recipe.findBy(filter, function(recipes){
        res.render("users/index", { recipes })
      })
    } else { 
      Recipe.all(function(recipes){
        res.render("users/index", { recipes })
      })
    }
  },
  about(req, res){
    return res.render('users/about')
  },
  recipes(req, res){
    const { filter } = req.query

    if (filter) {
      Recipe.findBy(filter, function(recipes){
        res.render("users/recipes", { recipes })
      })
    } else { 
      Recipe.all(function(recipes){
        res.render("users/recipes", { recipes })
      })
    }
  },
  show(req, res){
    Recipe.find(req.params.id, function(recipes){
      if (!recipes) res.send("Recipe not found!")
      res.render("users/show", { recipes })
    })
  },
  chefs(req, res) {
    Chef.all(function(chefs){
      res.render("users/chefs", { chefs })
    })
  },
  search(req, res){
    const { filter } = req.query

    if (filter) {
      Recipe.findBy(filter, function(recipes){
        res.render("users/search", { recipes })
      })
    } else { 
      Recipe.all(function(recipes){
        res.render("users/search", { recipes })
      })
    }
  },
}