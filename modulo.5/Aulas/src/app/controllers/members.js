const {age, date} = require('../../lib/utils')

const Member = require('../models/Member')
module.exports ={
  index(req, res){
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit  * (page - 1)


    const params ={
      filter,
      page,
      limit,
      offset,
      callback(members){

        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }
        return res.render('members/index', {members, pagination, filter})
      }
    }
    Member.paginate(params)
  },
  create(req, res){

    Member.instructorsSelectOptions(function(options){
      
      return res.render('members/create', {instructorOptions: options})
    })
  },
  post(req, res){
    // Object.keys < Object é uma função que cria um objeto para nós.
    //conhecido também como constructor
    const keys = Object.keys(req.body)

    //Validação dos dados
    for(key of keys){
    //req.body.opções página create
    if(req.body[key] == ""){
      return res.send("Please, fill all fields!")
      }
    }
    
      Member.create(req.body, function(Member){

        return res.redirect(`/members/${Member.id}`)
      })
  
  },
  show(req, res){
    Member.find(req.params.id, function(member){
      if (!member) return res.send("Member not found!")

      member.birth = date(member.birth).birthDay

      return res.render("members/show", {member})
    })
  },
  edit(req, res){
    Member.find(req.params.id, function(member){
      if (!member) return res.send("Member not found!")

      member.birth = date(member.birth).iso
      Member.instructorsSelectOptions(function(options){
      
        return res.render('members/create', {member, instructorOptions: options})
      })
    })
  },
  put(req, res){
    // Object.keys < Object é uma função que cria um objeto para nós.
    //conhecido também como constructor
    const keys = Object.keys(req.body)

    //Validação dos dados
    for(key of keys){
    //req.body.opções página create
    if(req.body[key] == ""){
      return res.send("Please, fill all fields!")
      }
    }

    Member.update(req.body, function(){
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete(req, res){
    Member.delete(req.body.id, function(){
      return res.redirect(`/members`)
    })
  },
}