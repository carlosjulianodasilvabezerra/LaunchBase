const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')


//index
exports.index = function(req, res){

  return res.render('instructors/index', {instructors: data.instructors})
}

//show
exports.show = function(req, res){
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!foundInstructor) return res.send("Not found instructor")



  const instructor ={
    ...foundInstructor,
    age:age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }


  return res.render("instructors/show", {instructor})
}

//create
exports.create = function(req, res){
  return res.render('instructors/create')
}

//post
exports.post = function(req, res){

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
  
  
  //desestruturando objeto / organizando os dados para enviar ao data.instructors.push
  let {avatar_url, birth, name, services, gender} = req.body
  
  // Tratamento dos dados
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)
  // [], na próxima já se torna [{...}] e assim sucessivamente
  
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  }) // [{...}]
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error!")

    return res.redirect("/instructors")
  })
  
  // return res.send(req.body)
}

//edit
exports.edit = function(req, res){
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!foundInstructor) return res.send("Not found instructor")

const instructor ={
  ...foundInstructor,
  birth: date(foundInstructor.birth).iso
}


 


  return res.render('instructors/edit', {instructor})
}

//put
exports.put = function(req, res){
  const { id } = req.body
  let index = 0
  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if( instructor.id == id){
      index = foundIndex
      return true
    }
  })

  if(!foundInstructor) return res.send("Not found instructor")

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write error!")

    return res.redirect(`/instructors/${id}`)
  })
}

//delete
exports.delete = function(req, res){
  const {id} = req.body
  const filteredInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  })

  data.instructors = filteredInstructors

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect('/instructors')
  })
}