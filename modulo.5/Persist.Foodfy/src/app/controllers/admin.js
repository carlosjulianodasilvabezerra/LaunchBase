const Recipe = require('../models/Recipe')


module.exports = {
  index(req, res){
    Recipe.all(function(recipes){

      res.render('admin/recipes/index.njk', {recipes})
    })

    
  },
  create(req, res){
    Recipe.chefsSelectOptions(function(options){

      res.render('admin/recipes/create.njk', {chefOptions: options})
    })
  },
  post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Recipe.create(req.body, function(Recipe){
      
      res.redirect(`recipes/${Recipe.id} `) /* ${id} */
    })
  
    // let id = 1
    // const lastRecipe = data.recipes[data.recipes.length - 1]
    
    // if(lastRecipe){
    //   id = lastRecipe.id + 1
    // }
  
    // data.recipes.push({
    //   id,
    //   ...req.body
    // })
    
    // console.log(req.body)
    // fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    //   if(err) res.send("Write file error!")
      

  },//para chegar na página de edição correta
  show(req, res){
    console.log('show', req.params)
    Recipe.find(req.params.id, function(recipe){
      if (!recipe) return res.send("Recipe not found!")
      res.render("admin/recipes/show", { recipe })
    })
    
  },
  edit(req, res){
    console.log('edit: ', req.params)
    Recipe.find(req.params.id, function(recipe){
      if (!recipe) return res.send("Recipe not found!")
      
        Recipe.chefsSelectOptions(function(options){
          res.render("admin/recipes/edit", { recipe, chefOptions:options })
        })
    })
    
  },//onde a edição realmente ocorre
  put(req, res){
    // const { id } = req.body
    // let index = 0

    // const foundRecipe = data.recipes.find(function(recipe, foundIndex){
    //   if( recipe.id == id){
    //     index = foundIndex
    //     return true
    //   }
    // }) const keys = Object.keys(req.body);
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") res.send('Please, fill all fields!')
    }

    console.log('before update: ', req.body)
    Recipe.update(req.body, function(){
      console.log('before redirect: ', req.body)
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res){
    Recipe.delete(req.body.id, function(){
      return res.redirect('/admin/recipes')
    })
  },
}