const Chef = require('../models/Chef')

module.exports = {
  index(req, res){
    Chef.all(function(chefs){

      res.render('admin/chefs/index', {chefs})
  
    })
  },
  create(req, res){
    
    res.render('admin/chefs/create.njk')
  },
  post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Chef.create(req.body, function(Chef){
      
      res.redirect(`chefs/${Chef.id} `) /* ${id} */
    })
    
  },
  show(req, res){
    Chef.find(req.params.id, function(chef){
      if (!chef) return res.send("Chef not found!")

      Chef.findChefRecipe(req.params.id, function(recipes){
        res.render("admin/chefs/show", { chef, recipes })
      })
    }) 
  },//para chegar na página de edição correta
  edit(req, res){
    Chef.find(req.params.id, function(chef){
      if (!chef) return res.send("Chef not found!")
      res.render("admin/chefs/edit", { chef })
    }) 
    
  },//onde a edição realmente ocorre
  put(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Chef.update(req.body, function(){
      
      res.redirect(`chefs/${req.body.id}`) /* ${id} */
    })
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