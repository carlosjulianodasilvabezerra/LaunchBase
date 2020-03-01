module.exports = {
  index(req, res){
    return res.render('admin/chefs/index')
  },
  create(req, res){
    
    res.render('admin/chefs/create.njk')
  },
  post(req, res){
    return

  },//para chegar na página de edição correta
  show(req, res){
    return
    
  },
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