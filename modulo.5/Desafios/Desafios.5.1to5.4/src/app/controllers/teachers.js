const { age, date, graduation} = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports ={
  index(req, res){
    let {filter, page, limit} = req.query

    page = page || 1
    limit = limit || 1

    //lógica para pular offset valor desejado
    let offset = limit * (page - 1)

    const params ={
      filter,
      page,
      limit,
      offset,
      callback(teachers){

        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }
        return res.render('teachers/index', { teachers, pagination, filter })
      }
    }
    Teacher.paginate(params/*function(teachers)*/)
    //IF foi jogado para scripts junto ao pagination 
    //if(filter){
    //   Teacher.findBy(filter, function(teachers){
    //     return res.render('teachers/index', { teachers })
    //   })
    // } else {
    //   Teacher.all(function(teachers){
      
    //     return res.render('teachers/index', { teachers })
    //   })
    // }
  },
  create(req, res){
    return res.render('teachers/create')
  },
  post(req, res){
    const keys = Object.keys(req.body)
  
    for (key of keys){
    //req.body.{items do form}
      if(req.body[key] == ""){
        return res.send("Please fill all fields!")
      }
    }
    Teacher.create(req.body, function(Teacher){
      return res.redirect(`/teachers/${Teacher.id}`)
    })
  
  },
  show(req, res){
    Teacher.find(req.params.id, function(teacher){
      if (!teacher) return res.send("Teacher not found!")

      teacher.age = age(teacher.birth_date)
      teacher.subjects_taught = teacher.subjects_taught.split(",")
      teacher.created_at = date(teacher.created_at).format
      teacher.educationlevel = graduation(teacher.education_level)

      return res.render("teachers/show", { teacher })
    })
  },
  edit(req, res){
      Teacher.find(req.params.id, function(teacher){
      if (!teacher) return res.send("Teacher not found!")

      teacher.birth = date(teacher.birth_date).iso

      return res.render("teachers/edit", { teacher })
    })
  },
  put(req, res){
    const keys = Object.keys(req.body)
  
    for (key of keys){
      //req.body.{items do form}
      if(req.body[key] == ""){
        return res.send("Please fill all fields!")
      }
    }
    
    Teacher.update(req.body, function(){
      return res.redirect(`/teachers/${req.body.id}`)
    })
  },
  delete(req, res){
    Teacher.delete(req.body.id, function(){
      return res.redirect('/teachers')
    })
  },
}