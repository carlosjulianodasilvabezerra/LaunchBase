// const fs = require('fs')
const data = require('../../../data.json')

module.exports = {
  index(req, res){
    return res.render('users/index', {recipes: data.recipes})
  },
  about(req, res){
    return res.render('users/about')
  },
  recipes(req, res){
    
    return res.render('users/recipes', {recipes: data.recipes})
  },
  show(req, res){
    const recipeIndex = req.params.index;
  
    res.render('users/recipe', {recipe: data.recipes[recipeIndex]})
  }
}