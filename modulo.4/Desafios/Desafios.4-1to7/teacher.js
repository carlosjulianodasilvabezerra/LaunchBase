const fs = require('fs')
const data = require('./data.json')
const {age, date, graduation} = require('./utils')

exports.show = function(req, res){
  const { id } = req.params

  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id
  })

  if(!foundTeacher) return res.send("Not found teacher")

  const teacher = {
    ...foundTeacher,
    age:age(foundTeacher.birth),
    subjects: foundTeacher.subjects.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    graduation: graduation(foundTeacher.select)

  }

  return res.render('teachers/show', {teacher})
}

exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for (key of keys){
    //req.body.{items do form}
    if(req.body[key] == ""){
      return res.send("Please fill all fields!")
    }
  }
  
  let { avatar_url, name, birth, select, classType, subjects } = req.body

  birth = Date.parse(birth)
  const id = Number(data.teachers.length + 1)

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    select,
    classType,
    subjects
  })


  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")
    
    return res.redirect('/teachers')
  })
}

exports.edit = function(req, res){
  const { id } = req.params

  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id
  })

  if(!foundTeacher) return res.send("Not found teacher")

  const teacher = {
  ...foundTeacher,
  birth: date(foundTeacher.birth),
  }
  
  return res.render('teachers/edit', {teacher})
}