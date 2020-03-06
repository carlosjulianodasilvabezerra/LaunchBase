const Chef = require('../models/Chef')

module.exports = {
  async index(req, res){
    let results = await Chef.all()
      const chefs = results.rows
      return res.render('admin/chefs/index', {chefs})
  },
  async create(req, res){
    
    return res.render('admin/chefs/create.njk')
  },
  async post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    let results = await Chef.create(req.body)
    const chefId = results.rows[0].id

    return res.redirect(`chefs/${chefId}`)
  },
  async show(req, res){
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if (!chef) return res.send("Chef not found!")

    results = await Chef.findChefRecipe(req.params.id)
    const recipes = results.rows
      
    return res.render("admin/chefs/show", { chef, recipes })
      
  },//para chegar na página de edição correta
  async edit(req, res){
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if (!chef) return res.send("Chef not found!")
    
    return res.render("admin/chefs/edit", { chef })

  },//onde a edição realmente ocorre
  async put(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    await Chef.update(req.body)
      
    return res.redirect(`chefs/${req.body.id}`) /* ${id} */
   
  },
  delete(req, res){
    const {id} = req.body
    Chef.verifyRecipe(id, function(count){
      if (count > 0) {
        return res.send("Chefes que possuem receitas, não podem ser deletados!")
      } else {
        Chef.delete(req.body.id, function(){
          return res.redirect('/admin/chefs')
        })
      }
    })
  },
}