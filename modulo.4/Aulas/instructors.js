const fs = require('fs')
const data = require('./data.json')

//show
exports.show = function(req, res){
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!foundInstructor) return res.send("Not found instructor")

  const instructor ={
    ...foundInstructor,
    age:"",
    gender:"",
    services: foundInstructor.services.split(','),
    created_at:"",
  }


  return res.render("instructors/show", {instructor})
}

//create
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
//update

//delete