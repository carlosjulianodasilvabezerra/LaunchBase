// const fs = require('fs')
const data = require('../data.json')

exports.home = function(req, res){
  return res.render('users/home', {recipes: data.recipes})
}
exports.about = function(req, res){
  return res.render('users/about')
}
exports.recipes = function(req, res){
  return res.render('users/recipes', {recipes: data.recipes})
}
exports.show = function(req, res){
  const recipeIndex = req.params.index;
  
  res.render('users/recipe', {recipe: data.recipes[recipeIndex]})

}