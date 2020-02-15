const fs = require('fs')
const data = require('./data.json')

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