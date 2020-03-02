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
      return
      
  },//para chegar na página de edição correta
  edit(req, res){
   return
    
  },//onde a edição realmente ocorre
  put(req, res){
    return
  },
  delete(req, res){
    return
  },
}