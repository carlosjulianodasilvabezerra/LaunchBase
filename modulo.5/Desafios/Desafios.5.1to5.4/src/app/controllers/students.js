const {date, grade} = require('../../lib/utils')
const Student = require('../models/Student')

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
      callback(students){

        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }
        return res.render('students/index', { students, pagination, filter })
      }
    }
    Student.paginate(params)
  },
  create(req, res){
    Student.teachersSelectOption(function(options){

      return res.render('students/create', {teacherOptions: options})
    })

  },
  post(req, res){
    const keys = Object.keys(req.body)
  
    for (key of keys){
      //req.body.{items do form}
      if(req.body[key] == ""){
        return res.send("Please fill all fields!")
      }
    }

    Student.create(req.body, function(Student){
      return res.redirect(`/students/${Student.id}`)
    })
  },
  show(req, res){
    Student.find(req.params.id, function(student){
      if (!student) return res.send("Student not found!")

      student.birth = date(student.birth_date).birthDay
      student.educationlevel = grade(student.education_level)

      return res.render("students/show", { student })
    })
  },
  edit(req, res){
    Student.find(req.params.id, function(student){
      if (!student) return res.send("Student not found!")

      student.birth = date(student.birth_date).iso
      student.educationlevel = grade(student.education_level)
      Student.teachersSelectOption(function(options){

        return res.render('students/edit', { student, teacherOptions: options})
      })
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
    Student.update(req.body, function(){
      return res.redirect(`/students/${req.body.id}`)
    })
  },
  delete(req, res){
    Student.delete(req.body.id, function(){
      return res.redirect('/students')
    })
  },
}