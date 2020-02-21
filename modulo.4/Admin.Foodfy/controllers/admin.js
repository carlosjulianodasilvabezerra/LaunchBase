const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res){
  res.render('admin/index.njk', {recipes: data.recipes})
}

exports.create = function(req, res){
  res.render('admin/create.njk')
}

exports.show = function(req, res){
  const { id } = req.params

  const foundRecipe = data.recipes.find(function(recipe){
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe
  }
  
  res.render("admin/show", { recipe });
}

exports.edit = function(req, res){
  const { id } = req.params

  const foundRecipe = data.recipes.find(function(recipe){
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe
  }
  res.render("admin/edit", {recipe})
}

exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send('Please fill all fields!')
    }
  }

  let id = 1
  const lastRecipe = data.recipes[data.recipes.length - 1]

  if(lastRecipe){
    id = lastRecipe.id + 1
  }

  data.recipes.push({
    id,
    ...req.body
  })

  console.log(req.body)
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) res.send("Write file error!")

    res.redirect('recipes')
  })
}