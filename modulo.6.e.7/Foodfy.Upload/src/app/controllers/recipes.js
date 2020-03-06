const Recipe = require('../models/Recipe')


module.exports = {
  async index(req, res){
    let results = await Recipe.all()
      const recipes = results.rows
      
      return res.render('admin/recipes/index.njk', {recipes})
  },
  async create(req, res){
    let results = await Recipe.chefsSelectOptions()
    const options = results.rows
    return res.render('admin/recipes/create.njk', {chefOptions: options})
  },
  async post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }
    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id
    
      
    return res.redirect(`recipes/${recipeId} `) /* ${id} */
    
  
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
      

  },
  async show(req, res){
    console.log('show', req.params)
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]  
    if (!recipe) res.send("Recipe not found!")
    
    return res.render("admin/recipes/show", { recipe })
  
    
  },//para chegar na página de edição correta
  async edit(req, res){
    console.log('edit: ', req.params)
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]
    
    if (!recipe) return res.send("Recipe not found!")
    
    results = await Recipe.chefsSelectOptions()
    const options = results.rows
        
    return res.render("admin/recipes/edit", { recipe, chefOptions:options })   
  },//onde a edição realmente ocorre
  async put(req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") res.send('Please, fill all fields!')
    }

    console.log('before update: ', req.body)
    await Recipe.update(req.body)
    console.log('before redirect: ', req.body)
    return res.redirect(`/admin/recipes/${req.body.id}`)
    
  },
  async delete(req, res){
    await Recipe.delete(req.body.id)
    return res.redirect('/admin/recipes')
  },
}