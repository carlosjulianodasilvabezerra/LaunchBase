const Instructor = require('../models/Instructor')
const {age, date} = require('../../lib/utils')
module.exports ={
  index(req, res){
    // const { filter } = req.query

    // if (filter){
    //   Instructor.findBy(filter, function(instructors){
    //     return res.render("instructors/index", { instructors, filter })
    //   })
    // } else {
    //   Instructor.all(function(instructors){
    //     return res.render("instructors/index", { instructors })
    //   })
    // }
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit  * (page - 1)


    const params ={
      filter,
      page,
      limit,
      offset,
      callback(instructors){

        const pagination = {
          total: Math.ceil(instructors[0].total / limit),
          page
        }
        return res.render('instructors/index', {instructors, pagination, filter})
      }
    }
    Instructor.paginate(params)
  },

  create(req, res){
    return res.render('instructors/create')
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
    
      Instructor.create(req.body, function(Instructor){

        return res.redirect(`/instructors/${Instructor.id}`)
      })
  
  },
  show(req, res){
    Instructor.find(req.params.id, function(instructor){
      if (!instructor) return res.send("Instructor not found!")

      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(",")

      instructor.created_at = date(instructor.created_at).format

      return res.render("instructors/show", {instructor})
    })
  },
  edit(req, res){
    Instructor.find(req.params.id, function(instructor){
      if (!instructor) return res.send("Instructor not found!")

      instructor.birth = date(instructor.birth).iso

      return res.render("instructors/edit", {instructor})
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

    Instructor.update(req.body, function(){
      return res.redirect(`/instructors/${req.body.id}`)
    })
  },
  delete(req, res){
    Instructor.delete(req.body.id, function(){
      return res.redirect(`/instructors`)
    })
  },
}