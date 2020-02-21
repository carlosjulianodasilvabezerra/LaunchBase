const fs = require('fs')
const data = require('../data.json')
const {date, ano} = require('../utils')

exports.index = function(req, res){
  return res.render('students/index', {students: data.students})
}

exports.create = function(req, res){
  return res.render('students/create')
}

exports.post = function(req, res){
  const keys = Object.keys(req.body)
  
  for (key of keys){
    //req.body.{items do form}
    if(req.body[key] == ""){
      return res.send("Please, fill all fields!")
    }
  }
  
  birth = Date.parse(req.body.birth)
  

  data.students.push({
    id,
    ...req.body,
    birth
  })
  

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")
    
    return res.redirect(`/students/${id}`)
  })
}

exports.show = function(req, res){
  const { id } = req.params

  const foundStudent = data.students.find(function(student){
    return student.id == id
  })

  if(!foundStudent) return res.send("Not found student")

  const student = {
    ...foundStudent,
    birth:date(foundStudent.birth).birthDay,
    ano: ano(foundStudent.select)
  }

  return res.render('students/show', {student})
}

exports.edit = function(req, res){
  const { id } = req.params

  const foundStudent = data.students.find(function(student){
    return student.id == id
  })

  if(!foundStudent) return res.send("Not found student")

  const student = {
  ...foundStudent,
  birth: date(foundStudent.birth).iso,
  }
  
  return res.render('students/edit', {student})
}

exports.put = function(req, res){
  const { id } = req.body
  let index = 0

  const foundStudent = data.students.find(function(student, foundIndex){
    if (student.id == id){
      index = foundIndex
      return true
    }
  })

  if(!foundStudent) return res.send("Not found student")

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.students[index] = student

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write Error!')

    return res.redirect(`/students/${id}`)
  })
}

exports.delete = function(req, res){
  const {id} = req.body
  const filteredStudents = data.students.filter(function(student){
    return student.id != id
  })

  data.students = filteredStudents

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write Error!")

      return res.redirect("/students")
  })
}