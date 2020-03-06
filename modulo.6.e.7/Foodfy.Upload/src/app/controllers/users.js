const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async index(req, res){
    const { filter } = req.query
    
    if (filter) {
      let results = await Recipe.findBy(filter)
      const recipes = results.rows[0]  
      return res.render("users/recipes", { recipes })
      
    } else { 
      let results = await Recipe.all()
      const recipes = results.rows
      return res.render("users/index", { recipes })

    }
  },
  async about(req, res){
    return res.render('users/about')
  },
  async recipes(req, res){
    const { filter } = req.query

    if (filter) {
      let results = await Recipe.findBy(filter)
      const recipes = results.rows[0]  
      return res.render("users/recipes", { recipes })
      
    } else { 
      let results = await Recipe.all()
      const recipes = results.rows
      return res.render("users/recipes", { recipes })
    }
  },
  async show(req, res){
    let results = await Recipe.find(req.params.id)
    const recipes = results.rows[0]  
    if (!recipes) res.send("Recipe not found!")
    
    return res.render("users/show", { recipes })

  },
  async chefs(req, res) {
    let results = await Chef.all()
    const chefs = results.rows
    return res.render("users/chefs", { chefs })
    
  },
  async search(req, res){
    const { filter } = req.query

    if (filter) {
      let results = await Recipe.findBy(filter)
      const recipes = results.rows  
      return res.render("users/recipes", { recipes })
    } else { 
      let results = await Recipe.all()
      const recipes = results.rows
      return res.render("users/recipes", { recipes })
    }
  },
}